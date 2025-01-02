import type { Metadata } from "next";
import { MyAvatar } from "./_components";
import { UniversalLink } from "./_features";
import { WorkExperienceList } from "./_features/top";
import { me, siteInfo } from "./_utils";

export default function Page() {
  return (
    <main className="max-w-3xl mx-auto py-16 md:py-32 px-4 md:px-0 blur-enter-content">
      <div className="flex flex-col gap-4 mb-40 md:mb-72">
        <div className="flex gap-2 items-center">
          <MyAvatar />
          <h1>{me.name}</h1>
        </div>
        <p className="text-sm text-foreground-sub whitespace-pre-wrap">
          {me.description.join("\n")}
        </p>
      </div>

      <div className="flex flex-col gap-20 blur-enter-content">
        <div className="flex flex-col gap-4">
          <h2>What I can do</h2>
          <p>{me.whatICanDo}</p>
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
            {me.findMeOn.map(({ service: sns, url, name }) => (
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

export const metadata: Metadata = {
  title: `About | ${siteInfo.siteName}`,
};
