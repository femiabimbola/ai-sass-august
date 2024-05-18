// "use client";

// import {useEffect, useState} from "react";
import {ProModal} from "@/components/pro-modal";

export const ModalProvider = () => {
  // const [isMounted, setIsMounted] = useState(false);

  // console.log(`Line 9 is ${isMounted}`);
  // useEffect(() => {
  //   setIsMounted(true);
  // }, []);
  // if (!isMounted) return null;

  console.log("Loaded component");

  return (
    <>
      <ProModal />
    </>
  );
};
