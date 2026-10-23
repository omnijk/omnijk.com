"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Avatar from "./Avatar";
import Navbar from "./Navbar";
import { MobileMenu } from "./MobileMenu";
import ThemeToggle from "./ThemeToggle";
import GithubIcon from "@/public/icons/GithubIcon";

export default function Header() {
  const pathname = usePathname();
  const page = pathname.split("/").slice(0, 2).join("/");

  return (
    <header className="sticky top-4 z-50 w-full">
      <div className="relative flex h-16 items-center justify-between gap-2 rounded-lg border border-black/[0.055] bg-white/25 px-2.5 font-sans shadow-[0_1px_0_rgba(255,255,255,0.6)_inset,0_10px_30px_-22px_rgba(15,23,42,0.3)] backdrop-blur-2xl backdrop-saturate-150 transition-colors dark:border-white/[0.06] dark:bg-neutral-950/45 dark:shadow-[0_1px_0_rgba(255,255,255,0.04)_inset,0_16px_40px_-24px_rgba(0,0,0,0.9)] sm:px-3.5">
        <Avatar />

        <Navbar page={page} />

        <div className="flex items-center gap-2.5">
          <Link
            href="https://github.com/omnijk/omnijk.com"
            target="_blank"
            rel="noreferrer"
            className="group hidden h-9 items-center gap-2 rounded-[8px] bg-neutral-900 px-4 text-[13px] font-medium tracking-[-0.01em] text-white shadow-[0_1px_2px_rgba(0,0,0,0.2)] transition-all hover:-translate-y-px hover:bg-neutral-800 hover:shadow-[0_4px_12px_rgba(0,0,0,0.18)] dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 sm:inline-flex"
          >
            <GithubIcon className="h-4 w-4 opacity-90 transition-opacity group-hover:opacity-100" />
            GitHub
          </Link>

          <ThemeToggle />

          <div className="lg:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
