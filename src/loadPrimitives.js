export async function loadPrimitivesFromManifest() {

    const manifest = await import("./csp/manifest.json");

    const computable_primitive_modules = await Promise.all(
      manifest.computable_primitives.map(fileName => import(`./csp/computable_primitives/${fileName}.json`))
    );

    const legacy_primitive_modules = await Promise.all(
      manifest.legacy_primitives.map(fileName => import(`./csp/legacy_primitives/${fileName}.json`))
    );

    const meta_primitive_modules = await Promise.all(
      manifest.meta_primitives.map(fileName => import(`./csp/meta_primitives/${fileName}.json`))
    );

    const lifecycle_primitives_modules = await Promise.all(
      manifest.lifecycle_primitives.map(fileName => import(`./csp/lifecycle_primitives/${fileName}.json`))
    );

    return [
      ...computable_primitive_modules.map(m => m.default),
      ...legacy_primitive_modules.map(m => m.default),
      ...meta_primitive_modules.map(m => m.default),
      ...lifecycle_primitives_modules.map(m => m.default)
    ];
}