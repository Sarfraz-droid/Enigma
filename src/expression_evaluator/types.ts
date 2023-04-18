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
    NumberExpression = "NumberExpression",
    ParenthesizedExpression = "ParenthesizedExpression",
    BinaryExpression = "BinaryExpression",
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
