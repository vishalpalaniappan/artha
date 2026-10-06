import { PrimitiveParser } from "./PrimitiveParser";
import FUNCTIONAL_IDENTIFIERS from "./FUNCTIONAL";

export class ArthaParser {

    constructor (tokens) {
        this.tokens = tokens;
        this.processTokens();
    }

    async loadPrimitives () {
        this.primitiveParser = new PrimitiveParser();
        this.primitives = await this.primitiveParser.processPrimitives();
    }

    async processTokens () {
        await this.loadPrimitives();
        for (const token of this.tokens) {
            const f = this.checkFunctionalIdentifier(token.value);
            if (f) {
                console.log("   FUNCTIONAL", token.value)
            } else {
                console.log(token.type, token.value)
            }
        }
    }

    checkFunctionalIdentifier (tokenValue) {
        return FUNCTIONAL_IDENTIFIERS.find((t) => t.name === tokenValue);
    }

    checkPrimitiveIdentifier (tokenValue) {

    }
}