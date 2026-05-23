import MotionDivWrapper from "@/components/MotionDivWrapper";
import TechStackRadar from "@/components/TechStackRadar";

export default function TechStackPage() {
  return (
    <MotionDivWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="w-full"
    >
      <TechStackRadar />
    </MotionDivWrapper>
  );
}