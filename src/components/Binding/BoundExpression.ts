import { BoundNode } from "./BoundNode";
import { BoundNodeKind } from "./BoundNodeKind";


export class BoundExpression extends BoundNode {

    constructor(kind: BoundNodeKind) {
        super(kind);
    }
}
