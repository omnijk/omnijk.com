"use client";

import { usePathname } from "next/navigation";
import Avatar from "./Avatar";
import Navbar from "./Navbar";
import ThemeToggle from "./ThemeToggle";
import GithubIcon from "@/public/icons/GithubIcon";
import Link from "next/link";

export default function Header() {
  const pathname = usePathname();
  const page = pathname.split("/").slice(0, 2).join("/");

  return (
    <header className="grid w-full grid-flow-col grid-cols-3 sm:grid-cols-4">
      <Avatar page={page} />

      <Navbar page={page} />

      <div className="flex items-center justify-end gap-2">
        <Link
          href="https://github.com/omnijk/omnijk.com"
          target="_blank"
          className="text-foreground/80 hover:text-foreground dark:text-white/80 dark:hover:text-white"
        >
          <GithubIcon className="h-10 w-10" />
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
