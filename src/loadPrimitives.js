export async function loadPrimitivesFromManifest() {
    const manifest = await import("./csp/manifest.json");
    const modules = await Promise.all(
      manifest.primitives.map(fileName => import(`./csp/${fileName}.json`))
    );
    return modules.map(m => m.default);
}