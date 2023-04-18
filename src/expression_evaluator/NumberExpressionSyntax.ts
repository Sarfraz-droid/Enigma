import { SyntaxToken } from "./SyntaxToken";
import { SyntaxKind, SyntaxNode } from "./types";

export class NumberExpressionSyntax extends SyntaxNode {
    constructor(public numberToken: SyntaxToken) {
        super(SyntaxKind.NumberExpression);
        this.numberToken = numberToken;
    }

    public GetChildren(): SyntaxNode[] {
        return [this.numberToken];
    }
}