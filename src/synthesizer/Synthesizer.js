import { ast, parse } from "py-ast";

/**
 * Synthesizes the specified meaning into a python program.
 * 
 * The computable and legacy primitives provide a realization of their meaning and
 * the functional primitives connect them together. The meta primitives can also inform
 * the synthesis (for example, the structural type meaning) as well as be used for the
 * reasoning. 
 * 
 * This process realizes the meaning as a python program. Since the meaning has
 * been fully reasoned about, all known failures have been eliminated. The synthesized
 * implementation is instrumented with the necessary information needed to replay the 
 * execution. As a result, when a failure does occur, it is automatically diagnosed and
 * this leads to root cause analysis that expands the meaning and the world is reasoned
 * about once again to ensure that all known failures are eliminated. 
 * 
 * CLP enables the necessary diagnostic data to be losslessly preserved by leveraging the
 * meaning of the data (which includes its structural type among other features that can
 * be exploited to optimize the compression).
 * 
 */
export class Synthesizer {
    constructor (meaning) {
        this.meaning = meaning;
        this.implementation = "";
        this.walk();
        console.log(this.implementation)
    }

    walk () {
        this.implementation += "# Primitives are in meaning form, still need to be processed, this is blocking things out." + "\n"
        for (const node of this.meaning) {
            if (node.type === "behavior") {
                this.implementBehavior(node);
            }
        }
    }

    implementBehavior (behavior) {
        const args = (behavior?.args)?behavior.args.map((a) => a.value).join(","):"";
        const syntax = `def ${behavior.name}(${args}):`
        this.implementation = this.implementation + syntax + "\n";

        for (const node of behavior.body) {
            if (node.type.includes("primitive")) {
                this.implementation += "    " + this.implementPrimitive(node) + "\n";
            }
            if (node.type == "behavior") {
                this.implementation += "    " + this.implementCompositeBehaviorCall(node) + "\n";
            }
        }

        this.implementation = this.implementation + "\n";
    }

    implementPrimitive (primitive) {
        // Note: I need to parse each primitive to save the relevant aliases, this is just me
        // setting up the structure so that I can continue.
        const args = (primitive?.args)?primitive.args.map((a) => a.value).join(","):"";
        const syntax = `${primitive.name}(${args})`
        return syntax
    }

    implementCompositeBehaviorCall(composite) {
        const args = (composite?.args)?composite.args.map((a) => a.value).join(","):"";
        const syntax = `${composite.name}(${args})`
        return syntax
    }
}