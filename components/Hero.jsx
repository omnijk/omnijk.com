import Image from "next/image";
import HeroAnimation from "./HeroAnimation";
import Socials from "./Socials";

export default function Hero() {
  return (
    <div>
      <p className="mb-6 font-semibold">
        <span className="text-transparent sm:bg-gradient-to-r to-foreground bg-gradient-to-t from-muted-foreground bg-clip-text lg:text-[54px] text-[40px]">
          Hi, I&apos;m omnijk
        </span>
      </p>
      <div className="mb-8 h-10 sm:mb-10">
        <HeroAnimation text1={"<AI/>"} text2="<FrontEnd/>" />
      </div>
      <p className="mb-8 text-xl text-sky-700/90 sm:mb-10 sm:text-[26px] dark:text-white w-fit">
        #omnijk #iccy 
      </p>

      <p className="group relative mb-4 grid min-h-[4.5rem] text-sm text-transparent bg-clip-text bg-gradient-to-b sm:mb-6 sm:min-h-[5.5rem] sm:text-base to-muted-foreground from-foreground">
        <span className="col-start-1 row-start-1 block transition-opacity duration-200 group-hover:opacity-0">
          I&apos;m an undergraduate student at Shaanxi University of Science & Technology
          majoring in Data Science and Big Data Technology. Passionate about building applications
          that merge purpose with aesthetics.
        </span>
        <span className="pointer-events-none col-start-1 row-start-1 text-[15px] leading-7 opacity-0 transition-opacity duration-200 group-hover:opacity-100 sm:text-[17px] sm:leading-8">
          你好，我是 omnijk，目前就读于陕西科技大学数据科学与大数据技术专业。
          <br />
          专注于前端开发领域，致力于在代码逻辑与视觉美学之间寻找平衡，热爱开发兼具美感与实用性的应用。
          <br />
          <span className="inline-flex items-center gap-2">
            期待我们的学习交流(•ᴗ•)
            {/* <Image
              src="/emoji/hug.svg"
              alt="hug"
              className="inline-block h-5 w-5 align-text-bottom opacity-0 transition-opacity duration-200 delay-100 group-hover:opacity-100"
              width={20}
              height={20}
            /> */}
          </span>
        </span>
      </p>

      <Socials />
    </div>
  );
}
