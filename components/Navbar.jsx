"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { MobileMenu } from "./MobileMenu";

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
    <>
      <div className="justify-center hidden col-span-2 mt-0.5 sm:flex h-14">
        <ul className="site-nav items-center justify-center hidden bg-[#f2f2f21a] rounded-full sm:flex px-2 py-1 ">
          {navigationItems.map((item) => {
            const isSelected = page == item.href;
            return (
              <motion.li key={item.name} className="relative">
                {isSelected && (
                  <>
                    <div className="site-nav-selected-line absolute left-1/4 w-1/2 mx-auto border-t-[3px] rounded-full shadow-[0_20px_100px_8px_#fff]">
                      <motion.div
                        className="absolute inset-0"
                        layoutId="selected"
                      ></motion.div>
                    </div>
                    <div className="site-nav-selected absolute top-0.5 bottom-0.5 w-full bg-[#f2f2f20d] rounded-full">
                      <motion.div
                        className="absolute inset-0"
                        layoutId="selecteddiv"
                      ></motion.div>
                    </div>
                  </>
                )}
                <Link
                  href={item.href}
                  className="site-nav-item block rounded-full overflow-hidden"
                >
                  <motion.div
                    whileHover={{
                      backgroundColor: "#f2f2f20d",
                    }}
                    className={`px-4 py-3 rounded-full ${item.name !== "首页" && item.name !== "我的博客" ? "tracking-tight" : "tracking-widest"} font-bold text-sm`}
                  >
                    {item.name}
                  </motion.div>
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </div>

      <div className="flex items-center justify-center sm:hidden">
        <MobileMenu />
      </div>
    </>
  );
}
