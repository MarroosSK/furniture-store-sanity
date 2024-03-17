"use client";

import SearchModal from "@/components/search-modal";
import SubscribeModal from "@/components/subscribe-modal";
import { useEffect, useState } from "react";

export const ModalProviders = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <SubscribeModal />
      <SearchModal />
    </>
  );
};
//unused for now
