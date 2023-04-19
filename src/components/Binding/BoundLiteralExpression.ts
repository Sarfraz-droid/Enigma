import { BoundExpression } from "./BoundExpression";
import { BoundNodeKind } from "./BoundNodeKind";


export class BoundLiteralExpression extends BoundExpression {
    constructor(public value: any) {
        super(BoundNodeKind.LiteralExpression);
        this.value = value;
    }
}
