"use client";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { logout } from "@/redux/slice/userSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent } from "react";
import toast from "react-hot-toast";

const AdminNavbar = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleLogout = (e: FormEvent) => {
    e.preventDefault();
    dispatch(logout());
    toast.success("Logged out successfully");
    router.push("/login");
  };
  return (
    <header className=" h-14 font-ebgaramond items-center gap-4 border-b bg-slate-50 px-4 lg:h-[60px] lg:px-6">
      <div className="flex justify-between items-center">
        <Link href={"/"}>
          <span className="text-6xl font-bold cursor-pointer hover:text-[#4976d6] font-ebgaramond text-[#202C45]">
            3M
          </span>
          <small className="text-sm text-[#202C45]">Logistics Solution</small>
        </Link>
        <div className="flex space-x-5 items-center">
          <Button
            variant={"secondary"}
            onClick={() => router.push("/home")}
            className="bg-black text-white hover:bg-[black] py-2 px-5 rounded-[5px]"
          >
            Back
          </Button>
          <Button
            variant={"secondary"}
            onClick={handleLogout}
            className="bg-black text-white hover:bg-[black] py-2 px-5 rounded-[5px]"
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
