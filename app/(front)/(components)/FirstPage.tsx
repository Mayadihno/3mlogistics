"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const FirstPage = () => {
  const router = useRouter();
  const homePage = () => {
    router.push("/home");
  };
  return (
    <div className="bg-welcomePage w-full relative">
      <div className="flex justify-center items-center md:pt-[100px] pt-[200px] font-ebgaramond">
        <div className="text-center">
          <h1 className="md:text-3xl text-xl font-bold py-5">Welcome to</h1>
          <h1 className="md:text-5xl text-2xl font-bold uppercase">
            3M Food & logistics Solution
          </h1>
          <h3 className="text-2xl font-bold pt-6">Are you over 18 years ?</h3>
          <div className="flex justify-around items-center pt-10">
            <Button className="px-8 py-3 font-bold rounded-[10px] cursor-pointer">
              No
            </Button>
            <Button
              onClick={homePage}
              className="px-8 py-3 font-bold rounded-[10px] cursor-pointer"
            >
              Yes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstPage;
