"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));

    if (!id) {
      return;
    }

    document.getElementById(id)?.scrollIntoView({ block: "start" });
  }, [pathname]);

  return null;
}
