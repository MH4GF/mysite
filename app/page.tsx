import type { Metadata } from "next";
import { Fragment } from "react";
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
          Building{" "}
          <UniversalLink href="https://liambx.com" isEnabledUnderline>
            Liam ERD
          </UniversalLink>
          , Software Engineer at ROUTE06, inc.
          <br />
          Tokyo, Japan
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
              <UniversalLink href="/contents" isEnabledUnderline>
                All Contents
              </UniversalLink>
            </h3>
            <p className="text-sm text-foreground-sub">
              Write about what I learned today or my daily life.
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <h3>
              <UniversalLink href="/contents/tags/media" isEnabledUnderline>
                Media
              </UniversalLink>
            </h3>
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
          <div className="flex flex-col gap-1">
            <h3>
              <UniversalLink href="/resume" isEnabledUnderline>
                Resume
              </UniversalLink>
            </h3>
          </div>
        </div>

        <WorkExperienceList />

        <div className="flex flex-col gap-4">
          <h2>Find me on</h2>
          <div>
            <p className="flex gap-2">
              {me.findMeOn.map(({ service: sns, url }, index) => (
                <Fragment key={sns}>
                  <span>
                    <UniversalLink href={url} isEnabledUnderline>
                      {sns}
                    </UniversalLink>
                  </span>
                  <span>{index < me.findMeOn.length - 1 && "/"}</span>
                </Fragment>
              ))}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export const metadata: Metadata = {
  title: `About | ${siteInfo.siteName}`,
};
