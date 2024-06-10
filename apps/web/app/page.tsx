import type { ComponentProps } from "react";
import { MyAvatar } from "./_components";
import { UniversalLink } from "./_features";
import { WorkExperienceList } from "./_features/top";

const findMeOn: {
  service: string;
  url: ComponentProps<typeof UniversalLink>["href"];
  name: string;
}[] = [
  {
    service: "X",
    url: "https://x.com/mh4gf",
    name: "@MH4GF",
  },
  {
    service: "GitHub",
    url: "https://github.com/MH4GF",
    name: "@MH4GF",
  },
  {
    service: "Zenn",
    url: "https://zenn.dev/mh4gf",
    name: "@mh4gf",
  },
  {
    service: "sizu.me",
    url: "https://sizu.me/mh4gf",
    name: "@mh4gf",
  },
];

export default function Page() {
  return (
    <main className="max-w-3xl mx-auto py-16 md:py-32 px-4 md:px-0">
      <div className="flex flex-col gap-4 mb-40 md:mb-72">
        <div className="flex gap-2 items-center">
          <MyAvatar />
          <h1 className="">MH4GF / Hirokata Miyagi</h1>
        </div>
        <p className="text-sm text-foreground-sub">
          Software Engineer at ROUTE06, inc.
          <br />
          Tokyo, Japan
        </p>
      </div>

      <div className="flex flex-col gap-20">
        <div className="flex flex-col gap-4">
          <h2>What I can do</h2>
          <p>
            Web Frontend (React, Next.js) / Backend (Ruby on Rails, Go) / GraphQL / Cloud (AWS,
            Terraform)
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h2>About</h2>
          <div className="flex flex-col gap-1">
            <h3>
              <UniversalLink href="/articles" isEnabledUnderline>
                All Writing
              </UniversalLink>
            </h3>
            <p className="text-sm text-foreground-sub">
              Write about what I learned today or my daily life.
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="cursor-not-allowed	">Media (in preparation)</h3>
            <p className="text-sm text-foreground-sub">Talking at events, podcasts, etc...</p>
          </div>
          <div className="flex flex-col gap-1">
            <h3>
              <UniversalLink href="/behavior" isEnabledUnderline>
                好む振る舞い
              </UniversalLink>
            </h3>
            <p className="text-sm text-foreground-sub">
              チームで心地よく働くために、意識していることをまとめています。
            </p>
          </div>
        </div>

        <WorkExperienceList />

        <div className="flex flex-col gap-4">
          <h2>Find me on</h2>
          <div className="flex flex-col gap-2 w-56">
            {findMeOn.map(({ service: sns, url, name }) => (
              <p key={sns} className="inline-flex justify-between">
                <span className="text-foreground-sub">{sns}</span>
                <UniversalLink href={url} isEnabledUnderline>
                  {name}
                </UniversalLink>
              </p>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
