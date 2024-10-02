"use client";
import ProtectedRoute from "@/utils/ProtectedRoute";
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import EditProfile from "./EditProfile";
import ProfileContent from "./ProfileContent";
import ChangePassword from "./ChangePassword";

const Profile = () => {
  const [active, setActive] = useState("profile");
  return (
    <ProtectedRoute>
      <div>
        <div className="flex justify-between">
          <div className="md:my-10 my-4 md:w-1/2 w-full mx-auto md:px-10 px-2">
            <Tabs value={active} onValueChange={setActive} className="w-full">
              <TabsList className="grid w-full grid-cols-3 py-3 px-6 font-prociono rounded-[5px] bg-[#27272a74]">
                <TabsTrigger
                  value="profile"
                  className="text-black text-base font-bold px-4 py-2 cursor-pointer data-[state=active]:rounded-[10px] 
                     data-[state=active]:bg-[#202C45] data-[state=active]:text-white"
                >
                  Profile
                </TabsTrigger>
                <TabsTrigger
                  value="edit-profile"
                  className="text-black text-base font-bold px-4 py-2 cursor-pointer data-[state=active]:rounded-[10px] 
                     data-[state=active]:bg-[#202C45] data-[state=active]:text-white"
                >
                  Edit Profile
                </TabsTrigger>
                <TabsTrigger
                  value="change-password"
                  className="text-black text-base font-bold px-4 py-2 cursor-pointer data-[state=active]:rounded-[10px] 
                     data-[state=active]:bg-[#202C45] data-[state=active]:text-white"
                >
                  Change Password
                </TabsTrigger>
              </TabsList>
              <TabsContent value="profile">
                <ProfileContent />
              </TabsContent>
              <TabsContent value="edit-profile">
                <EditProfile />
                {/* setActive={setActive} */}
              </TabsContent>
              <TabsContent value="change-password">
                <ChangePassword />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Profile;
