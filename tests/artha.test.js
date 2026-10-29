import { describe, expect, it} from "vitest";
import { resolve } from "path"
import { writeFile, readFile } from "fs/promises"
import { ensureDir, getFilesAndContent } from "./utils";
import { readdirSync } from 'node:fs';
import { Artha } from "../dist/index.esm";


ensureDir("./tests/output")
ensureDir("./tests/output/coffee_shop")

describe("meaning parser", async () => {

    it("tests artha", async () => {
        const arFiles = await getFilesAndContent("./designs/coffee_shop");
        const coffee_shop = new Artha(arFiles);

        await coffee_shop.runEngine();

        await writeFile(
            resolve(__dirname, "./output/coffee_shop/reasoningPkg.json"),
            JSON.stringify(coffee_shop.generateReasoningPackage(), null, 4)
        );
        

        await writeFile(
            resolve(__dirname, "./output/coffee_shop/narratives.json"),
            JSON.stringify(coffee_shop.engine.narratives.narratives, null, 4)
        );
    });
});