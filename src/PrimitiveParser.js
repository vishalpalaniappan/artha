import {DalAstGenerator} from "dal-ast-js";
import * as primitives from 'glob:./csp/*.dal';

export class PrimitiveParser {

    constructor () {
        const folderPath = "./src/csp";
        this.loadPrimitives()
    }

    loadPrimitives () {
        console.log(primitives)
    }
}