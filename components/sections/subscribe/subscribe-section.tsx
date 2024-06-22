import joinUsImg from "@/assets/joinUs.png";
import SubscribeModal from "@/components/modals/subscribe-modal";
import Image from "next/image";

const SubscribeSection = () => {
  return (
    <div className="w-full h-full bg-primary/45">
      <div className="container py-5 flex flex-col justify-center items-center gap-6 lg:flex-row">
        <Image
          src={joinUsImg}
          alt="join_us-image"
          className="object-cover w-[350px] md:w-[400px] lg:w-[500px] md:inline-block"
        />
        <div className="flex-1  flex flex-col items-center gap-y-6 justify-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white">Join Us</h1>

          <SubscribeModal />
        </div>
      </div>
    </div>
  );
};

export default SubscribeSection;
