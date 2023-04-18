import { SyntaxKind, SyntaxNode } from "./types";

export class ParenthesizedExpressionSyntax extends SyntaxNode {
    constructor(public openParenthesisToken: SyntaxNode, public expression: SyntaxNode, public closeParenthesisToken: SyntaxNode) {
        super(SyntaxKind.ParenthesizedExpression);
        this.openParenthesisToken = openParenthesisToken;
        this.expression = expression;
        this.closeParenthesisToken = closeParenthesisToken;
    }

    public GetChildren(): SyntaxNode[] {
        return [this.openParenthesisToken, this.expression, this.closeParenthesisToken];
    }
}