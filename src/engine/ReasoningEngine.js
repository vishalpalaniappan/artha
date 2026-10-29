import { loadPrimitivesFromManifest } from "../primitives/loadPrimitives";
import { NarrativeWalker } from "./NarrativeWalker";

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
        this.narratives = new NarrativeWalker(this.pkg.meta, this.pkg.data);
    }
}