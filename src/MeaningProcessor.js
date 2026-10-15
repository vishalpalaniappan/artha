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
        
        this.outputLog = "";

        this.run();
    }

    run() {
        for (const meaning of this.arthaParsed) {
            const compositeSentence = meaning.compositeMeaningSentence;

            this.outputLog += "=================" + "\n";
            this.outputLog += compositeSentence + "\n";
            this.outputLog += "=================" + "\n";

            for (const sentence of meaning.sentences) {
                for (const entry of sentence) {

                    console.log(entry)

                    // Functional token in sentence (parser saves it as object)
                    if (entry !== null && typeof entry === "object" && !Array.isArray(entry)) {
                        this.outputLog += "    " + entry.value + "\n";
                    }

                    // Composite or primitive meaning (parser saves it as array)
                    else if (Array.isArray(entry)) {
                        const joinStr = "      " + entry.map((e) => e.value).join(" ");
                        
                        const foundComposite = this.findCompositeMeaning(entry);
                        if (foundComposite) {
                            this.outputLog += joinStr + " --> COMPOSITE MEANING" + "\n";
                            continue;
                        }

                        const foundPrimitive = this.findPrimitiveMeaning(entry);
                        if (foundPrimitive) {
                            this.outputLog += joinStr + ` --> PRIMITIVE MEANING: ${foundPrimitive.name}` + "\n";
                            continue;
                        }

                        // Not composite or primitive meaning, meaning is missing
                        this.outputLog += joinStr + "\n";
                    } 
                }
            }
            this.outputLog += "\n\n";
        }
    }

    findCompositeMeaning(parsedMeaning) {
        for (const compositeMeaningObj of this.arthaParsed) {
            const compositeMeaning = compositeMeaningObj.compositeMeaningArray;

            // Compare the parsedMeaning with the compositeMeaning
            if (compositeMeaning.length !== parsedMeaning.length) continue;

            let found = true;
            for (const index in parsedMeaning) {
                const compositeEntry = compositeMeaning[index];
                const parsedEntry = parsedMeaning[index];
                
                // If the composite entry doesn't have val, continue
                const val = compositeEntry.value;
                if (val.length === 0) continue;
                
                // This references a participant, so we can't compare
                if (val[0] === "[" && val[val.length - 1] === "]") {
                    continue;
                }

                // Check if the syntax matches
                if (compositeEntry.value !== parsedEntry.value) {
                    found = false;
                }
            }

            if (found) {
                return compositeMeaningObj;
            }
        }
    }

    findPrimitiveMeaning(parsedMeaning) {
        for (const primitiveMeaningObj of this.primitives) {
            // Compare the parsedMeaning with the primitiveMeaning
            const primitiveMeaning = primitiveMeaningObj.syntax_line.split(" ");
            

            // Compare the parsedMeaning with the compositeMeaning
            if (primitiveMeaning.length !== parsedMeaning.length) continue;

            
            let found = true;
            for (const index in parsedMeaning) {
                const primitiveEntry = primitiveMeaning[index];
                const parsedEntry = parsedMeaning[index];
                
                // If the composite entry doesn't have val, continue
                if (primitiveEntry.length === 0) continue;
                
                // This references a participant, so we can't compare
                if (primitiveEntry[0] === "[" && primitiveEntry[primitiveEntry.length - 1] === "]") {
                    continue;
                }

                // Check if the syntax matches
                if (primitiveEntry !== parsedEntry.value) {
                    found = false;
                }
            }

            if (found) {
                // console.log("Found primitive:", primitiveMeaningObj.name);
                return primitiveMeaningObj;
            }

        }
    }

}