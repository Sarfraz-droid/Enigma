import { BinaryExpressionSyntax } from "./BinaryExpressionSyntax";
import { Lexer } from "./Lexer";
import { NumberExpressionSyntax } from "./NumberExpressionSyntax";
import { ParenthesizedExpressionSyntax } from "./ParenthesizedExpressionSyntax";
import { SyntaxToken } from "./SyntaxToken";
import { SyntaxTree } from "./SyntaxTree";
import { SyntaxKind, SyntaxNode } from "./types";
import Bunyan from "bunyan";

const log = Bunyan.createLogger({ name: "Parser" });

export class Parser {
    private _tokens: SyntaxToken[];
    private _position: number;
    public diagnostics: string[] = [];

    constructor(text: string) {
        const tokens: SyntaxToken[] = [];
        this._position = 0;

        const lexer = new Lexer(text);

        let token: SyntaxToken;

        do {
            token = lexer.NextToken();

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



    public Parse(): SyntaxTree {
        let expression = this.ParseExpression();
        // console.log("expression", expression);
        let endOfFileToken = this.MatchToken(SyntaxKind.EndOfFileToken);

        return new SyntaxTree(this.diagnostics, expression, endOfFileToken);
    }

    private ParseExpression(): SyntaxNode {
        let left = this.ParseFactor();

        while (this.getCurrent().kind == SyntaxKind.Plus) {
            let operatorToken = this.nextToken();
            let right = this.ParseFactor();

            left = new BinaryExpressionSyntax(left, operatorToken, right);
        }

        return left;
    }

    public ParseFactor(): SyntaxNode {
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

    public ParsePrimaryExpression(): SyntaxNode {
        if (this.getCurrent().kind === SyntaxKind.OpenParenthesis) {
            let left = this.nextToken();
            let expression = this.ParseExpression();
            let right = this.MatchToken(SyntaxKind.CloseParenthesis);

            return new ParenthesizedExpressionSyntax(left, expression, right);
        }

        let numberToken = this.MatchToken(SyntaxKind.Number);
        return new NumberExpressionSyntax(numberToken);
    }
}