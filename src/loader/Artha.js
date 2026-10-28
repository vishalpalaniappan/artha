import { ArthaLexer } from "../exports";
import { ArthaParser } from "../exports";
import { ReasoningEngine } from "../exports";

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
 * const coffee_shop = new Artha(files_in_script_directory);
 * coffee_shop.reason();
 * coffee_shop.synthesize();
 * 
 * Access attributes (also used in workbench UI):
 * coffee_shop.parsed
 * coffee_shop.reasoning_output
 * 
 * Implementation:
 * coffee_shop.implementation
 * 
 * Note, files in script directory take the following form:
 * [
 *   {
 *     fullPath: filePath,
 *     name: ...,
 *     relativePath: path.relative(dirPath, filePath),
 *     content: ...
 *   },
 *   ...
 * ]
 */
export class Artha {
    constructor (files) {
        // Accepts the contents of the design repo
        this.files = files;
        this.meta = null;
        this.parseFiles();
    }

    /**
     * Read the meta json file and begin parsing files process by parsing the
     * entry file. The parseFile method will recursively call itself on all
     * imports until all the files are parsed.
     */
    parseFiles () {
        const metaFile = this.files.find((f) => f.name == "meta.json");
        if (!metaFile) throw Error("Missing meta.json file.");
        
        this.meta = JSON.parse(metaFile.content);
        this.parseFile(this.meta.entry);
    }

    /**
     * Parse the file and save the AST in the file. Recursively call parse on
     * all the imported files until all imported files are parsed. If a file
     * as already been parsed (has ast key), don't parse it.
     * 
     * @param {String} relativePath Relative path to the file.
     * @returns 
     */
    parseFile (relativePath) {
        const currFile = this.files.find((f) => f.relativePath == relativePath);
        if (!currFile) throw Error("Could not find entry file");

        // File was already parsed (imported in multiple files)
        if (Object.keys(currFile).includes("ast")) return;

        const lexer = new ArthaLexer(currFile.content);
        const parsed = new ArthaParser(lexer.scannedTokens);

        // Save the parsed ast in file
        currFile.ast = parsed.ast;

        // Find all imports in current AST
        const imports = currFile.ast.body
            .filter((f) => f.command == "import")
            .map((f) => f.args[0].value);

        // Recursively call parse on the imports.
        for(const imp of imports) {
            this.parseFile(imp);
        }
    }

    /**
     * Run the reasoning engine with the generated reasoning package. Prior to running the reasoning process, load the necessary primitives.
     */
    async runEngine () {
        this.engine = new ReasoningEngine(
            this.generateReasoningPackage()
        );

        await this.engine.loadPrimitives();

        this.engine.reason();
    }

    /**
     * Generates a reasoning package for the engine. The package contains:
     * 
     * {
     *      meta: <meta.json content>,
     *      data: [
     *          {
     *              fullPath: <fullPath>,
     *              name: <name>,
     *              relativePath: <relativePath>,
     *              content: <file_content>
     *              ast: {
     *                  type: "root",
     *                  body: [
     *                      {
     *                          <ast_node>
     *                      },
     *                      {
     *                          <ast_node>
     *                      }
     *                  ]
     *              }   
     *          },
     *          ...
     *      ]
     * }
     * 
     * In combination with the primitive types, this contains the relevant information to be able to reason about the specified meaning.
     * 
     * TODO:
     * I want to add the line and col information to the AST so that when the engine produces conclusions, it also shows where to highlight the conclusion in the script for the users attention. This information is already in the tokenizer, I just haven't added it to the generated AST yet.
     * 
     * @returns {Object}
     */
    generateReasoningPackage () {
        const data = this.files.filter((f) => "ast" in f);
        return {
            meta: this.meta,
            data
        }
    }


}