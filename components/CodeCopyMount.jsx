"use client";

import { useEffect } from "react";

export default function CodeCopyMount() {
  useEffect(() => {
    const root = document.querySelector(".blog-content");
    if (!root) return;

    const pres = Array.from(root.querySelectorAll("pre"));
    const attached = [];

    pres.forEach((pre) => {
      if (pre.dataset.copyAttached) return;
      pre.dataset.copyAttached = "1";

      pre.classList.add("group");

      // ensure pre is positioned to contain absolute button
      const prevPosition = pre.style.position;
      if (!prevPosition || prevPosition === "static") {
        pre.style.position = "relative";
      }

      const btn = document.createElement("button");
      btn.type = "button";
      btn.setAttribute("aria-label", "Copy code");
      btn.innerText = "Copy";
      btn.className = "absolute right-2 top-2 z-10 rounded-md border border-border/70 bg-background/90 px-2 py-1 text-xs font-medium text-foreground opacity-0 shadow-sm backdrop-blur-sm transition-all duration-200 ease-out group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none hover:bg-background focus-visible:opacity-100 focus-visible:pointer-events-auto dark:border-white/10 dark:bg-zinc-900/80 dark:text-zinc-100 dark:hover:bg-zinc-900";

      btn.addEventListener("click", async (e) => {
        e.preventDefault();
        try {
          const codeNode = pre.querySelector("code");
          const text = codeNode?.innerText ?? pre.innerText;
          await navigator.clipboard.writeText(text);
          const prev = btn.innerText;
          btn.innerText = "Copied";
          setTimeout(() => (btn.innerText = prev), 1500);
        } catch (err) {
          console.error("copy failed", err);
        }
      });

      pre.appendChild(btn);
      attached.push({ pre, btn });
    });

    return () => {
      attached.forEach(({ pre, btn }) => {
        try {
          btn.remove();
          delete pre.dataset.copyAttached;
        } catch (e) {
          // ignore
        }
      });
    };
  }, []);

  return null;
}
