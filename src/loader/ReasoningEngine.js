import { loadPrimitivesFromManifest } from "../primitives/loadPrimitives";

/**
 * Accepts a path to an artha project and does the following:
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
    constructor () {
        
    }

    setPath (path) {
        this.path = path;
    }

}