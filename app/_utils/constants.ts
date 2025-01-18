type WorkExperience = {
  period: string;
  company: {
    name: string;
    url: string;
    position: string[];
  };
};

const workExperiences: WorkExperience[] = [
  {
    period: "Current - 2022",
    company: {
      name: "ROUTE06, Inc.",
      url: "https://route06.co.jp/",
      position: ["Software Engineer, Tech Lead", "React, GraphQL, Rails, AWS"],
    },
  },
  {
    period: "2022 - 2021",
    company: {
      name: "Bit Journey, Inc.",
      url: "https://bitjourney.com/",
      position: ["Software Engineer(Freelance)", "React, GraphQL, Rails"],
    },
  },
  {
    period: "2022",
    company: {
      name: "DXER, Inc.",
      url: "https://dxer.co.jp/",
      position: ["Software Engineer(Freelance)", "React, Go, GraphQL"],
    },
  },
  {
    period: "2021 - 2020",
    company: {
      name: "ResortWorx, Inc.",
      url: "https://resortworx.jp/",
      position: ["Software Engineer(Freelance)", "Vue, Rails, AWS"],
    },
  },
  {
    period: "2021 - 2018",
    company: {
      name: "Timee, Inc.",
      url: "https://timee.co.jp/",
      position: ["Backend Engineer", "Rails, AWS"],
    },
  },
];

type FindMeOn = {
  service: string;
  url: string;
  name: string;
};

const findMeOn: FindMeOn[] = [
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

type Me = {
  name: string;
  whatICanDo: string;
  workExperiences: WorkExperience[];
  findMeOn: {
    service: string;
    url: string;
    name: string;
  }[];
};

export const me: Me = {
  name: "MH4GF / Hirotaka Miyagi / 宮城広隆",
  whatICanDo:
    "Web Frontend (React, Next.js) / Backend (Ruby on Rails, Go) / GraphQL / Cloud (AWS, Terraform)",
  workExperiences,
  findMeOn,
};

export const siteInfo = Object.freeze({
  siteName: "Hirotaka Miyagi",
  description: "My personal website.",
  url: "https://mh4gf.dev",
  twitter: "@mh4gf",
});

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? process.env.NEXT_PUBLIC_BASE_URL
  : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";
