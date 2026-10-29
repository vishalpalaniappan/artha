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
        this.walk(metadata.atomic_behavior);

        // List of established narratives
        this.narratives = [];

        // Current stack of narratives
        this.narrativeStack = [];

        // The current stack on the walk
        this.walkStack= [];
    }

    walk (atomicBehaviorName) {
        console.log("Walking from atomic behavior:", atomicBehaviorName);

        const atomicBehavior = this.findBehavior(atomicBehaviorName);
        console.log(atomicBehavior);
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
}