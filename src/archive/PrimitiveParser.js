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
            } 
            
            const foundPrimitive = this.processPrimitive(identifiers, primitive);
            if (foundPrimitive) {
                return foundPrimitive;
            }
        }
    }

    /**
     * Process the identifiers with the given primitive. Find if the syntax
     * matches and if it does, return the name of the participants.
     * 
     * @param {Array} identifiers 
     * @param {Object} primitive 
     * @returns 
     */
    processPrimitive(identifiers, primitive) {

        // The syntax length and the parsed identifier length doesn't match.
        if (identifiers.length !== primitive.syntax.length) {
            return null;
        }
        
        const info = {
            name: primitive.name
        };
        let pos = 0;

        // Loop through all the primitives
        do {
            const token = primitive.syntax[pos];
            if (token.type === "placeholder") {
                info[token.participant] = identifiers[pos];
            } else if (token.type === "string") {
                if (identifiers[pos] !== token.syntax) {
                    // Syntax is incorrect.
                    return null;
                }
            }
        } while (++pos < primitive.syntax.length);

        return info;
    }
}