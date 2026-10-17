import { MeaningProcessor } from "./MeaningProcessor";

/**
 * The parser groups the meaning into blocks and splits
 * the blocks into sentences. Then each of the sentences
 * is parsed into the meaning that composes it. 
 * 
 * This can be composite meaning or it can be primitive 
 * meaning that can be connected using functional primitives
 * that establish narrative structure.
 */
export class ArthaParser {

    constructor (tokens, primitives) {
        this.tokens = tokens;
        this.grouped = [];
        this.stack = [];
        this.processTokens();
        this.processedMeaning = new MeaningProcessor(this.grouped, primitives);
    }

    /**
     * Process the tokens from the narrative.
     */
    processTokens () {
        this.currPos = 0;
        do {
            const token = this.tokens[this.currPos];

            if (token.type === "FUNCTIONAL" && token.value === "participant") {
                // Participant block begins
                this.beginParticipant();
                continue;
            }

            if (token.type === "FUNCTIONAL" && token.value === "meaning") {
                this.processMeaning();
                continue;
            }
            
            if (token.type === "RBRACE") {
                // Participant block ends
                this.grouped.push(this.stack.pop());
                continue;
            }

        } while (++this.currPos < this.tokens.length);
    }


    /**
     * Begin the participant.
     * 
     */
    beginParticipant() {
        const participant = this.tokens[++this.currPos].value;

        const token = this.tokens[++this.currPos];        
        if (token.type === "LBRACE") {
            this.stack.push({
                type: "participant",
                participant: participant,
                meaning: []
            })
        } else {
            throw Error("Expected LBRACE to block participant.")
        }
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

        const meaning = {
            type: "meaning",
            compositeMeaningArray: compositeMeaningArray,
            compositeMeaningSentence: compositeMeaningSentence,
            sentences: sentences
        }
        
        // If we are inside participant block, add it to blocks meaning.
        if (this.stack.length > 0) {
            // Currently only supports one nested block
            this.stack[0].meaning.push(meaning)
        } else {
            this.grouped.push(meaning)
        }
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
                if (accumulated.length > 0) processed.push(accumulated)
                accumulated = [];
                processed.push(sentence[pos]);    
            } else {
                if (sentence[pos].type === "COMMA") continue;
                accumulated.push(sentence[pos]);
            }
        } while (++pos < sentence.length);

        
        if (accumulated.length > 0)  processed.push(accumulated);
        return processed;
    }
}