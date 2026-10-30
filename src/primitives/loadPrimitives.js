export async function loadPrimitivesFromManifest() {

    const manifest = await import("./manifest.json");

    const computable_primitive_modules = await Promise.all(
      manifest.computable_primitives.map(fileName => import(`./computable_primitives/${fileName}.json`))
    );

    const legacy_primitive_modules = await Promise.all(
      manifest.legacy_primitives.map(fileName => import(`./legacy_primitives/${fileName}.json`))
    );

    const meta_primitive_modules = await Promise.all(
      manifest.meta_primitives.map(fileName => import(`./meta_primitives/${fileName}.json`))
    );

    const functional_primitives_modules = await Promise.all(
      manifest.functional_primitives.map(fileName => import(`./functional_primitives/${fileName}.json`))
    );

    return [
      ...computable_primitive_modules.map(m => m.default),
      ...legacy_primitive_modules.map(m => m.default),
      ...meta_primitive_modules.map(m => m.default),
      ...functional_primitives_modules.map(m => m.default)
    ];
}