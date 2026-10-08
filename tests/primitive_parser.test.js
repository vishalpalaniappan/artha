import { describe, expect, it} from "vitest";
import { resolve } from "path"
import { writeFile } from "fs/promises"
import { PrimitiveParser } from "../dist/index.esm";
import { ArthaLexer } from "../dist/index.esm";
import { ArthaParser } from "../dist/index.esm";
import { ensureDir } from "./utils";
import { loadPrimitivesFromManifest } from "../dist/index.esm";

ensureDir("./tests/output")
ensureDir("./tests/output/primitive_parser")

describe("primitive parser", async () => {

    it("tests the artha parser", async () => {
        const lexer = new ArthaLexer(
            `
            if bill is requested then multiply cost_of_bagel and number_of_bagels and store result in cost_of_bagels then add cost_of_bagels and cost_of_coffee and store result in total_cost. 
            `
        );

        const primitive = await loadPrimitivesFromManifest();
        const parser = new ArthaParser(lexer.scannedTokens, primitive);

        const parser_output_path = resolve(__dirname, "./output/primitive_parser/parser.json")
        await writeFile(
            parser_output_path,
            JSON.stringify(parser, null, 4)
        );

        const grouped_output_path = resolve(__dirname, "./output/primitive_parser/grouped.json")
        await writeFile(
            grouped_output_path,
            JSON.stringify(parser.grouped, null, 4)
        );

    });
});