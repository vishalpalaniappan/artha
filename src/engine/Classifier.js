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

class Classifier {
    constructor () {

    }
}