import { me } from "@/app/_utils";
import type { FC } from "react";
import { UniversalLink } from "../viewTransition";

export const WorkExperienceList: FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <h2>Work Experience</h2>
      <ul className="flex gap-1 snap-x snap-mandatory overflow-x-scroll pb-4 scrollbar-thin">
        {me.workExperiences.map(({ company, period }) => (
          <li key={company.name} className="snap-start flex flex-col gap-8">
            <div className="flex flex-col gap-1">
              <p className="text-xs text-foreground-sub">{period}</p>
              <h3>
                <UniversalLink href={company.url} isEnabledUnderline>
                  {company.name}
                </UniversalLink>
              </h3>
              <p className="text-xs text-foreground-sub whitespace-pre-wrap">
                {company.position.join("\n")}
              </p>
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
