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
        this.processBehavior([atomicBehavior]);
    }

    processBehavior (behaviors) {
        // I intend to refactor this, I am just testing visiting of the nodes while maintaining a list of visited behaviors (terminate when looped).
        const currBehavior = behaviors[behaviors.length - 1];
        console.log("")
        console.log(behaviors.map((b) => b.behaviorName));

        for (const node of currBehavior.body) {
            const foundNode = this.processNode(node);
            if (!foundNode) continue;

            if (foundNode.type === "behavior") {
                if (!behaviors.includes(foundNode.behaviorName)) {
                    this.processBehavior([...behaviors, foundNode]);
                }
            }

            if (foundNode.type === "functional" && foundNode.name === "if") {
                console.log("Found functional node, condition:", node.args[0].value);
            }
        }
    }

    processNode(node) {
        if (node.type === "cmd") {
            const foundPrimitive = this.findPrimitive(node.command);
            if (foundPrimitive) return foundPrimitive;

            const foundBehavior = this.findBehavior(node.command)
            if (foundBehavior) return foundBehavior;
        } 
        
        if (node.type === "if") {
            const foundPrimitive = this.findPrimitive(node.type);
            if (foundPrimitive) return foundPrimitive;
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