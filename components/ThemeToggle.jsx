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
        <SunMedium className="size-5" aria-hidden="true" />
      ) : (
        <MoonStar className="size-5" aria-hidden="true" />
      )}
    </button>
  );
}
