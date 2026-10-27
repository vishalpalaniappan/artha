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
        this.parseFile(meta.entry);
    }

    parseFile (relativePath) {

        const currFile = this.files.find((f) => f.relativePath == relativePath);

        if (!currFile) {
            throw Error("Could not find entry file");
        }

        if (Object.keys(currFile).includes("ast")) {
            // Already parsed file.
            return;
        }

        const lexer = new ArthaLexer(entryFile.content);
        const parsed = new ArthaParser(lexer.scannedTokens);

        // Save the parsed ast in file
        entryFile.ast = parsed.ast;

        // Find all imports in current AST
        const imports = ast.body
            .filter((f) => f.command == "import")
            .map((f) => f.args[0].value);

        
        // Recursively call parse on the imports.
        for(const imp of imports) {
            this.parseFile(imp);
        }
    }

}