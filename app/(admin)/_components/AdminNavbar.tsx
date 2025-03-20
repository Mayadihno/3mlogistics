"use client";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { logout } from "@/redux/slice/userSlice";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { links } from "./Sidebar";
import { cn } from "@/lib/utils";
import { FiMenu, FiX } from "react-icons/fi";

const AdminNavbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = (e: FormEvent) => {
    e.preventDefault();
    dispatch(logout());
    toast.success("Logged out successfully");
    router.push("/login");
  };

  return (
    <>
      <header className="h-28 w-full sticky top-0 z-50 border-b bg-slate-50 px-4 lg:h-[60px] lg:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden text-3xl text-black"
            >
              <FiMenu />
            </button>

            <Link href={"/admin-dashboard"}>
              <span className="text-2xl font-bold text-[#202C45] hover:text-[#4976d6] cursor-pointer font-ebgaramond">
                3M Food
              </span>
              <small className="block text-sm text-[#202C45]">
                Logistics Solution
              </small>
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 md:space-x-5">
            <Button
              variant="secondary"
              onClick={() => router.push("/home")}
              className="rounded-[5px] bg-black px-3 py-2 text-white hover:bg-black md:px-5"
            >
              Back
            </Button>
            <Button
              variant="secondary"
              onClick={handleLogout}
              className="rounded-[5px] bg-black px-3 py-2 text-white hover:bg-black md:px-5"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden z-50`}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <span className="text-lg font-bold text-[#202C45]">Menu</span>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-2xl text-black"
          >
            <FiX />
          </button>
        </div>
        <nav className="flex flex-col space-y-3 p-4">
          {links.map((item, i) => (
            <Link
              href={item.link ?? ""}
              key={i}
              className={cn(
                "block rounded-lg px-3 py-2 text-black transition-all",
                pathname === item.link
                  ? "bg-[#4976d6] text-white text-sm rounded-xl"
                  : ""
              )}
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
};

export default AdminNavbar;
