import * as readline from "readline-sync";
import { SyntaxTree } from "./expression_evaluator/SyntaxTree";
import { SyntaxNode } from "./expression_evaluator/types";
import { SyntaxToken } from "./expression_evaluator/SyntaxToken";
import Bunyan from "bunyan";
import { Evaluator } from "./expression_evaluator/Evaluator";
const debug = Bunyan.createLogger({
    name: "Program",
    level: "debug",
    serializers: Bunyan.stdSerializers,

});

export class Executor {
    public Main() {
        let showTree: boolean = false;

        let input: string = readline.question("Enter a command: ");

        console.log("You entered: ", input);

        input = input.trim().toLowerCase();

        if (input === "") {
            console.log("You must enter a command.");
            return;
        }

        const syntaxTree = SyntaxTree.Parse(input);

        // this.PrettyPrint(syntaxTree.root, "");

        if (syntaxTree.diagnostics.length > 0) {
            console.log("There were errors in the input.");
            for (const diagnostic of syntaxTree.diagnostics) {
                console.log(diagnostic);
            }
        } else {
            console.log("No errors in the input.");

            const evaluator = new Evaluator(syntaxTree.root);
            const result = evaluator.Evaluate();

            console.log("Result: ", result);
        }
    }

}
