import { BinaryExpressionSyntax } from "./BinaryExpressionSyntax";
import { ExpressionSyntax } from "./ExpressionSyntax";
import { NumberExpressionSyntax } from "./NumberExpressionSyntax";
import { ParenthesizedExpressionSyntax } from "./ParenthesizedExpressionSyntax";
import { SyntaxKind } from "./types";

export class Evaluator {
    private _root: ExpressionSyntax;
    public constructor(root: ExpressionSyntax) {
        this._root = root;
    }

    public Evaluate() {
        return this.EvaluateExpression(this._root);
    }

    private EvaluateExpression(root: ExpressionSyntax): number {
        if (root.kind === SyntaxKind.NumberExpression) {
            return Number((root as NumberExpressionSyntax).numberToken.value);
        }

        if (root.kind === SyntaxKind.BinaryExpression) {
            let b = root as BinaryExpressionSyntax;

            let left = this.EvaluateExpression(b.left);
            let right = this.EvaluateExpression(b.right);

            switch (b.operatorToken.kind) {
                case SyntaxKind.Plus:
                    return left + right;
                case SyntaxKind.Minus:
                    return left - right;
                case SyntaxKind.Star:
                    return left * right;
                case SyntaxKind.Slash:
                    return left / right;
                default:
                    throw new Error(`Unexpected binary operator ${b.operatorToken.kind}`);
            }
        }

        if (root.kind === SyntaxKind.ParenthesizedExpression) {
            let p = root as ParenthesizedExpressionSyntax;

            return this.EvaluateExpression(p.expression);
        }

        throw new Error(`Unexpected node ${root.kind}`);
    }
}