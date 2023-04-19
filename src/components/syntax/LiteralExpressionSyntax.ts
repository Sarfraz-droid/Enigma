import { SyntaxToken } from "./SyntaxToken";
import { SyntaxKind, SyntaxNode } from "./types";

export class LiteralExpressionSyntax extends SyntaxNode {
    constructor(public literalToken: SyntaxToken, public value: any | null = null) {
        super(SyntaxKind.LiteralExpression);
        this.literalToken = literalToken;

        if (this.value != null) {
            this.value = value;
            this.literalToken.value = value;
        }
    }

    public GetChildren(): SyntaxNode[] {
        return [this.literalToken];
    }
}