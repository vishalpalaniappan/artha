/**
 * Processes the meaning to classify it as primitive meaning of composite meaning.
 * 
 * It searches from two locations:
 * - CSP's
 * - Composite Meaning
 * 
 * Composite meaning is provided by the parser and the CSP meaning is provided by
 * the language.
 */
export class MeaningProcessor {

    constructor (arthaParsed, primitives) {
        this.primitives = primitives;
        this.arthaParsed = arthaParsed;
    }


}