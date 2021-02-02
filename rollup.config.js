import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: "./src/index.ts",
  output: {
    file: "./dist/inview-next.js",
    format: "umd",
    name: "vueinview-next"
  },
  plugins: [
    typescript({lib: ["es5", "es6", "dom"], target: "es5"}),
    commonjs({dynamicRequireTargets: [
        "node_modules/in-view/dist/*.js"
    ]})
  ] 
};