import TOKENS from "./TOKENS";

/**
 * Currently this lexer is just splitting the string into words.
 * Each word is saved as an identifier, I will parse them in the
 * next stage. 
 * 
 * It may seem like overkill to split a string this way but I will
 * extend this to include other features like using tokens to split
 * the string into sentences. I also think there might be a case to
 * be made for using commas or semicolons in the sentence structure.
 * Implementing the lexer in this way leaves the door open for all
 * of those features.
 * 
 * Example:
 * if books in basket
 * IDENTIFIER IDENTIFIER IDENTIFIER IDENTIFIER
 * 
 * I also save the line/col number (starting and ending). This will be
 * useful for visualization in the workbench.
 */
export class ArthaLexer {
    constructor (source) {
        this.currPos = 0;
        this.source = source;
        this.scannedTokens = [];

        // Current line and colno
        this.lineno = 1;
        this.colno = 0;

        // Accumulates identifiers until tokens are visited.
        this.accumulatedIdentifier = [];
        this.startColIdentifier;
        this.startLineIdentifier;

        this.run();
    }

    /**
     * Runs the lexer from the current position.
     */
    run() {
        do  {
            const character = this.source[this.currPos];
            this.processCurrentPosition(character);
        } while (++this.currPos < this.source.length);

        // Process the remaining accumulated identifier
        this.addAccumulatedIdentifierToken();
    }

    /**
     * Processes the character at the current position.
     */
    processCurrentPosition(character) {
        this.colno++;

        if (character === " " || character === "\t" || character === "\r") {
            this.addAccumulatedIdentifierToken();
            return;
        }

        if (character === "\n") {
            this.addAccumulatedIdentifierToken();
            this.lineno++;
            this.colno = 0;
            return;
        }

        this.addToAccumulator(character);
    }

    /**
     * Adds to accumulator. Saves starting position of
     * identifier being accumulated.
     * 
     * @param {String} character Character to add to accumulate.
     */
    addToAccumulator (character) {
        if (this.accumulatedIdentifier.length === 0) {
            this.startColIdentifier = this.colno;
            this.startLineIdentifier = this.lineno;
        }
        this.accumulatedIdentifier.push(character);
    }

    /**
     * Add the accumulated identifier to the scannedTokens list.
     */
    addAccumulatedIdentifierToken () {
        // Subtract 1 from endColno because we have to reach token
        // to identify that the accumulator is done.
        if (this.accumulatedIdentifier.length > 0) {
            this.scannedTokens.push({
                type: "IDENTIFIER",
                value: this.accumulatedIdentifier.join(""),
                startLineno: this.startLineIdentifier,
                startColno: this.startColIdentifier,
                endLineno: this.lineno,
                endColno: this.colno - 1
            })
            this.accumulatedIdentifier = [];
        }
    }

    /**
     * Adds the token to the scannedTokens list.
     * @param {String} type Type for the token.
     * @param {Number} value Value of token (example identifier)
     */
    addToken (type, value) {
        this.scannedTokens.push({
            type: type,
            value: value,
            startLineno: this.lineno,
            startColno: this.colno,
            endLineno: this.lineno,
            endColno: this.colno
        })
    }
}   