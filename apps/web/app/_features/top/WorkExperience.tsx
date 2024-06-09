import type { ComponentProps, FC, ReactNode } from "react";
import { UniversalLink } from "../viewTransition";

type Props = {
  period: string;
  company: {
    name: string;
    url: ComponentProps<typeof UniversalLink>["href"];
    position: ReactNode;
  };
  className?: string;
};

export const WorkExperience: FC<Props> = ({ period, company, className }) => {
  return (
    <li className={`${className} flex flex-col gap-8`}>
      <div className="flex flex-col gap-1">
        <p className="text-xs text-sub">{period}</p>
        <p>
          <UniversalLink href={company.url} isEnabledUnderline>
            {company.name}
          </UniversalLink>
        </p>
        <p className="text-xs text-sub">{company.position}</p>
      </div>
      <div className="flex items-center gap-1">
        <div className="rounded-full w-[5px] h-[5px] bg-zinc-400" />
        <div className="h-px w-[80vw] md:w-80 bg-zinc-500" />
      </div>
    </li>
  );
};
