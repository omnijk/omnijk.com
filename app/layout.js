import "./global.css";
import { Roboto_Mono } from "next/font/google";
import ThemeProviderWrapper from "@/components/ThemeProviderWrapper";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MainWrapper from "@/components/MainWrapper";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "sonner";

const roboto_mono = Roboto_Mono({ subsets: ["latin"] });

export const metadata = {
  title: "omnijk | Developer",
  description:
    "Hi, I'm omnijk, an undergraduate student at Shaanxi University of Science & Technology majoring in Data Science and Big Data Technology. I am passionate about developing applications that merge aesthetics with purpose.",
  icons: {
    icon: "/images/avatar.png",
  },
};

const isVercel = process.env.VERCEL === "1";

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="scrollbar-thin scrollbar-thumb-muted-foreground scrollbar-track-muted"
    >
      <head>
        <link rel="stylesheet" href="/fonts/iconfont.css" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" href="/images/avatar.png" />
      </head>
      <body className={roboto_mono.className}>
        <ThemeProviderWrapper>
          <div className="flex flex-col items-center px-4 pt-10 mx-auto max-w-4xl lg:max-w-5xl sm:px-12 md:px-20 lg:px-12 xl:max-w-7xl min-h-svh">
            <Header />
            <MainWrapper>{children}</MainWrapper>
            <Footer />
          </div>
          {isVercel ? <Analytics /> : null}
          {isVercel ? <SpeedInsights /> : null}
          <Toaster />
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
