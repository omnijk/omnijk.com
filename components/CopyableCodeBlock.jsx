"use client";

import { useState } from "react";

function getCodeText(children) {
  if (!children) return "";

  if (typeof children === "string") {
    return children;
  }

  if (Array.isArray(children)) {
    return children.map(getCodeText).join("");
  }

  if (children?.props?.children) {
    return getCodeText(children.props.children);
  }

  return "";
}

export default function CopyableCodeBlock({ children, ...props }) {
  const [copied, setCopied] = useState(false);
  const codeText = getCodeText(children).trimEnd();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="group relative">
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Copied code" : "Copy code"}
        className="absolute right-3 top-3 z-10 rounded-md border border-border/60 bg-background/90 px-2.5 py-1 text-xs font-medium text-foreground opacity-0 shadow-sm transition group-hover:opacity-100 hover:bg-muted/70"
      >
        {copied ? "Copied" : "Copy"}
      </button>
      <pre className="overflow-x-auto" {...props}>
        {children}
      </pre>
    </div>
  );
}