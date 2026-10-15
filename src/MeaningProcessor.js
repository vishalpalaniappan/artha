/**
 * Processes the meaning to classify it as primitive meaning of composite meaning.
 * 
 * It searches from two locations:
 * - CSP's
 * - Composite Meaning
 * 
 * Composite meaning is provided by the parser and the CSP meaning is provided by
 * the language.
 * 
 * Also, the reason that I am processing all of the parsed meaning in this class is
 * because the composite meaning could refer to a meaning that is established later
 * in the file or in another file. So I first parse all of the files and then I go
 * through each one with a full list of the composite meaning that has been established.
 */
export class MeaningProcessor {

    constructor (arthaParsed, primitives) {
        this.primitives = primitives;
        this.arthaParsed = arthaParsed;

        this.run();
    }

    run() {
        for (const meaning of this.arthaParsed) {
            const compositeSentence = meaning.compositeMeaningSentence;
            console.log(compositeSentence);

            for (const sentence of meaning.sentences) {
                for (const entry of sentence) {
                    if (Array.isArray(entry)) {
                        console.log("  " + entry.map((e) => e.value).join(" "))
                        const found = this.findCompositeMeaning(entry);
                    } else if (typeof entry === "object") {
                        console.log( "  " + entry.value)
                    }
                }
            }
            console.log(" ");
        }
    }

    findCompositeMeaning(parsedMeaning) {
        for (const compositeMeaning of this.arthaParsed) {
            // Compare the parsedMeaning with the compositeMeaning
        }
    }

    findPrimitiveMeaning(parsedMeaning) {
        for (const primitiveMeaning of primitives) {
            // Compare the primitiveMeaning with the primitiveMeaning
        }
    }

}