import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import TextInput from "@/utils/TextInput";
import { useForm } from "react-hook-form";
import { ICONS } from "@/utils/icons";
import SubmitButton from "@/utils/submitButton";

interface ChangePasswordProp {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ChangePasswordProp>();

  const handleChangePassword = (data: ChangePasswordProp) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(handleChangePassword)}>
      <Card className="w-full mx-auto mt-10 p-3 shadow-lg border-none rounded-[10px] bg-[#27272a74]">
        <CardContent className="font-ebgaramond">
          <div className="grid grid-cols-1 gap-6">
            <div className="flex-1 !text-base">
              <TextInput
                label="Old Password"
                register={register}
                errors={errors}
                name="oldPassword"
                type="text"
              />
            </div>
            <div className="flex-1 !text-base">
              <TextInput
                label="New Password"
                name="newPassword"
                type="text"
                register={register}
                errors={errors}
              />
            </div>
            <div className="flex-1 !text-base">
              <TextInput
                label="Confirm Password"
                name="confirmPassword"
                type="text"
                register={register}
                errors={errors}
              />
            </div>
            <div className="">
              <SubmitButton
                isLoading={loading}
                loadingTitle="Changing password. Please wait..."
                title="Change Password"
                type="submit"
                className="!bg-[#202C45] text-white !rounded-[10px] !py-2.5 !text-lg"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default ChangePassword;
