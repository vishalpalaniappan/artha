/**
 * This class accepts the reasoning package that contains all the files. 
 * 
 * It starts at the atomic behavior and then starts walking each unique narrative. As it walks, it establishes the world state through the relevant meta primitives and then it uses it to enforce the correctness of the computable and legacy primitives. The functional primitives are used to branch the narratives (I will establish more uses as I go).
 * 
 * Through the narratives, semantically invalid narratives will also be identified and they will be eliminated by not allowing them to persist in the world. 
 * 
 */
class Narrative {
    constructor() {

    }
}