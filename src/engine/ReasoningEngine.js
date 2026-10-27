import { loadPrimitivesFromManifest } from "../primitives/loadPrimitives";

/**
 * Reasons about the meaning specified in the AST using the
 * provided primitives. 
 */
export class ReasoningEngine {
    constructor (pkg) {
        this.pkg = pkg;
        this.reason();
    }

    async loadPrimitives() {
        this.primitives = await loadPrimitivesFromManifest();
    }

    reason () {
        console.log(this.pkg.meta);
    }

}