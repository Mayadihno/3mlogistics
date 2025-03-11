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
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();
  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    router.push("/login");
  };

  if (pathname === "/" || pathname.includes("admin")) {
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

          {/* Mobile Menu Icon */}
          <div className="md:hidden cursor-pointer flex space-x-4 justify-between">
            <div
              className="cursor-pointer relative"
              onClick={() => setOpen(!open)}
            >
              <ICONS.cart size={30} />
              <span className="absolute font-ebgaramond -top-3 -right-3 bg-[#4976d6] w-[20px] h-[20px] text-white rounded-full flex items-center justify-center">
                {cartItems?.length}
              </span>
            </div>
            <div className="flex justify-between px-4 py-2">
              {isAuthenticated && <Dropdown setMenuOpen={setMenuOpen} />}
            </div>
            <div onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <ICONS.close size={30} /> : <ICONS.menu size={30} />}
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex flex-1 mx-10">
            <input
              type="text"
              placeholder="Search"
              className="w-full p-2 border outline-none border-gray-400 rounded-md"
            />
          </div>

          <div className="hidden md:flex space-x-6 items-center">
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
            {user?.data?.role === "admin" && (
              <Link
                href={"/admin-dashboard"}
                className={`${
                  pathname === "/admin-dashboard"
                    ? "bg-[#202c45c4] text-[#f7f7f7] px-4 py-2 rounded-lg"
                    : "text-[#202C45] hover:text-[#4976d6]"
                }`}
              >
                Dashboard
              </Link>
            )}
            <div className="flex items-center space-x-6">
              <div className="cursor-pointer" onClick={() => setOpen(!open)}>
                <div className="relative cursor-pointer">
                  <ICONS.cart size={30} />
                  <span className="absolute font-ebgaramond -top-3 -right-3 bg-[#4976d6] w-[20px] h-[20px] text-white rounded-full flex items-center justify-center">
                    {cartItems?.length}
                  </span>
                </div>
              </div>
              {isAuthenticated ? (
                <Dropdown setMenuOpen={setMenuOpen} />
              ) : (
                <Button
                  onClick={handleLogin}
                  className="font-semibold bg-[#202C45] tracking-widest text-white"
                >
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden flex flex-col space-y-3 mt-3">
            {navbarData.map((item) => (
              <Link
                key={item.id}
                href={item.link}
                className="text-[#202C45] hover:text-[#4976d6] px-4 py-2 border-b"
                onClick={() => setMenuOpen(false)}
              >
                {item.text}
              </Link>
            ))}
            {user?.data?.role === "admin" && (
              <Link
                href={"/admin-dashboard"}
                className="text-[#202C45] hover:text-[#4976d6] px-4 py-2 border-b"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}
            <div className="flex justify-between px-4 py-2">
              {!isAuthenticated && (
                <Button
                  onClick={handleLogin}
                  className="font-semibold bg-[#202C45] tracking-widest text-white"
                >
                  Login
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
      {open && <Cart open={open} setOpen={setOpen} />}
    </>
  );
};

export default Navbar;
