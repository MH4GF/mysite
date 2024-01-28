import { defineDocumentType, makeSource } from "contentlayer/source-files";

export const Article = defineDocumentType(() => ({
  name: "Article",
  filePathPattern: "articles/*.md",
  fields: {
    title: { type: "string", required: true },
    publishedAt: { type: "date", required: true },
    tags: {
      type: "list",
      of: {
        type: "enum",
        options: [
          "route06-tech-blog",
          "timee-product-team-blog",
          "zenn",
          "qiita",
          "note",
          "dev",
          "life",
          "speaker-deck",
        ],
        required: true,
      },
      required: true,
    },
  },
  computedFields: {
    href: { type: "string", resolve: (article) => `/${article._raw.flattenedPath}` },
    externalLink: { type: "boolean", resolve: () => false },
  },
}));

export const About = defineDocumentType(() => ({
  name: "About",
  filePathPattern: "about/*.md",
  fields: {
    title: { type: "string", required: true },
  },
  computedFields: {
    href: {
      type: "string",
      resolve: (about) => {
        const segments = about._raw.flattenedPath.split("/");
        return `/${segments[segments.length - 1]}`;
      },
    },
  },
}));

export default makeSource({ contentDirPath: "contents", documentTypes: [Article, About] });
