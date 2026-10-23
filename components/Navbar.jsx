"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export const navigationItems = [
  {
    name: "首页",
    href: "/",
  },
  {
    name: "我的博客",
    href: "/blog",
  },
  {
    name: "我的项目",
    href: "/project",
  },
  {
    name: "我的技能",
    href: "/tech-stack",
  },
  {
    name: "我的经历",
    href: "/message",
  },
];

export default function Navbar({ page }) {
  return (
    <nav className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
      <ul className="flex items-center gap-1">
        {navigationItems.map((item) => {
          const isSelected = page === item.href;

          return (
            <li key={item.name} className="relative">
              {isSelected && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-[7px] bg-black/[0.055] dark:bg-white/[0.09]"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <Link
                href={item.href}
                aria-current={isSelected ? "page" : undefined}
                className={`relative z-10 flex h-9 items-center rounded-[7px] px-4 text-sm font-medium tracking-[-0.015em] transition-colors ${
                  isSelected
                    ? "text-foreground"
                    : "text-foreground/65 hover:text-foreground"
                }`}
              >
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
