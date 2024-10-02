"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { setSessionToken } from "@/redux/slice/userSlice";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isLoading, isAuthenticated, sessionToken } = useAppSelector(
    (state) => state.user
  );
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("sessionToken");

    if (token) {
      dispatch(setSessionToken(token));
    } else if (!isAuthenticated && !sessionToken) {
      router.push("/login");
    }
  }, [isAuthenticated, sessionToken, router, dispatch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-[200px]">
        <LoaderCircle size={40} className=" animate-spin" />
      </div>
    );
  }

  return isAuthenticated && sessionToken ? <>{children}</> : null;
};

export default ProtectedRoute;
