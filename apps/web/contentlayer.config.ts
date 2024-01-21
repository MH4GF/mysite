import { defineDocumentType, makeSource } from "contentlayer/source-files";

export const Article = defineDocumentType(() => ({
  name: "Article",
  filePathPattern: "**/*.md",
  fields: {
    title: { type: "string", required: true },
    publishedAt: { type: "date", required: true },
  },
  computedFields: {
    url: { type: "string", resolve: (article) => `/article/${article._raw.flattenedPath}` },
  },
}));

export default makeSource({ contentDirPath: "contents/articles", documentTypes: [Article] });
