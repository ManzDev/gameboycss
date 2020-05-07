const postcssOptions = require("./.postcssrc.json");

module.exports = {
  plugins: [["postcss-template-literals", { tag: "css", ...postcssOptions }]],
};
