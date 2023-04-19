import { BinaryExpressionSyntax } from "./BinaryExpressionSyntax";
import { ExpressionSyntax } from "./ExpressionSyntax";
import { Lexer } from "./Lexer";
import { LiteralExpressionSyntax } from "./LiteralExpressionSyntax";
import { ParenthesizedExpressionSyntax } from "./ParenthesizedExpressionSyntax";
import { SyntaxFacts } from "./SyntaxFacts";
import { SyntaxToken } from "./SyntaxToken";
import { SyntaxTree } from "./SyntaxTree";
import { UnaryExpressionSyntax } from "./UnaryExpressionSyntax";
import { SyntaxKind, SyntaxNode } from "./types";
import debug from "debug";

const log = debug("syntax:parser");
export class Parser {
    private _tokens: SyntaxToken[];
    private _position: number;
    public diagnostics: string[] = [];

    constructor(text: string) {
        const tokens: SyntaxToken[] = [];
        this._position = 0;

        const lexer = new Lexer(text);

        let token: SyntaxToken;

        log("Constructor", lexer);

        do {
            token = lexer.NextToken();
            log("Constructor", token.kind, token.text, token.value);

            if (token.kind !== SyntaxKind.WhiteSpace && token.kind !== SyntaxKind.Bad) {
                tokens.push(token);
            }


        } while (token.kind !== SyntaxKind.EndOfFileToken);

        this._tokens = tokens;
        // console.log("tokens", tokens);
        this.diagnostics.push(...lexer.diagnostics);
    }

    private Peek(offset: number): SyntaxToken {
        const index = this._position + offset;

        if (index >= this._tokens.length) {
            return this._tokens[this._tokens.length - 1];
        }

        return this._tokens[index];
    }

    private getCurrent(): SyntaxToken {
        return this.Peek(0);
    }

    private nextToken(): SyntaxToken {
        const current = this.getCurrent();

        this._position++;

        return current;
    }

    private ParseExpression(parentPrecedence: number = 0): ExpressionSyntax {

        let left: ExpressionSyntax;
        let unaryOperatorPrecedence = SyntaxFacts.GetUnaryOperatorPrecedence(this.getCurrent().kind);
        log("Parse Expression ", parentPrecedence);
        if (unaryOperatorPrecedence !== 0 && unaryOperatorPrecedence >= parentPrecedence) {
            let operatorToken = this.nextToken();
            let operand = this.ParseExpression(unaryOperatorPrecedence);

            left = new UnaryExpressionSyntax(operatorToken, operand);
        } else {
            left = this.ParsePrimaryExpression();
        }


        while (true) {
            let precedence = SyntaxFacts.GetBinaryOperatorPrecedence(this.getCurrent().kind);
            if (precedence === 0 || precedence <= parentPrecedence) {
                break;
            }

            let operatorToken = this.nextToken();
            let right = this.ParseExpression(precedence);

            log(left.kind, right.kind, operatorToken.kind);

            if (left.kind != right.kind) {
                this.diagnostics.push(`ERROR: Type mismatch: ${left.kind} ${operatorToken.kind} ${right.kind}`);
            }


            left = new BinaryExpressionSyntax(left, operatorToken, right);
        }

        log("left", left);


        return left;
    }




    public Parse(): SyntaxTree {
        log("Initializing Parser...")
        let expression = this.ParseExpression();
        // console.log("expression", expression);
        let endOfFileToken = this.MatchToken(SyntaxKind.EndOfFileToken);

        return new SyntaxTree(this.diagnostics, expression, endOfFileToken);
    }

    private ParseTerm(): SyntaxNode {
        let left = this.ParseFactor();


        while (this.getCurrent().kind == SyntaxKind.Plus) {
            let operatorToken = this.nextToken();
            let right = this.ParseFactor();

            left = new BinaryExpressionSyntax(left, operatorToken, right);
        }

        return left;
    }

    public ParseFactor(): ExpressionSyntax {
        let left = this.ParsePrimaryExpression();


        while (this.getCurrent().kind == SyntaxKind.Star || this.getCurrent().kind == SyntaxKind.Slash) {
            let operatorToken = this.nextToken();
            let right = this.ParseFactor();

            left = new BinaryExpressionSyntax(left, operatorToken, right);
        }

        return left;
    }

    private MatchToken(kind: SyntaxKind): SyntaxToken {
        if (this.getCurrent().kind === kind) {
            return this.nextToken();
        }

        this.diagnostics.push(`ERROR: Unexpected token <${this.getCurrent().kind}>, expected <${kind}>`);

        return new SyntaxToken(kind, this.getCurrent().position, null, null);
    }

    public ParsePrimaryExpression(): ExpressionSyntax {
        if (this.getCurrent().kind === SyntaxKind.OpenParenthesis) {
            let left = this.nextToken();
            let expression = this.ParseTerm();
            let right = this.MatchToken(SyntaxKind.CloseParenthesis);

            if (typeof left.value !== typeof right.value) {
                this.diagnostics.push(`ERROR: Parenthesis mismatch between <${typeof left.value}> && <${typeof right.value}>`);
            }

            return new ParenthesizedExpressionSyntax(left, expression, right);
        }

        else if (this.getCurrent().kind === SyntaxKind.TrueKeyword || this.getCurrent().kind === SyntaxKind.FalseKeyword) {
            let value = this.getCurrent().kind === SyntaxKind.TrueKeyword;
            const exp = new LiteralExpressionSyntax(this.nextToken(), value);
            return exp;
        }

        let numberToken = this.MatchToken(SyntaxKind.Number);
        return new LiteralExpressionSyntax(numberToken);
    }
}