"use client";
import { headerData } from "@/utils/data";
import { usePathname } from "next/navigation";
import React from "react";

const FirstHeader = () => {
  const pathname = usePathname();
  if (pathname === "/" || pathname.includes("admin")) {
    return null;
  }
  return (
    <div className="bg-[#202C45] py-4 px-5 font-ebgaramond">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-semibold text-white">
          Welcome to high quality African Foods and Drinks store!
        </h3>
        <div className="flex space-x-8 items-center">
          {headerData.map((item) => (
            <div className="flex space-x-2" key={item.id}>
              <div className=" bg-white p-3 rounded-full">
                <item.icon size={25} color="black" />
              </div>
              <div className=" text-white">
                <h4 className=" text-base tracking-widest">{item.title}</h4>
                <h5 className="text-sm tracking-wider">{item.text}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FirstHeader;
