import Image from "next/image";
import bg1 from "../public/bg1.jpg";
const HeroSkeleton = () => {
  return (
    <Image
      alt="hero-img"
      src={bg1}
      className="w-full h-[100vh] object-cover bg-primary/75"
    />
  );
};

export default HeroSkeleton;
