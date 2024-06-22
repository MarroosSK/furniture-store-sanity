"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { DrawOutlineButton } from "../buttons/draw-button";
import FormInputs from "../form/form-inputs";
import { useEffect, useState } from "react";

const RatingModal = ({ productId }: { productId: string }) => {
  //hydratation fix
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger>
        <DrawOutlineButton>Add review</DrawOutlineButton>
      </DialogTrigger>
      <DialogContent className="bg-transparent border-none shadow-none">
        <FormInputs productId={productId} />
      </DialogContent>
    </Dialog>
  );
};

export default RatingModal;
