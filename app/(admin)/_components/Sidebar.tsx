"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { logout } from "@/redux/slice/userSlice";
import { Home, ShoppingCart, Package } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { FormEvent } from "react";
import toast from "react-hot-toast";
import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { MdCategory } from "react-icons/md";

export const links = [
  {
    name: "Dashboard",
    link: "/admin-dashboard",
    icons: Home,
  },
  {
    name: "Orders",
    link: "/admin-orders",
    icons: ShoppingCart,
  },
  {
    name: "Product",
    link: "/admin-product",
    icons: Package,
  },
  {
    name: "Create Product",
    link: "/admin-create-product",
    icons: AiOutlineFolderAdd,
  },
  {
    name: "Create Category",
    link: "/admin-create-categories",
    icons: MdCategory,
  },
  {
    name: "Discounts Codes",
    link: "/admin-discount-code",
    icons: AiOutlineGift,
  },
];
const Sidebar = () => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleLogout = (e: FormEvent) => {
    e.preventDefault();
    dispatch(logout());
    toast.success("Logged out successfully");
    router.push("/login");
  };
  return (
    <div className="border-r bg-muted/40 font-ebgaramond h-screen">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex-1">
          <nav className="grid items-start pt-5 space-y-5 px-2 text-lg font-medium lg:px-4">
            {links.map((item, i) => {
              const Icon = item.icons;
              return (
                <Link
                  href={item.link ?? ""}
                  key={i}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2",
                    pathname === item.link
                      ? " bg-slate-100 text-lg rounded-xl"
                      : ""
                  )}
                >
                  <Icon className="h-6 w-6" />
                  <span className="md:block hidden">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="px-3 py-2">
          <Button
            variant={"secondary"}
            onClick={handleLogout}
            className="bg-black w-full text-white hover:bg-[black] py-2 px-5 rounded-[5px]"
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
