import { describe, expect, it} from "vitest";
import { resolve } from "path"
import { writeFile } from "fs/promises"
import { ArthaLexer} from "../src/Lexer";
import { ensureDir } from "./utils";

ensureDir("./tests/output")
ensureDir("./tests/output/tokenizer")

describe("tokenizer", async () => {

    it("basic tokenize", async () => {
        const lexer = new ArthaLexer("if books, in basket.");

        const token_output_path = resolve(__dirname, "./output/tokenizer/tokens.json")
        await writeFile(
            token_output_path,
            JSON.stringify(lexer.scannedTokens, null, 4)
        );
    });
});