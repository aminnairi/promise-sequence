// Library for reducing the bundle size
import {terser} from "rollup-plugin-terser";

// Library for using various filesystem's helpers
import {resolve} from "path";

export default {
  // Entrypoint of our library
  input: resolve("index.mjs"),

  // Plugins to apply to the entrypoint file
  plugins: [
    // Reduce the bundle size by minifying the input
    terser()
  ],

  // Output settings
  output: {
    // Output file to create
    file: resolve("build", "index.mjs"),

    // Format of the output, here ECMAScript Modules
    format: "esm"
  }
};
