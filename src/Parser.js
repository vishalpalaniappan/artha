import { PrimitiveParser } from "./PrimitiveParser";

export class ArthaParser {

    constructor (tokens, primitives) {
        this.tokens = tokens;
        this.grouped = [];
        this.primitives = primitives;
        this.processTokens();
    }

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

    processFunctional(value) {
        if (value === "if") {
            this.processIf();
        } else {
            console.log("Unsupported functional identifier.")
        }
    }

    processIf() {
        // Pattern is: IF [meaning] THEN [meaning].
        this.accumulator = [];
        while (++this.currPos < this.tokens.length) {
            const token = this.tokens[this.currPos];
            if (token.value === "then") {
                this.processAccumulator([...this.accumulator]);
                this.functional.push([...this.accumulator]);
                this.functional.push("then");
                this.accumulator = [];
                continue;
            } else if (token.value === ".") {
                this.functional.push([...this.accumulator]);
                this.functional.push(".");
                this.accumulator = [];
                return;
            }
            this.accumulator.push(token.value);
        }
    }

    processAccumulator (value) {
        // Process the accumulator.
    }

    processIdentifier(value) {
        // Process identifier here that exists outside a functional block here.
    }
}