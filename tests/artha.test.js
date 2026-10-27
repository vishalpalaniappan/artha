import { describe, expect, it} from "vitest";
import { resolve } from "path"
import { writeFile, readFile } from "fs/promises"
import { ensureDir } from "./utils";
import { readdirSync } from 'node:fs';
import { Artha } from "../dist/index.esm";


ensureDir("./tests/output")
ensureDir("./tests/output/meaning_parser")

describe("meaning parser", async () => {

    it("tests artha", async () => {
        const arFiles = readdirSync("./designs/coffee_shop", { recursive: true });
        const coffee_shop = new Artha(arFiles);

    });
});