import { MeaningProcessor } from "./MeaningProcessor";

/**
 * The current state of the parser groups the meaning into
 * blocks and splits the blocks into sentences.
 * 
 * In the next stage, each of the sentences will be parsed into
 * the meaning that composes it. This can be composite meaning or
 * it can be primitive meaning. The composite and primitive meaning
 * can also be connected using functional primitives which are used
 * to establish narrative structure.
 */
export class ArthaParser {

    constructor (tokens, primitives) {
        this.tokens = tokens;
        this.grouped = [];
        this.processTokens();
        this.parsedOutput = new MeaningProcessor(this.grouped, primitives);
    }

    /**
     * Process the tokens from the narrative.
     */
    processTokens () {
        this.currPos = 0;
        do {
            const token = this.tokens[this.currPos];
            if (token.type === "FUNCTIONAL" && token.value === "meaning") {
                this.processMeaning();
            }
        } while (++this.currPos < this.tokens.length);
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
        
        // Expect meaning to be followed by of
        if (this.tokens[++this.currPos].value !== "of") {
            throw Error("Syntax error: Expected meaning to be followed by 'of'.");
        }

        // Gather the title of the composed meaning
        // meaning of [composite title]
        let compositeMeaningArray = [];
        let compositeMeaningSentence; 
        while (++this.currPos < this.tokens.length) {
            const token = this.tokens[this.currPos];
            if (token.type === "LBRACE") {
                console.log("Block opened");
                compositeMeaningSentence = compositeMeaningArray.map(
                    (e)=> e.value
                ).join(" ");
                startIndex = ++this.currPos;
                break;
            }
            compositeMeaningArray.push(token);
        }

        // The meaning block was not opened.
        if (!startIndex) {
            throw Error("Syntax error: Expected opening brace for meaning block.")
        }

        // Group the rest of the block.
        while (++this.currPos < this.tokens.length) {
            const token = this.tokens[this.currPos];
            if (token.type === "RBRACE") {
                console.log("Block closed");
                endIndex = this.currPos;
                break;
            }
        }

        // The block was not closed.
        if (!endIndex) {
            throw Error("Syntax error: Expected closing brace for meaning block.")
        }

        // Split the blocks into lines.
        const sentences = [];
        let sentence = [];
        for (let i = startIndex; i < endIndex; i++) {
            if (this.tokens[i].type === "PERIOD") {
                sentences.push(this.processSentence([...sentence]));
                sentence = [];
            } else {
                sentence.push(this.tokens[i]);
            }
        }

        // Save the grouped meaning
        this.grouped.push(
            {
                compositeMeaningArray: compositeMeaningArray,
                compositeMeaningSentence: compositeMeaningSentence,
                sentences: sentences
            }
        )
    }

    /**
     * "if bill is requested then get bill."
     * 
     * "if", "bill is requested", "then", "get bill"
     * 
     * @param {Array} sentence 
     */
    processSentence(sentence) {
        let processed = [];
        let pos = 0;
        let accumulated = [];
        do {
            if (sentence[pos].type === "FUNCTIONAL") {
                if (accumulated.length > 0) {
                    processed.push(accumulated)
                    accumulated = [];
                }
                processed.push(sentence[pos]);    
            } else {
                accumulated.push(sentence[pos]);
            }
        } while (++pos < sentence.length);
        processed.push(accumulated);
        return processed;
    }
}