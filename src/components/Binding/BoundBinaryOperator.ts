import { SyntaxKind } from "../syntax/types";
import { BoundBinaryOperatorKind } from "./BoundBinaryOperatorKind";

import debug from "debug";

const log = debug("binding:boundbinaryoperator");


export class BoundBinaryOperator {
    constructor(public syntaxKind: SyntaxKind, public kind: BoundBinaryOperatorKind) {
        this.kind = kind;
        this.syntaxKind = syntaxKind;
    }

    private static _operators: BoundBinaryOperator[] = [
        new BoundBinaryOperator(SyntaxKind.Plus, BoundBinaryOperatorKind.Addition),
        new BoundBinaryOperator(SyntaxKind.Minus, BoundBinaryOperatorKind.Subtraction),
        new BoundBinaryOperator(SyntaxKind.Star, BoundBinaryOperatorKind.Multiplication),
        new BoundBinaryOperator(SyntaxKind.Slash, BoundBinaryOperatorKind.Division),
        new BoundBinaryOperator(SyntaxKind.Ampersand, BoundBinaryOperatorKind.LogicalAnd),
        new BoundBinaryOperator(SyntaxKind.Pipe, BoundBinaryOperatorKind.LogicalOr),
        new BoundBinaryOperator(SyntaxKind.EqualsEquals, BoundBinaryOperatorKind.Equals),
        new BoundBinaryOperator(SyntaxKind.BangEquals, BoundBinaryOperatorKind.NotEquals)
    ];

    public static Bind(syntaxKind: SyntaxKind): BoundBinaryOperator | null {
        let value = this._operators.find(o => o.syntaxKind === syntaxKind);

        if (value === undefined) {
            return null;
        }

        return value;
    }
}
