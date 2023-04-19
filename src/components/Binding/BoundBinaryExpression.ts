import { BoundExpression } from "./BoundExpression";
import { BoundNodeKind } from "./BoundNodeKind";
import { BoundBinaryOperatorKind } from "./BoundBinaryOperatorKind";
import { BoundBinaryOperator } from "./BoundBinaryOperator";


export class BoundBinaryExpression extends BoundExpression {
    constructor(public left: BoundExpression, public operatorKind: BoundBinaryOperator | null, public right: BoundExpression) {
        super(BoundNodeKind.BinaryExpression);
        this.left = left;
        this.operatorKind = operatorKind;
        this.right = right;
    }
}


