import type { ComponentProps, FC, ReactNode } from "react";
import { UniversalLink } from "../viewTransition";

type Item = {
  period: string;
  company: {
    name: string;
    url: ComponentProps<typeof UniversalLink>["href"];
    position: ReactNode;
  };
};

const workExperiences: Item[] = [
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

export const WorkExperienceList: FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <h2>Work Experience</h2>
      <ul className="flex gap-1 snap-x snap-mandatory overflow-x-scroll pb-4 scrollbar-thin">
        {workExperiences.map(({ company, period }) => (
          <li key={company.name} className="snap-start flex flex-col gap-8">
            <div className="flex flex-col gap-1">
              <p className="text-xs text-foreground-muted">{period}</p>
              <h3>
                <UniversalLink href={company.url} isEnabledUnderline>
                  {company.name}
                </UniversalLink>
              </h3>
              <p className="text-xs text-foreground-muted">{company.position}</p>
            </div>
            <div className="flex items-center gap-1">
              <div className="rounded-full w-[5px] h-[5px] bg-zinc-400" />
              <div className="h-px w-[80vw] md:w-80 bg-zinc-500" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
