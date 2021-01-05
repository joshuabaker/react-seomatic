import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";

import pkg from "./package.json";

export default {
  input: pkg.source,
  output: [
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: "es",
      sourcemap: true,
    },
  ],
  plugins: [
    babel({
      exclude: "node_modules/**",
    }),
    resolve(),
    commonjs(),
  ],
  external: ["react"],
};
