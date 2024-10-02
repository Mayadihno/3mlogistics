import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import TextInput from "@/utils/TextInput";
import { useAppSelector } from "@/redux/hooks/hooks";
import { useForm } from "react-hook-form";
import SubmitButton from "@/utils/submitButton";
const EditProfile = () => {
  const { user } = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  interface ProfileProp {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    passwoed: string;
  }
  const {
    handleSubmit,
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

  const handleUpdateProfile = (data: ProfileProp) => {};
  return (
    <div className="">
      <Card className="w-full mx-auto mt-10 p-3 shadow-lg border-none rounded-[10px] bg-[#27272a74]">
        <CardContent className="font-ebgaramond">
          <form onSubmit={handleSubmit(handleUpdateProfile)}>
            <div className="grid grid-cols-1 gap-6">
              <div className="flex-1 !text-base">
                <TextInput
                  label="First Name"
                  register={register}
                  errors={errors}
                  name="firstName"
                  type="text"
                />
              </div>
              <div className="flex-1 !text-base">
                <TextInput
                  label="Last Name"
                  name="lastName"
                  type="text"
                  register={register}
                  errors={errors}
                />
              </div>
              <div className=" flex-1 !text-base">
                <TextInput
                  label="Email"
                  name="Email"
                  type="email"
                  value={user.data?.email}
                />
              </div>
              <div className="flex-1 !text-base">
                <TextInput
                  label="Phone Number"
                  name="phoneNumber"
                  register={register}
                  errors={errors}
                />
              </div>
              <div className="flex-1 !text-base">
                <TextInput
                  label="Password"
                  name="password"
                  register={register}
                  errors={errors}
                  type="password"
                />
              </div>
              <div className="">
                <SubmitButton
                  isLoading={loading}
                  loadingTitle="Updating profile. Please wait..."
                  title="Update Profile"
                  type="submit"
                  className="!bg-[#202C45] text-white !rounded-[10px] !py-2.5 !text-lg"
                />
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditProfile;
