/**
 * Parses accumulated identifies to check which primitive it applies to.
 */
export class PrimitiveParser {

    constructor (primitives) {
        this.primitives = primitives;
        this.parseSyntax()
    }

    /**
     * Parse the narrative syntax into an array so that
     * it can be processed by the primitive parser.
     * 
     * add {addend1} and {addend2} and store result in {result}
     * 
     * add:
     * {
     *      type: "string",
     *      syntax: "add"
     * }
     * 
     * {addend1}:
     * {
     *      type: "placeholder",
     *      participant: "addend1"
     * }
     * 
     * This is used when parsing the constructed narrative to access the
     * meaning it is referencing and the relevant participants.
     */
    parseSyntax() {
        for (const primitive of this.primitives) {
            primitive.syntax = [];

            // Process each word in the syntax
            for (const word of primitive.syntax_line.split(" ")) {
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
     * Given the accumulated identifiers find the primitive which the identifiers
     * belong to. 
     * 
     * Currently, I am only comparing the first position, this is very crude.
     * This will be made more elegant as I iterate on it. 
     * 
     * @param {Array} identifiers 
     * @returns 
     */
    findPrimitiveGivenIdentifiers (identifiers) {
        for (const primitive of this.primitives) {
            if (identifiers.length === 0) {
                console.error("No identifiers in accumulated sentence");
                return identifiers;
            } else if (primitive.syntax[0].syntax === identifiers[0]) {
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