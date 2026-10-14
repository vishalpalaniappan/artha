import { PrimitiveParser } from "./PrimitiveParser";

/**
 *
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

            if (token.type === "FUNCTIONAL") {
                console.log(token.type, token.value);
                if (token.value === "meaning") {
                    this.processMeaning();
                }
            }
            this.currPos++;
        } while (this.currPos < this.tokens.length);

        console.log(this.grouped);
    }

    /**
     * Processes meaning block into object.
     *
     * meaning of [title of composite meaning] {
     *   sentence 1.
     *   sentence 2.
     * }
     * 
     * [
     *      {
     *          composite: "coffee shop",
     *          sentences: [
     *              ...
     *          ]
     *      },
     *      ...
     * ]
     */
    processMeaning() {
        let startIndex, endIndex;
        
        // increment position to complete syntax
        if (this.tokens[++this.currPos].value !== "of") {
            throw Error("Syntax Error");
        }

        // gather the title of the composed meaning
        let meaning = "";
        while (++this.currPos < this.tokens.length) {
            const token = this.tokens[this.currPos];
            if (token.type === "LBRACE") {
                console.log("Block opened");
                startIndex = ++this.currPos;
                break;
            }
            meaning = meaning + token.value + " ";
        }

        // group the rest of the block
        while (++this.currPos < this.tokens.length) {
            const token = this.tokens[this.currPos];
            if (token.type === "RBRACE") {
                console.log("Block closed");
                endIndex = this.currPos;
                break;
            }
        }

        if (!startIndex || !endIndex) {
            throw Error("Invalid syntax.")
        }

        // Group the sentences within meaning block
        const sentences = [];
        let sentence = [];
        for (let i = startIndex; i < endIndex; i++) {
            const token = this.tokens[i];
            if (this.tokens[i].type === "PERIOD") {
                sentences.push(sentence);
                sentence = [];
                continue;
            }
            sentence.push(this.tokens[i]);
        }

        // Save the grouped meaning
        this.grouped.push(
            {
                composite: meaning,
                sentences: sentences
            }
        )
    }
}