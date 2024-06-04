"use client";

import { useCallback, useEffect, useState } from "react";

export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 500);

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const handleClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <button
      type="button"
      className={`${
        isVisible ? "opacity-75" : "opacity-0"
      } fixed right-2 bottom-2 h-10 w-10 rounded-sm p-2 text-zinc-400 transition duration-300 hover:bg-zinc-500 hover:dark:bg-zinc-700 hover:text-zinc-300`}
      onClick={handleClick}
    >
      ↑
    </button>
  );
};
