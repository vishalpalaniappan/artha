import { describe, expect, it} from "vitest";
import { resolve } from "path"
import { writeFile, readFile } from "fs/promises"
import { PrimitiveParser } from "../dist/index.esm";
import { ArthaLexer } from "../dist/index.esm";
import { ArthaParser } from "../dist/index.esm";
import { ensureDir } from "./utils";
import { loadPrimitivesFromManifest } from "../dist/index.esm";

ensureDir("./tests/output")
ensureDir("./tests/output/meaning_parser")

describe("meaning parser", async () => {

    it("tests the artha parser", async () => {

        const shop = (await readFile("./tests/designs/coffee_shop/coffee_shop.ar")).toString();
        const lexer = new ArthaLexer(shop);

        const primitive = await loadPrimitivesFromManifest();
        const parser = new ArthaParser(lexer.scannedTokens, primitive);

        const parser_output_path = resolve(__dirname, "./output/meaning_parser/tokens.json")
        await writeFile(
            parser_output_path,
            JSON.stringify(parser, null, 4)
        );

        const grouped_output_path = resolve(__dirname, "./output/meaning_parser/parsed.json")
        await writeFile(
            grouped_output_path,
            JSON.stringify(parser.grouped, null, 4)
        );
    });
});