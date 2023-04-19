import { BinaryExpressionSyntax } from "../syntax/BinaryExpressionSyntax";
import { ExpressionSyntax } from "../syntax/ExpressionSyntax";
import { LiteralExpressionSyntax } from "../syntax/LiteralExpressionSyntax";
import { UnaryExpressionSyntax } from "../syntax/UnaryExpressionSyntax";
import { SyntaxKind } from "../syntax/types";
import { BoundBinaryExpression } from "./BoundBinaryExpression";
import { BoundBinaryOperator } from "./BoundBinaryOperator";
import { BoundBinaryOperatorKind } from "./BoundBinaryOperatorKind";
import { BoundExpression } from "./BoundExpression";
import { BoundLiteralExpression } from "./BoundLiteralExpression";
import { BoundUnaryExpression } from "./BoundUnaryExpression";
import { BoundUnaryOperator } from "./BoundUnaryOperator";
import { BoundUnaryOperatorKind } from "./BoundUnaryOperatorKind";
import debug from "debug";


const log = debug("binding:binder")

export class Binder {

    public diagnostics: string[] = [];

    public BindExpression(node: ExpressionSyntax): BoundExpression {

        switch (node.kind) {
            case SyntaxKind.LiteralExpression:
                return this.BindLiteralExpression(node as LiteralExpressionSyntax);
            case SyntaxKind.UnaryExpression:
                return this.BindUnaryExpression(node as UnaryExpressionSyntax);
            case SyntaxKind.BinaryExpression:
                return this.BindBinaryExpression(node as BinaryExpressionSyntax);
            case SyntaxKind.ParenthesizedExpression:
                return this.BindExpression((node as BinaryExpressionSyntax).left);
            default:
                throw new Error(`Unexpected node ${node.kind}`);
        }
    }

    private BindUnaryExpression(node: UnaryExpressionSyntax): BoundExpression {
        let value = BoundUnaryOperator.Bind(node.operatorToken.kind)
        let boundOperand = this.BindExpression(node.operand);

        if (boundOperand === null) {
            this.diagnostics.push(`The unary operator ${node.operatorToken.kind} requires an operand`);
        }
        if (value === null) {
            this.diagnostics.push(`Invalid unary operator ${node.operatorToken.kind}`);
        }


        return new BoundUnaryExpression(value, boundOperand);
    }

    private BindBinaryExpression(node: BinaryExpressionSyntax): BoundExpression {
        let boundLeft = this.BindExpression(node.left);
        let boundOperatorKind = BoundBinaryOperator.Bind(node.operatorToken.kind);
        let boundRight = this.BindExpression(node.right);

        if (boundOperatorKind === null) {
            this.diagnostics.push(`Invalid binary operator ${node.operatorToken.kind}`);
        }


        return new BoundBinaryExpression(boundLeft, boundOperatorKind, boundRight);

    }

    private BindLiteralExpression(node: LiteralExpressionSyntax): BoundExpression {
        log(node.literalToken.value);
        let value = node.literalToken.value ?? 0;
        return new BoundLiteralExpression(value);
    }
}

