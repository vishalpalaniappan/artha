/**
 * Parses accumulated identifies to check which primitive it applies to.
 */
export class PrimitiveParser {

    constructor (primitives) {
        this.primitives = primitives;
        this.parseSyntax()
    }

    parseSyntax() {
        for (const primitive of this.primitives) {
            const syntax_line = primitive.syntax_line;
            const split = syntax_line.split(" ");
            primitive.syntax = [];
            for (const word of split) {
                if (word.charAt(0) === "{") {
                    primitive.syntax.push({
                        type: "placeholder",
                        participant: word.slice(1,-1)
                    })
                } else {
                    primitive.syntax.push({
                        type: "string",
                        syntax: word
                    })
                }
            }
        }
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