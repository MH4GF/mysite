"use client";

import { useState } from "react";
import { CopyIcon } from "@/app/_components";
import { cn } from "@/app/_utils/cn";

interface Props {
  markdownContent: string;
}

export const CopyMarkdownButton = ({ markdownContent }: Props) => {
  const [copyState, setCopyState] = useState<"idle" | "success" | "error">("idle");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdownContent);
      setCopyState("success");
      setTimeout(() => setCopyState("idle"), 2000);
    } catch (_error) {
      setCopyState("error");
      setTimeout(() => setCopyState("idle"), 2000);
    }
  };

  const getButtonText = () => {
    switch (copyState) {
      case "success":
        return "Copied!";
      case "error":
        return "Failed to copy";
      default:
        return "Copy Markdown";
    }
  };

  const getButtonStyles = () => {
    const baseStyles =
      "inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

    switch (copyState) {
      case "success":
        return cn(baseStyles, "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200");
      case "error":
        return cn(baseStyles, "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200");
      default:
        return cn(
          baseStyles,
          "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 focus:ring-zinc-500",
        );
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      disabled={copyState !== "idle"}
      className={getButtonStyles()}
      aria-label="Copy markdown content to clipboard"
    >
      <CopyIcon className="w-4 h-4" />
      {getButtonText()}
    </button>
  );
};

