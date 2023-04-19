import { SyntaxKind } from "./types";

export class SyntaxFacts {
    public static GetBinaryOperatorPrecedence(kind: SyntaxKind): number {
        switch (kind) {
            case SyntaxKind.Star:
            case SyntaxKind.Slash:
                return 5;

            case SyntaxKind.Plus:
            case SyntaxKind.Minus:
                return 4;

            case SyntaxKind.EqualsEquals:
            case SyntaxKind.BangEquals:
                return 3;

            case SyntaxKind.Ampersand:
                return 2;

            case SyntaxKind.Pipe:
                return 1;

            default:
                return 0;
        }
    }

    public static GetUnaryOperatorPrecedence(kind: SyntaxKind): number {
        switch (kind) {
            case SyntaxKind.Plus:
            case SyntaxKind.Minus:
            case SyntaxKind.Bang:
                return 6;

            default:
                return 0;
        }
    }

    public static GetKeywordKind(text: string): SyntaxKind {
        switch (text) {
            case "true":
                return SyntaxKind.TrueKeyword;
            case "false":
                return SyntaxKind.FalseKeyword;

            default:
                return SyntaxKind.Identifier;
        }
    }
}
