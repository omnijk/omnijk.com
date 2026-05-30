"use client";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const localization = {
  signUp: {
    start: {
      title: "Sign Up",
      subtitle: "Create an account",
    },
  },
  signIn: {
    start: {
      title: "Welcome Back",
      subtitle: "Sign in to zephrlin.me",
    },
  },
};

export default function ClerkProviderWrapper({ children }) {
  const isClerkDisabled =
    process.env.NEXT_PUBLIC_DISABLE_CLERK === "1" ||
    !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (isClerkDisabled) {
    return <>{children}</>;
  }

  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
      localization={localization}
    >
      {children}
    </ClerkProvider>
  );
}
