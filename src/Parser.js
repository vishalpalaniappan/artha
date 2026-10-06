import { PrimitiveParser } from "../dist/index.esm";

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
            console.log(token);
        }
    }

}