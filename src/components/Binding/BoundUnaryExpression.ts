import { BoundExpression } from "./BoundExpression";
import { BoundNodeKind } from "./BoundNodeKind";
import { BoundUnaryOperator } from "./BoundUnaryOperator";
import { BoundUnaryOperatorKind } from "./BoundUnaryOperatorKind";


export class BoundUnaryExpression extends BoundExpression {
    constructor(public operatorKind: BoundUnaryOperator | null, public operand: BoundExpression) {
        super(BoundNodeKind.UnaryExpression);
        this.operatorKind = operatorKind;
        this.operand = operand;
    }
}
