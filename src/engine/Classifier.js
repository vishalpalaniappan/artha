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
    }

    visitBody(body) {
        const nodes = [];
        for (const astNode of body) {
            const classifiedNode = new Node(astNode.uid, this.classify(astNode));
            if ("body" in astNode) {
                classifiedNode.addBody(this.visitBody(astNode.body));
            }
            nodes.push(classifiedNode);
        }
        return nodes;
    }

    /**
     * Classify the AST node.
     * @param {Object} node 
     */
    classify(node) {
        //TODO: This implementation is clumsy, I will iterate on it. I just wanted to see the syntax validation in action. I need to spend a little bit more time defining the specification cleanly and then use it for the classification and then the syntax validation. In the next step, I will use the classified nodes to validate the narrative using the established meaning. The synthesis itself is actually kind of simple after that because I have the meaning of the computable and legacy primitives, I just need to connect them together using the functional primitives and make it excutable.

        if (node.type === "behavior") {
            return {
                type: "behavior",
                name: node.behaviorName,
                args: node.args
            }
        }

        if (node.type == "participant") {
            return {
                type: "participant",
                name: node.name,
                args: node.args
            }
        }

        if (node.type === "cmd") {
            const foundBehavior = this.findBehavior(node.command);
            if (foundBehavior) {
                return {
                    type: "behavior",
                    name: node.command,
                    args: node.args,
                    definition: foundBehavior
                }
            }

            const foundPrimitive = this.findPrimitive(node.command);
            if (foundPrimitive) {
                return {
                    type: foundPrimitive.type,
                    name: foundPrimitive.name,
                    args: node.args,
                    definition: foundPrimitive
                }
            }
        }

        if (node.type == "functional") {
            const foundPrimitive = this.findPrimitive(node.command);
            return {
                type: "functional",
                name: "if",
                args: node.args,
                definition: foundPrimitive
            }
        }

        throw Error("Unable to classify the node");
    }


    /**
     * Find the behavior given the name of the behavior.
     * @param {String} name 
     * @returns 
     */
    findBehavior(name) {
        for (const file of this.meaning.data) {
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

    /**
     * Find the participant given the name.
     * @param {String} name 
     */
    findParticipant(name) {
        for (const file of this.meaning.data) {
            const participant = file.ast.body.find(
                (f) => (f.type === "participant") && (f.participantType == name)
            )
            if (participant) participant;
        }
    }
}