"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button aria-label="Toggle theme" className="w-8 h-8 rounded-md" />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex items-center justify-center w-8 h-8 p-1 rounded-md hover:bg-muted/10 transition"
    >
      {isDark ? (
        <i className="iconfont icon-taiyang theme-toggle-icon text-[21px] leading-none" aria-hidden="true" />
      ) : (
        <i className="iconfont icon-yueliang theme-toggle-icon text-[21px] leading-none" aria-hidden="true" />
      )}
    </button>
  );
}
