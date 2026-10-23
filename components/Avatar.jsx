import Image from "next/image";
import Link from "next/link";
import avatarImg from "@/public/images/avatar.png";

export default function Avatar() {
  return (
    <Link
      href="/"
      aria-label="Omnijk 首页"
      className="avatar-shake-group flex shrink-0 items-center gap-2.5 py-1 pl-1 pr-2.5"
    >
      <span className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted ring-1 ring-black/[0.06] dark:ring-white/[0.12]">
        <Image
          src={avatarImg}
          alt="Omnijk"
          width={36}
          height={36}
          priority
          unoptimized
          className="avatar-shake-target h-full w-full object-cover"
        />
      </span>
      <span className="text-base font-semibold tracking-[-0.015em] text-foreground">
        Omnijk
      </span>
    </Link>
  );
}
