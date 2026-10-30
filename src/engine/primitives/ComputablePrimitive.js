/**
 * This class is initialized with a computable primitive definition.
 * 
 * It accepts a computable primitive from the AST and evaluates its correctness. As the engine traverses the narrative, it tracks the metadata of the participants and passes them along with the primitive from the AST. 
 * 
 * It then reasons about the correctness of the meaning and provides a conclusion. This doesn't just include the invariants of the primitive (like structural type of participant), it can also enforce the worlds definition of correctness, for example, a participant can only accept food items but instead an action was provided.
 */
class ComputablePrimitive {
    constructor () {

    }
}