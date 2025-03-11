import ProtectedRoute from "@/utils/ProtectedRoute";
import { ReactNode } from "react";
import Sidebar from "./_components/Sidebar";
import AdminNavbar from "./_components/AdminNavbar";

const Layout = async ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full">
      <ProtectedRoute>
        <div className="md:block hidden sticky left-0 top-0 h-screen w-[70px] md:w-[300px]">
          <Sidebar />
        </div>
        <div className="flex flex-col flex-1">
          <div className="sticky top-0 z-50">
            <AdminNavbar />
          </div>
          <div
            className="xl:max-w-screen-xl 2xl:max-w-screen-2xl sm:max-w-screen-sm
           md:max-w-screen-md lg:max-w-screen-lg md:mx-auto mx-2 max-w-[410px] h-full w-full md:overflow-y-auto"
          >
            {children}
          </div>
        </div>
      </ProtectedRoute>
    </div>
  );
};

export default Layout;
