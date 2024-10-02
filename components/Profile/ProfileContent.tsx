import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import TextInput from "@/utils/TextInput";
import { useAppSelector } from "@/redux/hooks/hooks";
const ProfileContent = () => {
  const { user } = useAppSelector((state) => state.user);
  return (
    <div className="">
      <Card className="w-1/2 mx-auto mt-10 p-3 shadow-lg border-none rounded-[10px] bg-[#27272a74]">
        <CardContent className="font-ebgaramond">
          <div className=" grid grid-cols-1 gap-6">
            <div className="flex-1 !text-base">
              <TextInput
                label="First Name"
                name="firstName"
                type="text"
                isDisabled={true}
                value={user.data?.firstName}
              />
            </div>
            <div className="flex-1 !text-base">
              <TextInput
                label="Last Name"
                name="lastName"
                type="text"
                isDisabled={true}
                value={user.data?.lastName}
              />
            </div>
            <div className=" flex-1 !text-base">
              <TextInput
                label="Email"
                name="Email"
                type="email"
                isDisabled={true}
                value={user.data?.email}
              />
            </div>
            <div className="flex-1 !text-base">
              <TextInput
                label="Phone Number"
                name="phoneNumber"
                isDisabled={true}
                value={user.data?.phoneNumber}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileContent;
