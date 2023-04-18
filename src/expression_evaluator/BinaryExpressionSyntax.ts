import { SyntaxKind, SyntaxNode } from "./types";

export class BinaryExpressionSyntax extends SyntaxNode {
    constructor(public left: SyntaxNode, public operatorToken: SyntaxNode, public right: SyntaxNode) {
        super(SyntaxKind.BinaryExpression);
        this.left = left;
        this.operatorToken = operatorToken;
        this.right = right;
    }

    public GetChildren(): SyntaxNode[] {
        return [this.left, this.operatorToken, this.right];
    }
}



