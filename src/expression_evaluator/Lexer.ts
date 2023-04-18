import { SyntaxToken } from "./SyntaxToken"
import { SyntaxKind } from "./types";

const mp = {
    "+": SyntaxKind.Plus,
    "-": SyntaxKind.Minus,
    "*": SyntaxKind.Star,
    "/": SyntaxKind.Slash,
    "(": SyntaxKind.OpenParenthesis,
    ")": SyntaxKind.CloseParenthesis,
} as {
    [key: string]: SyntaxKind;
}

export class Lexer {
    private _text: string;
    private _position: number;
    public diagnostics: string[] = [];

    constructor(text: string) {
        this._position = 0;
        this._text = text;
    }

    private getCurrent(): string {

        if (this._position >= this._text.length) {
            return '\0';
        }

        return this._text[this._position];
    }

    private Next() {
        this._position++;
    }

    public NextToken(): SyntaxToken {
        if (this._position >= this._text.length) {
            return new SyntaxToken(SyntaxKind.EndOfFileToken, this._position, "\0", null);
        }

        const current = this.getCurrent();
        const currNum = Number(current);

        // console.log("current", { current }, this._position, current === ' ');


        if (current == ' ') {
            let start = this._position;
            // console.log("start Whitspace", start);
            while (this.getCurrent() == ' ') {
                this._position++;
            }



            let text = this._text.substring(start, this._position);

            return new SyntaxToken(SyntaxKind.WhiteSpace, start, text, null);
        } else if (!isNaN(currNum)) {
            let start = this._position;
            // console.log("start Whitspace", start);


            while (!isNaN(Number(this.getCurrent()))) {
                if (this.getCurrent() === ' ') {
                    break;
                }
                this.Next();
            }

            let text = this._text.substring(start, this._position);
            let value = Number(text);

            return new SyntaxToken(SyntaxKind.Number, start, text, value);
        }


        if (mp[current] !== undefined) {
            return new SyntaxToken(mp[current], this._position, this._text[this._position++], null);
        }

        this.diagnostics.push(`ERROR: Bad character input: '${current}'`);

        return new SyntaxToken(SyntaxKind.Bad, this._position, this._text[this._position++], null);
    }


}