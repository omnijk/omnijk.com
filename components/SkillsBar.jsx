import CSSIcon from "@/public/icons/CSSIcon";
import ExpressIcon from "@/public/icons/ExpressIcon";
import HtmlIcon from "@/public/icons/HtmlIcon";
import JavaIcon from "@/public/icons/JavaIcon";
import JSIcon from "@/public/icons/JSIcon";
import MongoIcon from "@/public/icons/MongoIcon";
import MybatisIcon from "@/public/icons/MybatisIcon";
import MySQLIcon from "@/public/icons/MySQLIcon";
import NextIcon from "@/public/icons/NextIcon";
import NodeIcon from "@/public/icons/NodeIcon";
import PrismaIcon from "@/public/icons/PrismaIcon";
import ReactIcon from "@/public/icons/ReactIcon";
import RedisIcon from "@/public/icons/RedisIcon";
import SpringIcon from "@/public/icons/SpringIcon";
import SupabaseIcon from "@/public/icons/SupabaseIcon";
import TailwindIcon from "@/public/icons/TailwindIcon";
import ViteIcon from "@/public/icons/ViteIcon";

export default function SkillsBar() {
  return (
    <div className="flex flex-col w-full gap-6 px-6 py-4 shadow-[0_0px_1.2px_rgb(140,140,140)] rounded-lg ">
      <h2 className="mb-6 ml-2 text-lg text-sky-700 dark:text-green-200/60">
        ⚙️ Tech Stack
      </h2>
      <div className="flex flex-col items-center justify-center gap-5">
        <div className="flex justify-between w-full">
          <HtmlIcon className="skillsIcon" />
          <CSSIcon className="skillsIcon" />
          <JSIcon className="skillsIcon" />
          <ReactIcon className="skillsIcon" />
          <ViteIcon className="skillsIcon" />
          <TailwindIcon className="skillsIcon" />
          <NodeIcon className="skillsIcon" />
          {/* <NextIcon className="skillsIcon" /> */}
        </div>
        <div className="flex flex-wrap items-center justify-between w-full">
          <i className="iconfont icon-Typescript skillsIconFont text-[#3178c6]" aria-label="TypeScript" title="TypeScript" />
          <i className="iconfont icon-scss skillsIconFont text-[#cc6699]" aria-label="SCSS" title="SCSS" />
          <i className="iconfont icon-pnpm skillsIconFont text-[#f9ad00]" aria-label="PNPM" title="PNPM" />
          <i className="iconfont icon-babel skillsIconFont text-[#f9dc3e]" aria-label="Babel" title="Babel" />
          <i className="iconfont icon-git skillsIconFont text-[#f05032]" aria-label="Git" title="Git" />
          <i className="iconfont icon-es6 skillsIconFont text-[#f7df1e]" aria-label="ES6" title="ES6" />
          <i className="iconfont icon-a-npmyarnpnpm skillsIconFont text-[#cb3837]" aria-label="npm" title="npm" />
        </div>
      </div>
    </div>
  );
}
