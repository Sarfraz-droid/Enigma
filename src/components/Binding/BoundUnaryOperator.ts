import { SyntaxKind } from "../syntax/types";
import { BoundUnaryOperatorKind } from "./BoundUnaryOperatorKind";



export class BoundUnaryOperator {
    constructor(public syntaxKind: SyntaxKind, public kind: BoundUnaryOperatorKind) {
        this.kind = kind;
        this.syntaxKind = syntaxKind;
    }

    private static _operators: BoundUnaryOperator[] = [
        new BoundUnaryOperator(SyntaxKind.Plus, BoundUnaryOperatorKind.Identity),
        new BoundUnaryOperator(SyntaxKind.Minus, BoundUnaryOperatorKind.Negation),
        new BoundUnaryOperator(SyntaxKind.Bang, BoundUnaryOperatorKind.LogicalNegation)
    ];

    public static Bind(syntaxKind: SyntaxKind): BoundUnaryOperator | null {
        let value = this._operators.find(o => o.syntaxKind === syntaxKind);

        if (value === undefined) {
            return null;
        }

        return value;
    }
}
