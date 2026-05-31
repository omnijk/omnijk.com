"use client";

import Image from "next/image";
import Link from "next/link";
import avatarImg from "@/public/images/avatar.png";

export default function Avatar({ page }) {
  const isHomePage = page === "/";

  return (
    <div className="flex items-center justify-start col-span-1">
      <Link href="/" className="avatar-shake-group inline-block">
        <div
          className={`flex flex-col items-start justify-end transition-transform duration-700 ease-out will-change-transform ${
            isHomePage ? "translate-y-20 scale-150" : ""
          }`}
        >
          <Image
            src={avatarImg}
            width={60}
            alt="avatar"
            className="avatar-shake-target rounded-full opacity-90"
            loading={isHomePage ? "eager" : "lazy"}
            unoptimized
          />
        </div>
      </Link>
    </div>
  );
}
