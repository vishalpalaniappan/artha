import { Node } from "./Node";

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
        this.classifiedNodes = [];
        this.process(meaning.data);
    }

    /**
     * Visit each node in the body and classify it.
     * @param {Array} body 
     */
    process(files) {
        for (const f of files) {
            const nodes = this.visitBody(f.ast.body);
            this.classifiedNodes = [
                ...this.classifiedNodes, ...nodes
            ];
        }

        console.log(this.classifiedNodes);
    }

    visitBody(body) {
        const nodes = [];
        for (const node of body) {
            const classifiedNode = new Node(node);
            if ("body" in node) {
                classifiedNode.addBody(
                    this.visitBody(node.body)
                );
            }
            nodes.push(classifiedNode);
        } 
        return nodes;
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