"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const HEADING_OFFSET = 128;

export default function TableOfContents({ headings }) {
  const [open, setOpen] = useState(true);
  const [activeId, setActiveId] = useState(headings[0]?.id ?? "");

  useEffect(() => {
    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter(Boolean);

    if (!elements.length) {
      return;
    }

    const updateActiveHeading = () => {
      let currentId = elements[0].id;

      for (const element of elements) {
        if (element.getBoundingClientRect().top <= HEADING_OFFSET) {
          currentId = element.id;
        }
      }

      setActiveId(currentId);
    };

    updateActiveHeading();
    window.addEventListener("scroll", updateActiveHeading, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateActiveHeading);
    };
  }, [headings]);

  if (!headings.length) {
    return null;
  }

  const topLevel = Math.min(...headings.map((heading) => heading.level));

  return (
    <section className="rounded-xl border border-black/[0.06] bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.03),0_18px_40px_-30px_rgba(15,23,42,0.25)] dark:border-white/[0.08] dark:bg-neutral-950">
      <div className="flex items-center justify-between border-b border-black/[0.06] pb-4 dark:border-white/[0.08]">
        <h2 className="text-[17px] font-semibold tracking-[-0.01em] text-foreground">
          目录
        </h2>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          {open ? "收起" : "展开"}
          {open ? (
            <ChevronUp className="h-4 w-4" aria-hidden="true" />
          ) : (
            <ChevronDown className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
      </div>

      {open ? (
        <nav className="mt-4" aria-label="文章目录">
          <ul className="space-y-0.5">
            {headings.map((heading) => {
              const isActive = heading.id === activeId;
              const isSubHeading = heading.level > topLevel;

              return (
                <li key={heading.id}>
                  <a
                    href={`#${heading.id}`}
                    onClick={() => setActiveId(heading.id)}
                    className={`relative flex rounded-md py-2 text-sm leading-6 transition-colors ${
                      isSubHeading ? "pl-9" : "pl-4"
                    } ${
                      isActive
                        ? "text-sky-600 dark:text-sky-400"
                        : isSubHeading
                          ? "text-muted-foreground hover:text-foreground"
                          : "text-foreground/75 hover:text-foreground"
                    }`}
                  >
                    {!isSubHeading && isActive ? (
                      <span className="absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full bg-sky-500" />
                    ) : null}
                    {heading.text}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      ) : null}
    </section>
  );
}
