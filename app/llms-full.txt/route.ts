import { allAbouts, allArticles } from "@/.contentlayer/generated";
import { NextResponse } from "next/server";
import { externalArticles } from "../_features/articles/data";
import { compareDesc, me } from "../_utils";

function downgradeHeadings(content: string): string {
  return content.replace(/^## /gm, "### ");
}

function formatMarkdown(content: string): string {
  return downgradeHeadings(content);
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
${allAbouts.map((doc) => `### ${doc.title}\n${formatMarkdown(doc.body.raw)}\n`).join("\n\n")}

## Articles
${allArticles
  .sort((a, b) => compareDesc(new Date(a.publishedAt), new Date(b.publishedAt)))
  .map((doc) => `### ${doc.title}\n${formatMarkdown(doc.body.raw)}\n`)
  .join("\n\n")}

## External Articles
${externalArticles
  .map((doc) => {
    return `- [${doc.title}](${doc.href})`;
  })
  .join("\n")}
`;

export function GET() {
  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
