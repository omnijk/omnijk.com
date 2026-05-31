import Image from "next/image";
import friendImg from "@/public/images/friend.png";

export default function BasisInfo() {
  return (
    <div className="w-full space-y-4">
      <div className="rounded-lg border border-border/60 bg-background/80 px-4 py-6 shadow-[0_0px_1.2px_rgb(140,140,140)] backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:border-sky-200/70 hover:shadow-lg focus-within:-translate-y-1 focus-within:border-sky-200/70 focus-within:shadow-lg">
        <h2 className="mb-5 ml-1 text-lg text-sky-700 dark:text-green-200/60">
          💡 开发者名言
        </h2>
        <div className="space-y-4 px-1 text-sm leading-7 text-foreground/90">
          <p className="font-medium text-base">
            简单是稳定的前提。
          </p>
          <p className="font-medium text-base">
            Keep It Simple, Stupid.
          </p>
          
          {/* <p className="text-muted-foreground">简单是稳定的前提。</p> */}
        </div>
      </div>

      <div className="rounded-lg border border-border/60 bg-background/80 px-4 py-6 shadow-[0_0px_1.2px_rgb(140,140,140)] backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:border-sky-200/70 hover:shadow-lg focus-within:-translate-y-1 focus-within:border-sky-200/70 focus-within:shadow-lg">
        <h2 className="mb-5 ml-1 text-lg text-sky-700 dark:text-green-200/60">
          🤝 友情链接
        </h2>
        <div className="flex items-start gap-4 px-1">
          <Image
            src={friendImg}
            alt="omnifj"
            width={56}
            height={56}
            className="h-14 w-14 rounded-full border border-border/60 object-cover shadow-sm"
            unoptimized
          />
          <div className="min-w-0 space-y-1 pt-0.5 text-sm">
            <p className="font-semibold text-foreground">omnifj</p>
            <p className="leading-6 text-muted-foreground">
              在前端路上引导我的一位前辈
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
