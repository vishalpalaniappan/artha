/**
 * This class accepts the AST and classifies every node as one of the following:
 * - Composite Behavior
 * - Functional Primitive
 * - Computable Primitive
 * - Legacy Primitive
 * - Meta Primitive
 * 
 * When walking the AST that has already been classified, it becomes possible to also
 * reason while identifying the narratives. For example, meta primitives can be used to
 * establish the world state, aliases can be used to identify the types of the yielded
 * values that are used in other primitives. 
 * 
 * Side note:
 * This can be done in the parsing stage to make it more efficient.
 */

export class Classifier {

    constructor (meaning, primitives) {
        this.meaning = meaning;
        this.primitives = primitives;
        this.process(meaning.data);
    }

    /**
     * Visit each node in the body and classify it.
     * @param {Array} body 
     */
    process(files) {
        for (const f of files) {
            console.log("");
            console.log(f.name);
            this.visitBody(f.ast.body);
        }
    }

    visitBody(body) {
        for (const node of body) {
            if ("body" in node) {
                this.visitBody(node.body);
            }
            this.classify(node);
        }
    }

    classify (node) {
        // classify node
        console.log(node.type);
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