"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MoonStar, SunMedium } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <span
        aria-hidden="true"
        className="inline-flex h-9 w-9 rounded-[8px] border border-black/[0.08] bg-white/60 dark:border-white/[0.1] dark:bg-white/[0.04]"
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      aria-label="切换主题"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex h-9 w-9 items-center justify-center rounded-[8px] border border-black/[0.08] bg-white/60 text-foreground/70 transition-all hover:-translate-y-px hover:bg-black/[0.04] hover:text-foreground dark:border-white/[0.1] dark:bg-white/[0.04] dark:hover:bg-white/[0.08]"
    >
      {isDark ? (
        <SunMedium className="h-[17px] w-[17px]" aria-hidden="true" />
      ) : (
        <MoonStar className="h-[17px] w-[17px]" aria-hidden="true" />
      )}
    </button>
  );
}
