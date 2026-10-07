/**
 * Parses accumulated identifies to check which primitive it applies to.
 */
export class PrimitiveParser {

    constructor (primitives) {
        this.primitives = primitives;
    }

    /**
     * Given the accumulated identifiers find the syntax if there is any.
     * @param {Array} identifiers 
     * @returns 
     */
    findPrimitiveGivenIdentifiers (identifiers) {
        for (const primitive of this.primitives) {
            const syntax = primitive.syntax;
            if (identifiers.length === 0) {
                console.error("No identifiers in accumulated sentence");
                return identifiers;
            } else if (syntax[0].syntax === identifiers[0]) {
                return this.processAdd(identifiers, primitive);
            }
        }
    }

    /**
     * Process the add primitive and identify the participants involved.
     * @param {Array} identifiers 
     * @param {Object} primitive 
     * @returns 
     */
    processAdd(identifiers, primitive) {
        let pos = 0;
        const info = {name: primitive.name};
        do {
            const token = primitive.syntax[pos];

            if (token.type === "placeholder") {
                info[token.participant] = identifiers[pos];
            } else if (token.type === "string") {
                // TODO: Check that the syntax used was correct
            }

        } while (++pos < primitive.syntax.length);
        return info;
    }
}