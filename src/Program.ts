import * as readline from "readline-sync";
import { SyntaxTree } from "./components/syntax/SyntaxTree";
import { SyntaxNode } from "./components/syntax/types";
import { SyntaxToken } from "./components/syntax/SyntaxToken";
import { Evaluator } from "./components/Evaluator";
import { Binder } from "./components/Binding/Binder";
import debug from "debug";

const log = debug("program");

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
            let binder = new Binder()
            let boundExpression = binder.BindExpression(syntaxTree.root);

            log("boundExpression", boundExpression);

            let diagnostics = syntaxTree.diagnostics.concat(binder.diagnostics);



            if (showTree)
                this.PrettyPrint(syntaxTree.root, "");

            if (diagnostics.length > 0) {
                console.log("There were errors in the input.");
                for (const diagnostic of diagnostics) {
                    console.log(diagnostic);
                }
            } else {
                console.log("\n-------------------\n");
                console.log("No errors in the input.");

                const evaluator = new Evaluator(boundExpression);
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
