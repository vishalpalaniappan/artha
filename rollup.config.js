import resolve from "@rollup/plugin-node-resolve";
import fs from "fs";

// Temporarily using this library, will write my own later.
// Not a fan of using unofficial libraries that aren't maintained.
import importGlob from '@jackfranklin/rollup-plugin-import-glob';

function dalLoadPlugin() {
    return {
      name: 'dal-load-plugin',
      transform(code, id) {
        if (id.endsWith('.dal')) {
          const text = fs.readFileSync(id, 'utf-8');
          return {
            code: `export default ${JSON.stringify(text)};`,
            map: null,
          };
        }
      },
    };
  }

export default {
    input: "src/exports.js",
    output: [
        {
            file: "dist/index.cjs",
            format: "cjs",
            inlineDynamicImports: true,
        },
        {
            file: "dist/index.esm.js",
            format: "esm",
            inlineDynamicImports: true,
        },
    ],
    plugins: [
        resolve(),
        importGlob(),
        dalLoadPlugin()
    ],
};
