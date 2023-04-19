export enum SyntaxKind {
    Number = "Number",
    WhiteSpace = "WhiteSpace",
    Plus = "Plus",
    Minus = "Minus",
    Star = "Star",
    Slash = "Slash",
    OpenParenthesis = "OpenParenthesis",
    CloseParenthesis = "CloseParenthesis",
    EndOfFileToken = "EndOfFileToken",
    Bad = "Bad",
    LiteralExpression = "LiteralExpression",
    ParenthesizedExpression = "ParenthesizedExpression",
    BinaryExpression = "BinaryExpression",
    UnaryExpression = "UnaryExpression",
    TrueKeyword = "TrueKeyword",
    FalseKeyword = "FalseKeyword",
    Identifier = "Identifier",
    Bang = "Bang",
    Ampersand = "Ampersand",
    Pipe = "Pipe",
    EqualsEquals = "EqualsEquals",
    BangEquals = "BangEquals"
}


// export interface SyntaxNode {
//     kind: SyntaxKind;
//     GetChildren: () => SyntaxNode[];
// }

export class SyntaxNode {
    constructor(public kind: SyntaxKind) {
        this.kind = kind;
    }

    public GetChildren(): SyntaxNode[] {
        return [];
    }
}
