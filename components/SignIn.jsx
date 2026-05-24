"use client";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { UserPlus } from "lucide-react";
import { useEffect, useState } from "react";

export default function SignInAndOut({ pathname }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="flex items-center justify-end h-14 w-10" />;
  }

  return (
    <div className="flex items-center justify-end h-14">
      <SignedOut>
        <SignInButton
          mode="modal"
          forceRedirectUrl={pathname}
          signUpForceRedirectUrl={pathname}
        >
          <Button variant="ghost" size="icon" className="rounded-xl">
            <UserPlus />
          </Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}
