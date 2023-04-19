import { ExpressionSyntax } from "./ExpressionSyntax";
import { Parser } from "./Parser";
import { SyntaxToken } from "./SyntaxToken";


export class SyntaxTree {
    constructor(public diagnostics: string[], public root: ExpressionSyntax, public endOfFileToken: SyntaxToken) {
        this.diagnostics = diagnostics;
        this.root = root;
        this.endOfFileToken = endOfFileToken;
    }

    public static Parse(text: string) {
        const parser = new Parser(text);

        return parser.Parse();
    }
}