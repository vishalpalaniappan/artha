/**
 * This class accepts the reasoning package that contains all the files. 
 * 
 * It starts at the atomic behavior and then starts walking each unique 
 * narrative. As it walks, it establishes the world state through the 
 * relevant meta primitives and then it uses it to enforce the correctness
 * of the computable and legacy primitives. The functional primitives are 
 * used to branch the narratives (I will establish more uses as I go).
 * 
 * Through the narratives, semantically invalid narratives will also be
 * identified and they will be eliminated by not allowing them to persist
 * in the world. 
 * 
 */
export class NarrativeWalker {
    constructor(metadata, meaning) {
        this.metadata = metadata;
        this.meaning = meaning;

        // List of narratives
        this.narratives = [];

        // Stack of narratives (branches when if node)
        this.narrativeStack = [];

        // The current stack on the walk (composite behaviors visited)
        this.walkStack= [];

        this.walk(metadata.atomic_behavior);
    }

    /**
     * Walk the narratives starting at the atomic behavior.
     * 
     * TODO: Move the errors to a custom error so that I can catch it and
     * provide feedback through the workbench.
     * 
     * @param {String} atomicBehaviorName 
     * @throws {Error} Error indicating that atomic behavior doesn't exist.
     */
    walk (atomicBehaviorName) {
        const atomicBehavior = this.findBehavior(atomicBehaviorName);
        if(!atomicBehavior) {
            throw Error(`Atomic behavior named ${atomicBehaviorName} does not exist.`)
        }

        // Start empty narrative
        this.narrativeStack.push([]);

        this.visitBody(atomicBehavior.body);
    }


    /**
     * Finds all the unique narratives in the design by recursively
     * visiting the nodes in the body.
     * 
     * @param {Array} body 
     * @returns 
     */
    visitBody(body) {

        for (const node of body) {

            // Reached the same behavior in the walk
            if (this.walkStack.includes(node.command)) {
                this.narratives.push(this.narrativeStack.pop());
                return;
            }

            if (node.type == "cmd") {
                this.getCurrentNarrative().push(node.command);

                // If composite behavior, add to the walk stack and visit the body
                const foundBehavior = this.findBehavior(node.command);
                if (foundBehavior) {
                    this.walkStack.push(node.command);
                    this.visitBody(foundBehavior.body);
                    continue;
                }
            }

            if (node.type == "if") {
                this.getCurrentNarrative().push(`-> ${node.type} ${node.args[0].value}`);

                // Branch the narrative at the top of stack by copying it
                this.branchNarrative();
                this.visitBody(node.body);
            }

        }

        // Visited all nodes in composite behavior, pop the stack.
        this.walkStack.pop();
    }

    /**
     * Returns the current narrative (top of narrative stack)
     * 
     * If there are no narratives in the stack, then throw error beacuse
     * this should not happen.
     * 
     * @returns {Array} The current narrative as an array.
     * @throws {Error} Error indicating that there are no narratives in the stack.
     */
    getCurrentNarrative() {
        if (this.narrativeStack.length === 0) {
            throw Error("There are no narratives in the stack.")
        }
        return this.narrativeStack[this.narrativeStack.length - 1];
    }

    /**
     * Branches the current narrative by adding the current narrative
     * to the top of the narrative stack.
     */
    branchNarrative() {
        this.narrativeStack.push([...this.getCurrentNarrative()]);
    }

    /**
     * Find the behavior given the name of the behavior.
     * @param {String} name 
     * @returns 
     */
    findBehavior(name) {
        for (const file of this.meaning) {
            const b = file.ast.body.find(
                (f) => (f.type === "behavior") && (f.behaviorName == name)
            )
            if (b) return b;
        }
    }

    /**
     * Find the primitive given the name.
     * @param {String} name 
     * @returns 
     */
    findPrimitive(name) {
        const foundPrimitive = this.primitives.find(
            (f) => f.syntax === name
        );
        if (foundPrimitive) return foundPrimitive;
    }
}