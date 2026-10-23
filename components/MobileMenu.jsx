"use client";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { navigationItems } from "./Navbar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function MobileMenu() {
  const pathname = usePathname();
  const page = pathname.split("/").slice(0, 2).join("/");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Sheet open={open} onOpenChange={(state) => setOpen(state)}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="打开菜单"
          className="inline-flex h-9 w-9 items-center justify-center rounded-[8px] border border-black/[0.08] bg-white/60 text-foreground transition-colors hover:bg-black/[0.05] dark:border-white/[0.1] dark:bg-white/[0.04] dark:hover:bg-white/[0.08]"
        >
          <Menu className="h-[18px] w-[18px]" />
        </button>
      </SheetTrigger>
      <SheetContent
        side="top"
        className="top-[5.5rem] mx-3 mt-0 rounded-[10px] border border-black/[0.08] bg-white/95 p-2 font-sans shadow-[0_24px_60px_-20px_rgba(15,23,42,0.35)] backdrop-blur-2xl backdrop-saturate-150 dark:border-white/[0.09] dark:bg-neutral-950/90 sm:mx-4"
      >
        <div className="flex h-9 items-center px-4">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            导航
          </span>
        </div>
        <nav className="flex flex-col gap-0.5 p-2">
          {navigationItems.map((item) => {
            const isSelected = page === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                aria-current={isSelected ? "page" : undefined}
                className={cn(
                  "flex items-center justify-between rounded-[8px] px-4 py-3 text-sm transition-colors",
                  isSelected
                    ? "bg-black/[0.05] font-semibold text-foreground dark:bg-white/[0.08]"
                    : "text-muted-foreground hover:bg-black/[0.03] hover:text-foreground dark:hover:bg-white/[0.05]"
                )}
              >
                {item.name}
                {isSelected && (
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
                )}
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
