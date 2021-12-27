import {terser} from "rollup-plugin-terser";
import {resolve} from "path";

export default {
  input: resolve("index.mjs"),
  plugins: [
    terser()
  ],
  output: {
    file: resolve("build", "index.mjs"),
    format: "esm"
  }
};
