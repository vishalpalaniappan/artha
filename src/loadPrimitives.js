export async function loadPrimitivesFromManifest() {

    const manifest = await import("./csp/manifest.json");
    const primitive_modules = await Promise.all(
      manifest.primitives.map(fileName => import(`./csp/primitives/${fileName}.json`))
    );

    const legacy_manifest = await import("./csp/legacy_manifest.json");
    const legacy_primitive_modules = await Promise.all(
      legacy_manifest.primitives.map(fileName => import(`./csp/legacy_primitives/${fileName}.json`))
    );

    const combined = [
      ...primitive_modules.map(m => m.default),
      ...legacy_primitive_modules.map(m => m.default)
    ];

    return combined;
}