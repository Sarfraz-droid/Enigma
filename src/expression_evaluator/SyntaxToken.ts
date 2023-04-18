import { SyntaxKind, SyntaxNode } from "./types";

export class SyntaxToken extends SyntaxNode {
    constructor(public kind: SyntaxKind, public position: number, public text: string | null, public value: any) {
        super(kind);
        this.kind = kind;
        this.position = position;
        this.text = text;
        this.value = value;
    }



    public GetChildren(): SyntaxToken[] {
        return [];
    }
}

