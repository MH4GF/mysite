"use client";
import { useEffect } from "react";
import tocbot from "tocbot";

import "./TableOfContents.css";

export const TableOfContents = () => {
  useEffect(() => {
    tocbot.init({
      tocSelector: "#toc",
      contentSelector: ".prose",
      headingSelector: "h1, h2, h3, h4",
      ignoreSelector: "[data-ignore-toc]",
      listClass: "toc-list",
    });

    return () => tocbot.destroy();
  }, []);

  return <nav id="toc" className="text-sm text-zinc-500" />;
};
