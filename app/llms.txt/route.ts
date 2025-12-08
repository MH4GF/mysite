import { NextResponse } from "next/server";
import { allAbouts, allArticles } from "@/.contentlayer/generated";
import { externalArticles } from "../_features/articles/data";
import { compareDesc, me } from "../_utils";

function extractSummary(content: string, maxLength = 200): string {
  const lines = content.split("\n");
  const paragraphs: string[] = [];
  let current = "";

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("#") || trimmed.startsWith("-") || trimmed === "") {
      if (current) {
        paragraphs.push(current.trim());
        current = "";
      }
      continue;
    }
    current += `${trimmed} `;
  }
  if (current) {
    paragraphs.push(current.trim());
  }

  const firstParagraph = paragraphs[0] || "";
  if (firstParagraph.length <= maxLength) {
    return firstParagraph;
  }
  return `${firstParagraph.slice(0, maxLength)}...`;
}

const content = `# ${me.name}

> Building [Liam ERD](https://liambx.com), Software Engineer at ROUTE06, inc.
> Tokyo, Japan

## What I can do
${me.whatICanDo}

## Work Experience
${me.workExperiences
  .map((work) => {
    return `### [${work.company.name}](${work.company.url})
- ${work.period}
- ${work.company.position.join("\n- ")}
`;
  })
  .join("\n")}

## Find me on
${me.findMeOn
  .map(({ service, url, name }) => {
    return `- [${service}](${url}) ${name}`;
  })
  .join("\n")}

## About
${allAbouts
  .map((doc) => {
    const summary = extractSummary(doc.body.raw);
    return `### ${doc.title}\n${summary}`;
  })
  .join("\n\n")}

## Articles
${allArticles
  .sort((a, b) => compareDesc(new Date(a.publishedAt), new Date(b.publishedAt)))
  .map((doc) => `- [${doc.title}](https://mh4gf.dev${doc.href})`)
  .join("\n")}

## External Articles
${externalArticles.map((doc) => `- [${doc.title}](${doc.href})`).join("\n")}
`;

export function GET() {
  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
