"use client";
import { navbarData } from "@/utils/data";
import { ICONS } from "@/utils/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Footer = () => {
  const pathname = usePathname();
  if (pathname === "/") {
    return null;
  }
  return (
    <div className=" w-full h-fit bg-[#202C45]">
      <div className="grid grid-cols-1 md:grid-cols-3 w-[90%] mx-auto font-ebgaramond py-10 gap-x-16 md:gap-y-0 gap-y-8">
        <div className="flex flex-col">
          <div className="">
            <Link href={"/"}>
              <span className="text-6xl font-bold cursor-pointer hover:text-[#4976d6] font-ebgaramond text-[#fff]">
                3M
              </span>
              <small className="text-sm text-[#fff]">Logistics Solution</small>
            </Link>
          </div>
          <div className="flex items-center space-x-8 pt-8">
            <ICONS.facebook
              size={30}
              color="white"
              className=" cursor-pointer"
            />
            <ICONS.twitter
              size={30}
              color="white"
              className=" cursor-pointer"
            />
            <ICONS.google size={30} color="white" className=" cursor-pointer" />
            <ICONS.instagram
              size={30}
              color="white"
              className=" cursor-pointer"
            />
          </div>
          <div className="flex space-x-1 pt-10">
            <ICONS.location size={50} color="white" />
            <h3 className=" text-white text-base font-medium">
              Hyden Alle 48.1.th 2770, <br /> kastrup, <br /> Denmark.
            </h3>
          </div>
        </div>
        <div className="">
          <h3 className="text-2xl text-white pb-4">
            3M Logistics Solution Features
          </h3>
          <div className="flex flex-col space-y-5 pl-2">
            {navbarData.map((item) => (
              <div className="" key={item.id}>
                <Link
                  href={item.link}
                  className="text-white text-lg font-medium hover:text-[#4976d6] cursor-pointer"
                >
                  {item.text}
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="">
          <h3 className="text-2xl text-white pb-4">
            Company Contact Information
          </h3>
          <div className="flex flex-col text-white text-lg space-y-6 pl-2">
            <p>Phone: +4542226658</p>
            <p>WhatsApp: +4542226658</p>
            <p>Email: mlogisticssolution@gmail.com</p>
          </div>
        </div>
      </div>
      <div className=" text-center text-white font-semibold font-ebgaramond pb-3 text-xl">
        <h4>
          For further enquiries, questions, and feedback, kindly fill our form
          by clicking here Contact Formand we shall get back to you.
        </h4>
      </div>
      <div className=" bg-white text-center w-full py-2">
        <h3 className="flex items-center justify-center space-x-3">
          Maintained and Developed by Mayadihno@gmail.com ||
          <ICONS.whatsapp size={20} color="black" />
        </h3>
      </div>
    </div>
  );
};

export default Footer;
