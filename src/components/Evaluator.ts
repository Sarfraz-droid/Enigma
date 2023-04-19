import { BoundNodeKind } from "./Binding/BoundNodeKind";
import { BoundUnaryOperatorKind } from "./Binding/BoundUnaryOperatorKind";
import { BoundBinaryOperatorKind } from "./Binding/BoundBinaryOperatorKind";
import { BoundBinaryExpression } from "./Binding/BoundBinaryExpression";
import { BoundLiteralExpression } from "./Binding/BoundLiteralExpression";
import { BoundUnaryExpression } from "./Binding/BoundUnaryExpression";
import { BoundExpression } from "./Binding/BoundExpression";
import { BinaryExpressionSyntax } from "./syntax/BinaryExpressionSyntax";
import { ExpressionSyntax } from "./syntax/ExpressionSyntax";
import { LiteralExpressionSyntax } from "./syntax/LiteralExpressionSyntax";
import { ParenthesizedExpressionSyntax } from "./syntax/ParenthesizedExpressionSyntax";
import { UnaryExpressionSyntax } from "./syntax/UnaryExpressionSyntax";
import { SyntaxKind } from "./syntax/types";
import debug from "debug";

const log = debug("evaluator:evaluator")

export class Evaluator {
    private _root: BoundExpression;
    public constructor(root: BoundExpression) {
        this._root = root;
    }

    public Evaluate() {
        return this.EvaluateExpression(this._root);
    }

    private EvaluateExpression(root: BoundExpression): any {
        if (root.kind === BoundNodeKind.LiteralExpression) {
            return (root as BoundLiteralExpression).value;
        }

        if (root.kind === BoundNodeKind.UnaryExpression) {
            let u = root as BoundUnaryExpression;
            let operand = this.EvaluateExpression((root as BoundUnaryExpression).operand);
            log(`Operand: ${operand} , Type: ${typeof operand}`);
            if (typeof operand === "number") {

                switch (u.operatorKind?.kind) {
                    case BoundUnaryOperatorKind.Identity:
                        return +operand;
                    case BoundUnaryOperatorKind.Negation:
                        return -operand;
                    default:
                        throw new Error(`Unexpected unary operator ${u.operatorKind}`);
                }
            } else if (typeof operand === "boolean") {
                switch (u.operatorKind?.kind) {
                    case BoundUnaryOperatorKind.LogicalNegation:
                        return !operand;
                    default:
                        throw new Error(`Unexpected unary operator ${u.operatorKind}`);
                }
            }


        }

        if (root.kind === BoundNodeKind.BinaryExpression) {
            let b = root as BoundBinaryExpression;

            let left = this.EvaluateExpression(b.left);
            let right = this.EvaluateExpression(b.right);

            if (typeof left != typeof right) {
                throw new Error(`Type mismatch: ${typeof left} and ${typeof right}`);
            }

            switch (b.operatorKind?.kind) {
                case BoundBinaryOperatorKind.Addition:
                    return left + right;
                case BoundBinaryOperatorKind.Subtraction:
                    return left - right;
                case BoundBinaryOperatorKind.Multiplication:
                    return left * right;
                case BoundBinaryOperatorKind.Division:
                    return left / right;
                case BoundBinaryOperatorKind.LogicalAnd:
                    return left && right;
                case BoundBinaryOperatorKind.LogicalOr:
                    return left || right;
                case BoundBinaryOperatorKind.Equals:
                    return left == right;
                case BoundBinaryOperatorKind.NotEquals:
                    return left != right;
                default:
                    throw new Error(`Unexpected binary operator ${b.operatorKind}`);
            }
        }


        // if (root.kind === SyntaxKind.ParenthesizedExpression) {
        //     let p = root as ParenthesizedExpressionSyntax;

        //     return this.EvaluateExpression(p.expression);
        // }

        log(`Unexpected node ${root.kind}`);

        throw new Error(`Unexpected node ${root.kind}`);
    }
}