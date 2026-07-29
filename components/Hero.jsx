import Image from "next/image";
import HeroAnimation from "./HeroAnimation";
import Socials from "./Socials";
import React from 'react';
import ProfileRevealCard from './ProfileRevealCard/index.tsx';

// const baseTheme = {
//   background: '#ffffff',
//   color: '#222222',
//   overlay: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
// };

// const overlayTheme = {
//   background: '#fff7ed',
//   color: '#9a3412',
//   overlay: 'linear-gradient(135deg, #0d9488 0%, #059669 100%)',
// };

// export default function App() {
//   return (
//     <ProfileRevealCard
//       baseText="I&apos;m an undergraduate student at Shaanxi University of Science & Technology
//           majoring in Data Science and Big Data Technology. Passionate about building applications
//           that merge purpose with aesthetics."
//       overlayText="你好，我是 omnijk，目前就读于陕西科技大学数据科学与大数据技术专业。
//           <br />
//           专注于前端开发领域，致力于在代码逻辑与视觉美学之间寻找平衡，热爱开发兼具美感与实用性的应用。
//           <br />"
//       duration={600}
//     />
//   );
// }

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

      {/* 注意：外层不能加 text-transparent/bg-clip-text，
          否则祖先 background-clip:text 会穿透放大镜的 mask 导致中英文重叠 */}
      <div className="relative mb-4 text-sm sm:mb-6 sm:text-base">
        <ProfileRevealCard
          baseTheme={{ background: 'transparent', color: 'hsl(var(--foreground))', overlay: 'transparent' }}
          baseText={`I'm an undergraduate student at Shaanxi University of Science & Technology
majoring in Data Science and Big Data Technology.
Passionate about building applications that merge purpose with aesthetics.`}
          overlayText={`你好，我是 omnijk，目前就读于陕西科技大学数据科学与大数据技术专业。
专注于前端开发领域，致力于在代码逻辑与视觉美学之间寻找平衡。
热爱开发兼具美感与实用性的应用。期待我们的学习交流(•ᴗ•)`}
        />
      </div>

      <Socials />
    </div>
  );
}
