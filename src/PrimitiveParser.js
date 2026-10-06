export class PrimitiveParser {

    constructor () {
    }

    async processPrimitives () {
        this.primitivesMeta = await loadPrimitivesFromManifest();

        for (const primitive of this.primitivesMeta) {
            const syntax = primitive["syntax"];
            console.log(syntax);
        }
    }
}


async function loadPrimitivesFromManifest() {
    const manifest = await import("./csp/manifest.json");
    const modules = await Promise.all(
      manifest.primitives.map(fileName => import(`./csp/${fileName}.json`))
    );
    return modules.map(m => m.default);
}