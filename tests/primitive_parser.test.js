import { describe, expect, it} from "vitest";
import { resolve } from "path"
import { writeFile } from "fs/promises"
import { PrimitiveParser } from "../dist/index.esm";
import { ArthaLexer } from "../dist/index.esm";
import { ArthaParser } from "../dist/index.esm";
import { ensureDir } from "./utils";

ensureDir("./tests/output")
ensureDir("./tests/output/primitive_parser")

describe("primitive parser", async () => {

    it("tests the artha parser", async () => {
        const lexer = new ArthaLexer("store result of add cost_of_bagel and cost_of_coffee in total_cost");
        const parser = new ArthaParser(lexer.scannedTokens);

    });
});