// contentlayer config runs in Node.js environment and requires child_process
// to sync content from remote repository using git commands
// biome-ignore lint/correctness/noNodejsModules: Required for git operations in contentlayer sync
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
  const githubToken = process.env.GITHUB_TOKEN?.trim();
  if (!githubToken) {
    throw new Error("GITHUB_TOKEN is required. See README for setup instructions.");
  }

  const contentDir = ".contentlayer/content";
  const repoUrl = `https://x-access-token:${githubToken}@github.com/MH4GF/works.git`;

  const bashScript = `
    set -e
    if [ -d "${contentDir}" ]; then
      cd ${contentDir}
      git sparse-checkout set --no-cone blog/*
      git pull 2>&1 | grep -v "x-access-token" || true
    else
      git clone --filter=blob:none --no-checkout --sparse ${repoUrl} ${contentDir} 2>&1 | grep -v "x-access-token" || true
      cd ${contentDir}
      git sparse-checkout init --no-cone
      git sparse-checkout set blog/*
      git checkout 2>&1 | grep -v "x-access-token" || true
    fi
  `;

  await new Promise<void>((resolve, reject) => {
    const child = spawn("bash", ["-c", bashScript], {
      stdio: ["inherit", "pipe", "pipe"],
    });

    let _stderr = "";
    child.stderr?.on("data", (data) => {
      _stderr += data.toString();
    });

    child.on("close", (code: number | null) => {
      if (code !== 0) {
        reject(
          new Error(
            `Failed to sync content from works repository (exit code: ${code}). Check GITHUB_TOKEN and repository access.`,
          ),
        );
      } else {
        resolve();
      }
    });

    child.on("error", (error) => {
      reject(new Error(`Spawn process failed: ${error.message}`));
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
