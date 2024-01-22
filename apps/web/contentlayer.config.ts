import { defineDocumentType, makeSource } from "contentlayer/source-files";

export const Article = defineDocumentType(() => ({
  name: "Article",
  filePathPattern: "**/*.md",
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
    url: { type: "string", resolve: (article) => `/articles/${article._raw.flattenedPath}` },
  },
}));

export default makeSource({ contentDirPath: "contents/articles", documentTypes: [Article] });
