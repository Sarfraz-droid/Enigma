import { Char } from "../../utils/isLetter";
import { SyntaxFacts } from "./SyntaxFacts";
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

        return this.Peek(0);
    }

    private lookAhead(): string {
        return this.Peek(1);
    }

    private Peek(offset: number) {
        let index = this._position + offset;
        if (index >= this._text.length) {
            return '\0';
        }

        return this._text[index];
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
        } else if (Char.isLetter(current)) {
            let start = this._position;


            while (Char.isLetter(this.getCurrent())) {
                this.Next();
            }

            let text = this._text.substring(start, this._position);
            let kind = SyntaxFacts.GetKeywordKind(text);
            return new SyntaxToken(kind, start, text, null);
        }


        if (mp[current] !== undefined) {
            return new SyntaxToken(mp[current], this._position, this._text[this._position++], null);
        }

        switch (current) {
            case '&':
                if (this.lookAhead() === "&") {
                    return new SyntaxToken(SyntaxKind.Ampersand, this._position += 2, "&&", null);
                }
                break;
            case '|':
                if (this.lookAhead() === "|") {
                    return new SyntaxToken(SyntaxKind.Pipe, this._position += 2, "||", null);
                }
                break;
            case '=':
                if (this.lookAhead() === "=") {
                    return new SyntaxToken(SyntaxKind.EqualsEquals, this._position += 2, "==", null);
                }
            case "!":
                if (this.lookAhead() === "=") {
                    return new SyntaxToken(SyntaxKind.BangEquals, this._position += 2, "!=", null);
                }
                return new SyntaxToken(SyntaxKind.Bang, this._position++, "!", null);
        }

        this.diagnostics.push(`ERROR: Bad character input: '${current}'`);

        return new SyntaxToken(SyntaxKind.Bad, this._position, this._text[this._position++], null);
    }


}