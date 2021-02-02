import babel from "rollup-plugin-babel";

export default {
  input: "./src/index.ts",
  output: {
    file: "/dist/inview-next.js",
    format: "umd",
    name: "vueinview-next"
  },
  plugins: [
    babel({
      exclude: "node_modules/**"
    })
  ] 
};