import { loadPrimitivesFromManifest } from "../primitives/loadPrimitives";
import { NarrativeWalker } from "./NarrativeWalker";
import { Classifier } from "./Classifier";

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
        // Classify the nodes in the AST nodes.
        this.classifier = new Classifier(this.pkg, this.primitives);

        // Walk the classified nodes, find narratives and then reason
        // Currently not using classified nodes, will migrate soon.
        this.narratives = new NarrativeWalker(this.pkg.meta, this.pkg.data);
    }
}