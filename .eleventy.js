const pluginTOC = require("eleventy-plugin-toc");



module.exports = function (config) {
  
  let markdownIt = require("markdown-it");
  let markdownItKatex = require("@iktakahiro/markdown-it-katex");
  let markdownItFootnote = require("markdown-it-footnote");
  const markdownItAnchor = require("markdown-it-anchor");
  const markdownItAttrs = require("markdown-it-attrs");

  let options = {
    html: true,
    breaks: true,
    linkify: true,
    typographer: true,
  };

  let markdownItAnchorOptions = {
    level: 2, // minimum level header -- anchors will only be applied to h2 level headers and below but not h1
    permalink: markdownItAnchor.permalink.headerLink({
      safariReaderFix: false,
      class: "header-anchor"
    }),
  };

  let markdownLib = markdownIt(options)
    .use(markdownItFootnote)
    .use(markdownItKatex)
    .use(markdownItAnchor, markdownItAnchorOptions)
    .use(markdownItAttrs);

  config.setLibrary("md", markdownLib);

  config.addPlugin(pluginTOC);

  config.addPassthroughCopy("src/style/*.css");

  return {
    dir: {
      input: "./src",
      output: "./build",
    },
  };
};
