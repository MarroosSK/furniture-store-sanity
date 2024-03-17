import joinUsImg from "@/assets/joinUs.png";
import Image from "next/image";
import Container from "../container";
import SubscribeModal from "../subscribe-modal";

const SubscribeNow = () => {
  return (
    <div className="w-full h-full bg-slate-200">
      <Container className="py-5 flex flex-col justify-center items-center gap-6 lg:flex-row">
        <Image
          src={joinUsImg}
          alt="join_us-image"
          className="object-cover w-[350px] md:w-[400px] lg:w-[500px] md:inline-block"
        />
        <div className="flex-1  flex flex-col items-center gap-y-6 justify-center">
          <h1 className="text-3xl md:text-5xl font-semibold text-primary">
            Join Us
          </h1>
          <p className="text-muted-foreground">
            Sign up for special offers and updates...
          </p>
          <SubscribeModal />
        </div>
      </Container>
    </div>
  );
};

export default SubscribeNow;
