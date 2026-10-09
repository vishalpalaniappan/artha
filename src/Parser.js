import { PrimitiveParser } from "./PrimitiveParser";

/**
 * Parses the tokenized Artha script. It processes each token and uses the functional identifiers to accumulate the narratives that establish the meaning of the block. 
 * 
 * For example:
 * "if bill is requested then add cost_of_bagel and cost_of_coffee and store result in total_cost."
 * 
 * if 
 * [
 *      bill is requested
 * ] 
 * then 
 * [
 *      {
 *          "name": "add",
 *          "addend1": "cost_of_bagel",
 *          "addend2": "cost_of_coffee",
 *          "result": "total_cost"
 *      }
 * ]
 * 
 * Here, the meaning of bill is requested needs to be constructed from CSP's and the meaning of add cost_of_bagel and cost_of_coffee and store result in total_cost has already been implemented with a CSP.
 * 
 * This is being implemented and is considered work in progress, it will go through a lot of refinement.
 */
export class ArthaParser {

    constructor (tokens, primitives) {
        this.tokens = tokens;
        this.grouped = [];
        this.primitives = new PrimitiveParser(primitives);
        this.processTokens();
    }

    /**
     * Process the tokens from the narrative.
     */
    processTokens () {
        this.currPos = 0;
        do {
            const token = this.tokens[this.currPos];
            // console.log(token.type, token.value)

            if (token.type === "FUNCTIONAL") {
                this.functional = [token.value];
                this.processFunctional(token.value);
                this.grouped.push([...this.functional]);
            } else if (token.type === "IDENTIFIER") {
                this.processIdentifier(token.value);
            }
            this.currPos++;
        } while (this.currPos < this.tokens.length)
    }

    /**
     * Process the functional token. Currently, only if is
     * supported but this will be extended to support while,
     * then etc.
     * @param {String} value 
     */
    processFunctional(value) {
        if (value === "if") {
            this.processIf();
        } else {
            console.log("Unsupported functional identifier.")
        }
    }

    /**
     * Processes the if functional block. The block itself is
     * established as IF [meaning] THEN [meaning]. So I accumulate
     * the identifiers until I reach the relevant identifier and then
     * process the accumulated narrative.
     * 
     * There are more effective ways to do this but it is ok for now, I 
     * want to explore the rest of this pipeline. In the end, I will write
     * a more elegant algorithm that does this efficiently.
     * @returns 
     */
    processIf() {
        // Pattern is: IF [meaning] THEN [meaning].
        this.accumulator = [];
        while (++this.currPos < this.tokens.length) {
            const token = this.tokens[this.currPos];
            if (token.value === "then") {
                this.processAccumulator(this.accumulator);
                this.functional.push("then");
                this.accumulator = [];
                continue;
            } else if (token.value === ".") {
                this.processAccumulator(this.accumulator);
                this.functional.push(".");
                this.accumulator = [];
                return;
            }
            this.accumulator.push(token.value);
        }
    }

    /**
     * Process the accumulated identifiers.
     * @param {Array} identifiers 
     */
    processAccumulator (identifiers) {
        // Process the accumulator.
        const primInfo = this.primitives.findPrimitiveGivenIdentifiers(identifiers);
        if (primInfo && Object.keys(primInfo).length > 0) {
            this.functional.push([primInfo]);
        } else {
            this.functional.push([...this.accumulator]);
        }
    }

    processIdentifier(value) {
        // Process identifier here that exists outside a functional block here.
    }
}