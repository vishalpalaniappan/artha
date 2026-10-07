export class PrimitiveParser {

    constructor (primitives) {
        this.primitives = primitives;
    }

    findPrimitiveGivenIdentifier (identifiers) {
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

    processAdd(identifiers, primitive) {
        let pos = 0;
        const info = {name: primitive.name};
        do {
            const token = primitive.syntax[pos];

            if (token.type === "placeholder") {
                info[token.participant] = identifiers[pos];
            } else if (token.type === "string") {

            }

        } while (++pos < primitive.syntax.length);
        return info;
    }
}