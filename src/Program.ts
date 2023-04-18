import * as readline from "readline-sync";
import { SyntaxTree } from "./components/SyntaxTree";
import { SyntaxNode } from "./components/types";
import { SyntaxToken } from "./components/SyntaxToken";
import Bunyan from "bunyan";
import { Evaluator } from "./components/Evaluator";
const debug = Bunyan.createLogger({
    name: "Program",
    level: "debug",
    serializers: Bunyan.stdSerializers,

});

export class Executor {
    public Main() {
        let showTree: boolean = false;

        while (true) {

            let input: string = readline.question("> ");


            input = input.trim().toLowerCase();

            if (input === "") {
                console.log("\nYou must enter a command.\n");
                continue;
            }

            if (input === ":st") {
                showTree = !showTree;
                console.log("Show tree is now: ", showTree);
                continue;
            }

            if (input === ":q") {
                console.log("Bye!");
                return;
            }

            const syntaxTree = SyntaxTree.Parse(input);
            if (showTree)
                this.PrettyPrint(syntaxTree.root, "");

            if (syntaxTree.diagnostics.length > 0) {
                console.log("There were errors in the input.");
                for (const diagnostic of syntaxTree.diagnostics) {
                    console.log(diagnostic);
                }
            } else {
                console.log("\n-------------------\n");
                console.log("No errors in the input.");

                const evaluator = new Evaluator(syntaxTree.root);
                const result = evaluator.Evaluate();

                console.log("Result: ", result);
            }
        }
    }

    private PrettyPrint(node: SyntaxNode, indent: string, isLast: boolean = false) {
        const marker = isLast ? "└──" : "├──";

        console.log(indent + marker + node.kind);

        indent += isLast ? "   " : "│  ";

        for (const child of node.GetChildren()) {
            if (child instanceof SyntaxToken) {
                console.log(indent + child.kind + ": " + child.text);
            } else {
                this.PrettyPrint(child, indent, node.GetChildren().indexOf(child) === node.GetChildren().length - 1);
            }
        }
    }

}
