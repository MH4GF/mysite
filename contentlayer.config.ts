// biome-ignore lint/correctness/noNodejsModules: contentlayer config requires Node.js modules for sync
import { spawn } from "node:child_process";
import { makeSource } from "@contentlayer/source-remote-files";
import { defineDocumentType } from "contentlayer/source-files";

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

const syncContentFromWorks = async (_contentDirPath: string) => {
  const githubToken = process.env.GITHUB_TOKEN;
  if (!githubToken) {
    throw new Error("GITHUB_TOKEN is required. See README for setup instructions.");
  }

  const contentDir = ".contentlayer/content";
  const repoUrl = `https://x-access-token:${githubToken}@github.com/MH4GF/works.git`;

  const bashScript = `
    if [ -d "${contentDir}" ]; then
      cd ${contentDir}
      git sparse-checkout set blog
      git pull
    else
      git clone --filter=blob:none --sparse ${repoUrl} ${contentDir}
      cd ${contentDir}
      git sparse-checkout set blog
    fi
  `;

  await new Promise<void>((resolve, reject) => {
    const child = spawn("bash", ["-c", bashScript]);

    child.on("close", (code: number | null) => {
      if (code !== 0) {
        reject(new Error(`Failed to sync content from works repository (exit code: ${code})`));
      } else {
        resolve();
      }
    });
  });

  // biome-ignore lint/suspicious/noEmptyBlockStatements: Return a no-op cancel function
  return () => {};
};

export default makeSource({
  syncFiles: syncContentFromWorks,
  contentDirPath: ".contentlayer/content/blog",
  documentTypes: [Article, About],
});
