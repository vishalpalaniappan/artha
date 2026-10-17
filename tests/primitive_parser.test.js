import { describe, expect, it} from "vitest";
import { resolve } from "path"
import { writeFile, readFile } from "fs/promises"
import { ArthaLexer } from "../dist/index.esm";
import { ArthaParser } from "../dist/index.esm";
import { ensureDir } from "./utils";
import { loadPrimitivesFromManifest } from "../dist/index.esm";
import { readdirSync } from 'node:fs';
import { extname } from 'node:path';

ensureDir("./tests/output")
ensureDir("./tests/output/meaning_parser")

function getFilesByExtensionSync(dir, targetExt) {
  const files = readdirSync(dir, { recursive: true });
  return files.filter(file => extname(file) === targetExt);
}

describe("meaning parser", async () => {

    it("tests the artha parser", async () => {

        // Get all artha files from folder
        const arFiles = await getFilesByExtensionSync('./tests/designs/coffee_shop', '.ar');

        // Group all the files into one src
        let shopSrc = "";
        for (const file of arFiles) {
            const src = await readFile("./tests/designs/coffee_shop/" + file);
            shopSrc += src.toString() + "\n";
        }

        const lexer = new ArthaLexer(shopSrc);

        const primitive = await loadPrimitivesFromManifest();
        const parser = new ArthaParser(lexer.scannedTokens, primitive);

        const tokens_output_path = resolve(__dirname, "./output/meaning_parser/tokens.json")
        await writeFile(
            tokens_output_path,
            JSON.stringify(parser.tokens, null, 4)
        );

        const parser_output_path = resolve(__dirname, "./output/meaning_parser/parser.json")
        await writeFile(
            parser_output_path,
            JSON.stringify(parser, null, 4)
        );

        const grouped_output_path = resolve(__dirname, "./output/meaning_parser/parsed.json")
        await writeFile(
            grouped_output_path,
            JSON.stringify(parser.grouped, null, 4)
        );

        const meaning_path = resolve(__dirname, "./output/meaning_parser/meaning.txt")
        await writeFile(
            meaning_path,
            parser.processedMeaning.outputLog
        );
    });
});