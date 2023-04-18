import { ExpressionSyntax } from "./ExpressionSyntax";
import { SyntaxKind, SyntaxNode } from "./types";

export class UnaryExpressionSyntax extends SyntaxNode {
    constructor(public operatorToken: SyntaxNode, public operand: ExpressionSyntax) {
        super(SyntaxKind.UnaryExpression);
        this.operatorToken = operatorToken;
        this.operand = operand;
    }

    public GetChildren(): SyntaxNode[] {
        return [this.operatorToken, this.operand];
    }
}
