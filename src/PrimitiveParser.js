

export class PrimitiveParser {

    constructor () {
        const folderPath = "./src/csp";
        this.loadPrimitives()
    }

    async loadPrimitives () {
        const primitives = await loadPrimitivesFromManifest();
        for (const primitive of primitives) {
            const syntax = primitive["syntax"];
            console.log(syntax);
        }
    }
}


async function loadPrimitivesFromManifest() {
    const manifest = await import('./csp/manifest.json');
    const modules = await Promise.all(
      manifest.primitives.map(fileName => import(`./csp/${fileName}.json`))
    );
    return modules.map(m => m.default);
}