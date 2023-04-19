import { BoundNodeKind } from "./BoundNodeKind";


export class BoundNode {
    constructor(public kind: BoundNodeKind) {
        this.kind = kind;
    }

}
