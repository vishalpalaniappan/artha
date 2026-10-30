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
        this.testAstLib();
    }

    testAstLib() {
        const source = "def hello(name):\n    return f'Hello, {name}!'";
        const ast = parse(source);
        const funcNode = ast.body[0];

        console.log(funcNode);
    }
}