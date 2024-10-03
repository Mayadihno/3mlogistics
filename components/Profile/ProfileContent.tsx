import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import TextInput from "@/utils/TextInput";
import { useAppSelector } from "@/redux/hooks/hooks";
import { useForm } from "react-hook-form";

interface ProfileProp {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
}
const ProfileContent = () => {
  const { user } = useAppSelector((state) => state.user);

  const {
    register,
    formState: { errors },
  } = useForm<ProfileProp>({
    defaultValues: {
      firstName: user.data?.firstName,
      lastName: user.data?.lastName,
      email: user.data?.email,
      phoneNumber: user.data?.phoneNumber,
    },
  });
  return (
    <div className="">
      <Card className="w-full mx-auto mt-10 p-3 shadow-lg border-none rounded-[10px] bg-[#27272a74]">
        <CardContent className="font-ebgaramond">
          <div className=" grid grid-cols-1 gap-6">
            <div className="flex-1 !text-base">
              <TextInput
                label="First Name"
                name="firstName"
                type="text"
                isDisabled={true}
                register={register}
                errors={errors}
              />
            </div>
            <div className="flex-1 !text-base">
              <TextInput
                label="Last Name"
                name="lastName"
                type="text"
                isDisabled={true}
                register={register}
                errors={errors}
              />
            </div>
            <div className=" flex-1 !text-base">
              <TextInput
                label="Email"
                name="email"
                type="email"
                isDisabled={true}
                register={register}
                errors={errors}
              />
            </div>
            <div className="flex-1 !text-base">
              <TextInput
                label="Phone Number"
                name="phoneNumber"
                isDisabled={true}
                register={register}
                errors={errors}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileContent;
