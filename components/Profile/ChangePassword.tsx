import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import TextInput from "@/utils/TextInput";
import { useForm } from "react-hook-form";
import SubmitButton from "@/utils/submitButton";
import toast from "react-hot-toast";
import { useChangePasswordMutation } from "@/redux/rtk/createUser";
import { useAppSelector } from "@/redux/hooks/hooks";

interface ChangePasswordProp {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePassword = () => {
  const { user } = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const userId = user.data?._id;
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordProp>();

  const [changePassword] = useChangePasswordMutation();
  const handleChangePassword = async (data: ChangePasswordProp) => {
    setLoading(true);
    if (data.newPassword !== data.confirmPassword) {
      toast.error("Password Did not match");
      setLoading(false);
      setErrorMsg("Password Did not match");
      return;
    }
    try {
      const { confirmPassword, ...newData } = data;
      const { data: res } = await changePassword({ newData, userId });
      if (res.status === 200) {
        toast.success(res?.message);
        reset();
        setLoading(false);
      } else {
        toast.error(res?.message);
        setErrorMsg(res?.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Internal Server error try again later");
      setErrorMsg("Internal Server error try again later");
    }
  };
  return (
    <form onSubmit={handleSubmit(handleChangePassword)}>
      <Card className="w-full mx-auto mt-10 p-3 shadow-lg border-none rounded-[10px] bg-[#27272a74]">
        {errorMsg && (
          <div className=" text-red-500 pl-6 font-semibold font-ebgaramond text-lg my-2">
            {errorMsg}
          </div>
        )}
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
