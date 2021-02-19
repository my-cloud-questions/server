module.exports = {
  presets: [
    [
      "@babel/env",
      {
        targets: { node: "current" }
      }
    ]
  ],
  plugins: [
    [
      "@babel/plugin-transform-runtime",
      { corejs: { version: 3, proposals: true }, useESModules: true }
    ]
  ]
  // env: {
  //   test: {
  //     sourceMaps: "inline",
  //     retainlines: true
  //   }
  // }
};
