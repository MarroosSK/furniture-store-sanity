"use client";

import bannerImg from "@/assets/subscribe.jpeg";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { useEffect, useState } from "react";
import { DrawOutlineButton } from "../buttons/draw-button";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const SubscribeModal = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  //hydratation fix
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return null;
  }
  return (
    <Dialog>
      <DialogTrigger>
        <DrawOutlineButton className="w-full">read more</DrawOutlineButton>
      </DialogTrigger>
      <DialogContent>
        <div className="p-0 flex max-w-[700px] items-center justify-between gap-x-3 ">
          <Image
            src={bannerImg}
            alt="banner image"
            className="hidden md:block w-1/2 h-full object-cover"
          />
          <div className="flex flex-1 flex-col gap-y-2">
            <h2 className="mb-2 font-bold text-2xl">
              GET $30* OFF YOUR FIRST ORDER!
            </h2>

            <Input placeholder="Email" className="mb-2" />
            <Button className="mb-4 border border-black text-primary p-6 bg-transparent hover:bg-transparent hover:bg-gray-200 transition-all ease-in rounded-full">
              Subscribe now
            </Button>
            <p className="font-muted-foreground text-xs">
              By signing up, you agree to receive email marketing. Consent is
              not a condition of purchase. Reply STOP to unsubscribe. HELP for
              help.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubscribeModal;
