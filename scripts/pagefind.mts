import { createIndex } from "pagefind";
import { externalArticles } from "../app/_features/articles/data/externalArticles";

async function main() {
  const { index } = await createIndex({});

  if (index === undefined) {
    throw new Error("Failed to create index");
  }

  await index.addDirectory({
    path: ".next",
  });

  for (const article of externalArticles) {
    await index.addCustomRecord({
      url: article.href,
      content: article.title,
      meta: {
        title: article.title,
        externalLink: "true",
      },
      language: "ja",
    });
  }

  await index.writeFiles({
    outputPath: "public/search",
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
