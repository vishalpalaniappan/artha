import { loadPrimitivesFromManifest } from "../primitives/loadPrimitives";

/**
 * Reasons about the meaning specified in the AST using the
 * provided primitives. 
 */
export class ReasoningEngine {
    constructor (ast) {
        this.ast = ast;
    }

    async loadPrimitives() {
        this.primitives = await loadPrimitivesFromManifest();
    }

}