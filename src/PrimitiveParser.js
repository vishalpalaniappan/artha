

export class PrimitiveParser {

    constructor () {
        const manifestPath = "./csp/manifest.json";
        this.primitives = await loadPrimitivesFromManifest(manifestPath);
        this.processPrimitives()
    }

    async processPrimitives () {
        for (const primitive of primitives) {
            const syntax = primitive["syntax"];
            console.log(syntax);
        }
    }
}


async function loadPrimitivesFromManifest(manifestPath) {
    const manifest = await import(manifestPath);
    const modules = await Promise.all(
      manifest.primitives.map(fileName => import(`./csp/${fileName}.json`))
    );
    return modules.map(m => m.default);
}