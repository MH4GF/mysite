import { defineDocumentType, makeSource } from "contentlayer/source-files";

export const Article = defineDocumentType(() => ({
  name: "Article",
  filePathPattern: "articles/*.md",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    publishedAt: { type: "date", required: true },
    headingImage: { type: "string", required: false },
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
        ],
        required: true,
      },
      required: true,
    },
  },
  computedFields: {
    href: { type: "string", resolve: (article) => `/${article._raw.flattenedPath}` },
    slug: {
      type: "string",
      resolve: (article) => {
        const segments = article._raw.flattenedPath.split("/");
        return segments[segments.length - 1];
      },
    },
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
