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

        // Visit the nodes in the atomic behavior and inspect their meaning
        this.processBehavior(atomicBehavior);
    }

    processBehavior (behavior) {
        for (const node of behavior.body) {
            console.log(this.processNode(node));
        }
    }

    processNode(node) {
        if (node.type === "cmd") {
            const foundPrimitive = this.findPrimitive(node.command);
            if (foundPrimitive) return foundPrimitive;

            const foundBehavior = this.findBehavior(node.command)
            if (foundBehavior) return foundBehavior;
        }
    }

    findBehavior(name) {
        for (const file of this.pkg.data) {
            const behavior = file.ast.body.find(
                (f) => (f.type === "behavior") && (f.behaviorName == name)
            )
            if (behavior) return behavior;
        }
    }

    findParticipant(name) {
        for (const file of this.pkg.data) {
            const participant = file.ast.body.find(
                (f) => (f.type === "participant") && (f.participantType == name)
            )
            if (participant) participant;
        }
    }

    findPrimitive(name) {
        const foundPrimitive = this.primitives.find(
            (f) => f.syntax === name
        );
        if (foundPrimitive) return foundPrimitive;
    }
}