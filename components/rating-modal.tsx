"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { DrawOutlineButton } from "./buttons/draw-button";
import FormInputs from "./form-inputs";

const RatingModal = ({ productId }: { productId: string }) => {
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
