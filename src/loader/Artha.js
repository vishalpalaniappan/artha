import { ArthaLexer } from "../exports";
import { ArthaParser } from "../exports";

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

        if (!metaFile) {
            throw Error("Missing meta.json file.");
        }
        
        const meta = JSON.parse(metaFile.content);
        const entryFile = this.files.find(
            (f) => f.relativePath == meta.entry
        );

        this.parseFile(entryFile);
    }

    parseFile (entryFile) {

        const lexer = new ArthaLexer(entryFile.content);
        const parsed = new ArthaParser(lexer.scannedTokens);
        const ast = parsed.ast;

        console.log(ast);

        
        // If file has already been parsed return.
        // Parse artha file
        // Recursively call on imported files
    }

}