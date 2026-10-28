"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function decodeHash(hash) {
  try {
    return decodeURIComponent(hash);
  } catch {
    return "";
  }
}

export default function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const id = decodeHash(window.location.hash.slice(1));

    if (!id) {
      return;
    }

    document.getElementById(id)?.scrollIntoView({ block: "start" });
  }, [pathname]);

  return null;
}
