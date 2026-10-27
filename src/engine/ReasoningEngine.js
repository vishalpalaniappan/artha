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
        console.log(this.pkg.meta);
        console.log(this.primitives);
    }

}