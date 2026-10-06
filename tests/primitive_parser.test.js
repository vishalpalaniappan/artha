import { describe, expect, it} from "vitest";
import { resolve } from "path"
import { writeFile } from "fs/promises"
import { PrimitiveParser } from "../dist/index.esm";
import { ensureDir } from "./utils";

ensureDir("./tests/output")
ensureDir("./tests/output/primitive_parser")

describe("primitive parser", async () => {

    it("parses the computable semantic primitives", async () => {
        const parser = new PrimitiveParser();
    });
});