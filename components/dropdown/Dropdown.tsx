"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import React, { FormEvent, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { CircleUser } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { logout } from "@/redux/slice/userSlice";

const Dropdown = () => {
  const { isAuthenticated, user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = (e: FormEvent) => {
    e.preventDefault();
    dispatch(logout());
    setIsOpen(false);
    toast.success("Logged out successfully");
    router.push("/login");
  };
  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div className="pt-2">
      {isAuthenticated && (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer md:mr-0 mr-[-20px]">
              {user ? (
                <CircleUser className="h-[30px] w-[30px]" />
              ) : (
                <AvatarFallback>MOB</AvatarFallback>
              )}
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 rounded-xl shadow-xl font-ebgaramond font-medium"
          >
            <DropdownMenuLabel className="text-xs">
              {user?.data?.firstName ?? ""} {user?.data?.lastName ?? ""}
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-200 h-[0.5px]" />
            <DropdownMenuItem className="text-center" onClick={closeDropdown}>
              <Link href={"/profile"}>Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-200 h-[0.5px]" />
            <DropdownMenuItem onClick={closeDropdown}>
              <Link href={"/orders"}>Orders</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-200 h-[0.5px]" />
            <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default Dropdown;
