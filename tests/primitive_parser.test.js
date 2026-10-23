import { describe, expect, it} from "vitest";
import { resolve } from "path"
import { writeFile, readFile } from "fs/promises"
import { ensureDir } from "./utils";
import { readdirSync } from 'node:fs';
import { extname } from 'node:path';
import { ArthaLexer } from "../dist/index.esm";
import { ArthaParser } from "../dist/index.esm";


ensureDir("./tests/output")
ensureDir("./tests/output/meaning_parser")

function getFilesByExtensionSync(dir, targetExt) {
  const files = readdirSync(dir, { recursive: true });
  return files.filter(file => extname(file) === targetExt);
}

describe("meaning parser", async () => {

    it("tests the artha parser", async () => {

        const src = await readFile("./tests/designs/test.ar");
        const lexer = new ArthaLexer(src.toString());

        const tokens_output_path = resolve(__dirname, "./output/meaning_parser/test_tokens.json")
        await writeFile(
            tokens_output_path,
            JSON.stringify(lexer.scannedTokens, null, 4)
        );

        const parser = new ArthaParser(lexer.scannedTokens);
        const ast_output_path = resolve(__dirname, "./output/meaning_parser/ast.json")
        await writeFile(
            ast_output_path,
            JSON.stringify(parser.ast, null, 4)
        );



    });
});