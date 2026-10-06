import resolve from "@rollup/plugin-node-resolve";
import json from '@rollup/plugin-json';
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars';

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
        json(),
        resolve(),
        dynamicImportVars({
          // include patterns if necessary
        })
    ],
};
