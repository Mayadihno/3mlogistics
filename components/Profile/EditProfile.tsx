import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import TextInput from "@/utils/TextInput";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { useForm } from "react-hook-form";
import SubmitButton from "@/utils/submitButton";
import { useEditProfileMutation } from "@/redux/rtk/createUser";
import toast from "react-hot-toast";
import { login } from "@/redux/slice/userSlice";
const EditProfile = () => {
  const { user } = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const dispatch = useAppDispatch();

  interface ProfileProp {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
  }
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<ProfileProp>({
    defaultValues: {
      firstName: user.data?.firstName,
      lastName: user.data?.lastName,
      email: user.data?.email,
      phoneNumber: user.data?.phoneNumber,
    },
  });
  const [editProfile] = useEditProfileMutation();
  const handleUpdateProfile = async (data: ProfileProp) => {
    setLoading(true);
    if (!data.password) {
      toast.error("Password is required");
      setErrorMsg("Password is required");
      return;
    }
    try {
      const { data: res } = await editProfile({ data });
      if (res.status === 200) {
        toast.success(res?.message);
        setLoading(false);
        setErrorMsg("");
        dispatch(login(res?.data));
        setValue("password", "");
      } else {
        toast.error(res?.message);
        setErrorMsg(res?.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Internal Server error try again later");
      setErrorMsg("Internal Server error try again later");
    }
  };
  return (
    <div className="">
      <Card className="w-full mx-auto mt-10 p-3 shadow-lg border-none rounded-[10px] bg-[#27272a74]">
        {errorMsg && (
          <div className=" text-red-500 pl-6 font-semibold font-ebgaramond text-lg my-2">
            {errorMsg}
          </div>
        )}
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
                  name="email"
                  type="email"
                  register={register}
                  errors={errors}
                  isDisabled={true}
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
