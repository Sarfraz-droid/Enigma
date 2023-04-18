import { SyntaxKind } from "./types";

export class SyntaxFacts {
    public static GetBinaryOperatorPrecedence(kind: SyntaxKind): number {
        switch (kind) {
            case SyntaxKind.Star:
            case SyntaxKind.Slash:
                return 2;

            case SyntaxKind.Plus:
            case SyntaxKind.Minus:
                return 1;

            default:
                return 0;
        }
    }

    public static GetUnaryOperatorPrecedence(kind: SyntaxKind): number {
        switch (kind) {
            case SyntaxKind.Plus:
            case SyntaxKind.Minus:
                return 3;

            default:
                return 0;
        }
    }
}
