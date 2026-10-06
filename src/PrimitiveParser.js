import {DalAstGenerator} from "dal-ast-js";
import * as primitives from 'glob:./csp/*.dal';

export class PrimitiveParser {

    constructor () {
        const folderPath = "./src/csp";
        this.loadPrimitives()
    }

    loadPrimitives () {
        for (const primitive in primitives) {
            const ast = new DalAstGenerator().run(primitives[primitive].default.toString());
            const name = ast["name"][0].value;
            console.log("Design:", name);
            const syntaxObj = ast["body"].find((obj) => obj["command"] === "syntax");
            const syntax = syntaxObj.args[0].value;
            console.log(syntax);
        }
    }
}