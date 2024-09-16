"use client";
import { useEffect } from "react";
import { destroy, init } from "tocbot";

import "./TableOfContents.css";

export const TableOfContents = () => {
  useEffect(() => {
    init({
      tocSelector: "#toc",
      contentSelector: ".prose",
      headingSelector: "h1, h2, h3, h4",
      ignoreSelector: "[data-ignore-toc]",
      listClass: "toc-list",
    });

    return () => destroy();
  }, []);

  return <nav id="toc" className="text-sm text-zinc-500 dark:text-zinc-400" aria-label="目次" />;
};
