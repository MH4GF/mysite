import { createIndex } from "pagefind";

async function main() {
  const { index } = await createIndex({});

  if (index === undefined) {
    throw new Error("Failed to create index");
  }

  await index.addDirectory({
    path: ".next",
  });

  await index.writeFiles({
    outputPath: "public/search",
  });
}

main();
