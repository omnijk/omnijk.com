import { Github, Linkedin, Mail } from "lucide-react";
import SocialMediaLink from "./SocialMediaLink";

function Socials() {
  return (
    <div className="flex gap-6 ">
      {/* <SocialMediaLink link="https://www.linkedin.com/in/zhihao-lin1/">
        <Linkedin />
      </SocialMediaLink> */}
      <SocialMediaLink link="https://github.com/omnijk">
        <Github />
      </SocialMediaLink>
      <SocialMediaLink link="mailto:roseyy1008@163.com">
        <Mail />
      </SocialMediaLink>
    </div>
  );
}

export default Socials;
