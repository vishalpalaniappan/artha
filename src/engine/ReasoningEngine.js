import { loadPrimitivesFromManifest } from "../primitives/loadPrimitives";

/**
 * Reasons about the meaning specified in the AST using the
 * provided primitives. 
 */
export class ReasoningEngine {
    constructor (pkg) {
        this.pkg = pkg;
    }

    async loadPrimitives() {
        this.primitives = await loadPrimitivesFromManifest();
    }

    reason () {
        const atomicBehavior = this.findBehavior(this.pkg.meta.atomic_behavior);
        console.log(atomicBehavior);

    }

    findBehavior(name) {
        for (const file of this.pkg.data) {
            const behavior = file.ast.body.find(
                (f) => (f.type === "behavior") && (f.behaviorName == name)
            )
            if (behavior) return behavior;            
        }
    }

    findParticipant() {

    }

}