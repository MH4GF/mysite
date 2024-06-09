import type { ComponentProps } from "react";
import { MyAvatar } from "./_components";
import { UniversalLink } from "./_features";
import { WorkExperience } from "./_features/top";

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

const workExperiences: ComponentProps<typeof WorkExperience>[] = [
  {
    period: "Current - 2022",
    company: {
      name: "ROUTE06, Inc.",
      url: "https://route06.co.jp/",
      position: (
        <>
          Software Engineer, Tech Lead
          <br />
          React, GraphQL, Rails, AWS
        </>
      ),
    },
  },
  {
    period: "2022 - 2021",
    company: {
      name: "Bit Journey, Inc.",
      url: "https://bitjourney.com/",
      position: (
        <>
          Software Engineer (Freelance)
          <br />
          React, GraphQL, Rails
        </>
      ),
    },
  },
  {
    period: "2022",
    company: {
      name: "DXER, Inc.",
      url: "https://dxer.co.jp/",
      position: (
        <>
          Software Engineer (Freelance)
          <br />
          React, Go, GraphQL
        </>
      ),
    },
  },
  {
    period: "2021 - 2020",
    company: {
      name: "ResortWorx, Inc.",
      url: "https://resortworx.jp/",
      position: (
        <>
          Software Engineer (Freelance)
          <br />
          Vue, Rails, AWS
        </>
      ),
    },
  },
  {
    period: "2021 - 2018",
    company: {
      name: "Timee, Inc.",
      url: "https://timee.co.jp/",
      position: (
        <>
          Backend Engineer
          <br />
          Rails, AWS
        </>
      ),
    },
  },
];

export default function Page() {
  return (
    <main className="max-w-3xl mx-auto py-32">
      <div className="flex flex-col gap-4 mb-72">
        <div className="flex gap-2 items-center">
          <MyAvatar />
          <h1 className="">MH4GF / Hirokata Miyagi</h1>
        </div>
        <p className="text-sm text-sub">
          Software Engineer at ROUTE06, inc.
          <br />
          Tokyo, Japan
        </p>
      </div>

      <div className="flex flex-col gap-20">
        <div className="flex flex-col gap-1">
          <h2>What I can do</h2>
          <p>
            Web Frontend (React, Next.js) / Backend (Ruby on Rails, Go) / GraphQL / Cloud (AWS,
            Terraform)
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h2>
              <UniversalLink href="/articles" isEnabledUnderline>
                All Writing
              </UniversalLink>
            </h2>
            <p className="text-sm text-sub">Write about what I learned today or my daily life.</p>
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="cursor-not-allowed	">Media (in preparation)</h2>
            <p className="text-sm text-sub">Talking at events, podcasts, etc...</p>
          </div>
          <div className="flex flex-col gap-1">
            <h2>
              <UniversalLink href="/behavior" isEnabledUnderline>
                好む振る舞い
              </UniversalLink>
            </h2>
            <p className="text-sm text-sub">
              チームで心地よく働くために意識していることをまとめています。
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h2>Work Experience</h2>
          <ul className="flex gap-1 snap-x snap-mandatory overflow-x-scroll pb-4 scrollbar-thin">
            {workExperiences.map((workExperience) => (
              <WorkExperience
                key={workExperience.period}
                {...workExperience}
                className="snap-start"
              />
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-6">
          <h2>Find me on</h2>
          <div className="flex flex-col gap-2 w-56">
            {findMeOn.map(({ service: sns, url, name }) => (
              <p key={sns} className="inline-flex justify-between">
                <span className="text-sub">{sns}</span>
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
