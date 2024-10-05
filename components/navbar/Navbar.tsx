"use client";
import { navbarData } from "@/utils/data";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import { ICONS } from "@/utils/icons";
import { useAppSelector } from "@/redux/hooks/hooks";
import Cart from "../cart/Cart";
import Dropdown from "../dropdown/Dropdown";

const Navbar = () => {
  const { cartItems } = useAppSelector((state) => state.cart);
  const { isAuthenticated, user } = useAppSelector((state) => state.user);
  const [open, setOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();
  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    router.push("/login");
  };

  if (pathname === "/") {
    return null;
  }

  return (
    <>
      <div className="bg-white px-3 pt-2 pb-3 sticky top-0 z-50 border-b-2 shadow-md">
        <div className="flex justify-between items-center">
          <Link href={"/"}>
            <span className="text-6xl font-bold cursor-pointer hover:text-[#4976d6] font-ebgaramond text-[#202C45]">
              3M
            </span>
            <small className="text-sm text-[#202C45]">Logistics Solution</small>
          </Link>

          <div className="flex-1 w-full mx-10">
            <input
              type="text"
              placeholder="Search"
              className="w-full p-2 border outline-none border-gray-400 rounded-md"
            />
          </div>

          <div className="flex space-x-6 items-center">
            {navbarData.map((item) => (
              <div
                className="font-prociono font-semibold text-xl"
                key={item.id}
              >
                <Link
                  className={`${
                    pathname === item.link
                      ? "bg-[#202c45c4] text-[#f7f7f7] px-4 py-2 rounded-lg"
                      : "text-[#202C45] hover:text-[#4976d6]"
                  }`}
                  href={item.link}
                >
                  {item.text}
                </Link>
              </div>
            ))}
            <div className="">
              {user?.data?.role === "admin" && (
                <div className="text-[#202C45] hover:text-[#4976d6] font-prociono font-semibold text-xl">
                  Dashboard
                </div>
              )}
            </div>
            <div className="flex items-center space-x-6">
              <div className="cursor-pointer" onClick={() => setOpen(!open)}>
                <div className="relative cursor-pointer">
                  <ICONS.cart size={30} />
                  <span className=" absolute font-ebgaramond -top-3 -right-3 bg-[#4976d6] w-[20px] h-[20px] text-white rounded-full flex items-center justify-center">
                    {cartItems?.length}
                  </span>
                </div>
              </div>
              {isAuthenticated ? (
                <>
                  <Dropdown />
                </>
              ) : (
                <Button
                  onClick={handleLogin}
                  className=" font-semibold bg-[#202C45] tracking-widest text-white"
                >
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      {open && <Cart open={open} setOpen={setOpen} />}
    </>
  );
};

export default Navbar;
