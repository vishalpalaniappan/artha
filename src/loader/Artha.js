/**
 * Accepts the contents of a design repo and does the following:
 * - Loads the meta file
 * - Parses the entry file
 * - Reads all the imports
 * - Parses all the imports
 * - Creates package for reasoning engine.
 * 
 * I will the extend this to run the engine and synthesize the output. The end goal is that this will be the only file that is exported and it will provide the mechanism to access the rest of the functionality.
 *
 * Example:
 * const coffee_shop = new Artha(PATH_TO_MEANING);
 * coffee_shop.reason();
 * coffee_shop.synthesize();
 * 
 * Access attributes (also used in workbench UI):
 * coffee_shop.parsed
 * coffee_shop.reasoning_output
 * 
 * Implementation:
 * coffee_shop.implementation
 */
export class Artha {
    constructor (files) {
        // Accepts the contents of the design repo
        this.files = files;
        this.loadMeta();
    }

    loadMeta () {
        const metaFile = this.files.find(
            (f) => f.name == "meta.json"
        );


        let meta;
        if (metaFile) {
            meta = JSON.parse(metaFile.content);
        } else {
            throw Error("Missing meta.json file.");
        }

        console.log(meta, meta.entry);

        // Load the entry file
        // parse entry file
    }

    parseFile () {
        // If file has already been parsed return.
        // Parse artha file
        // Recursively call on imported files
    }

}