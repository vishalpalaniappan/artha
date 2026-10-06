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
        this.currPos = 0;
        do {
            const token = this.tokens[this.currPos];
            console.log("   ", token.type, token.value)
            if (token.type === "FUNCTIONAL") {
                this.processFunctional(token.value);
            } else if (token.type === "IDENTIFIER") {
                this.processIdentifier(token.value);
            }
            this.currPos++;
        } while (this.currPos < this.tokens.length)
    }

    processFunctional(value) {
        if (value === "if") {
            console.log("Processing if")
        } else if (value === "while") {
            console.log("Processing while")
        } else {
            console.log("Invalid functional identifier at start.")
        }
    }

    processIdentifier(value) {

    }
}