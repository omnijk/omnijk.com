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

      <p className="mb-4 text-sm text-transparent bg-clip-text bg-gradient-to-b sm:mb-6 sm:text-base to-muted-foreground from-foreground">
        I&apos;m an undergraduate student at Shaanxi University of Science & Technology
        majoring in Data Science and Big Data Technology. Passionate about building applications
        that merge purpose with aesthetics.
      </p>

      <Socials />
    </div>
  );
}
