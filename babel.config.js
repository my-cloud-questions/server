module.exports = {
  presets: [
    [
      "@babel/env",
      {
        targets: { node: "current" }
      }
    ]
  ],
  plugins: ["@babel/plugin-transform-runtime", "dynamic-import-node"]
  // env: {
  //   test: {
  //     sourceMaps: "inline",
  //     retainlines: true
  //   }
  // }

  // { corejs: { version: 3, proposals: true }, useESModules: true }
};
