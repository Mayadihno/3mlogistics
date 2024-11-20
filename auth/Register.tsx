"use client";

import { useCreateUserMutation } from "@/redux/rtk/createUser";
import { ICONS } from "@/utils/icons";
import SubmitButton from "@/utils/submitButton";
import TextInput from "@/utils/TextInput";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type RegisterProp = {
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
};

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [generalErrorMesg, setGeneralErrorMesg] = useState("");
  const router = useRouter();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterProp>();
  const [createUser] = useCreateUserMutation();
  const onSubmit = async (data: RegisterProp) => {
    try {
      if (data.confirmPassword !== data.password) {
        toast.error("Password did not match");
        setErrorMsg("Password and Confirm Password did not match");
        return;
      }
      setLoading(true);
      const { ...userData } = data;
      const { data: res } = await createUser({ userData });
      if (res.status === 201) {
        setLoading(false);
        toast.success(res?.message);
        router.push("/login");
        reset();
      } else {
        toast.error(res?.message);
        setGeneralErrorMesg(res?.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setGeneralErrorMesg("Internal Server error try again later");
    }
  };
  return (
    <div className="w-[70%] mx-auto mb-10">
      <h2 className="text-4xl font-semibold text-center pb-6 pt-8">
        Create Account
      </h2>
      <div className="w-1/2 mx-auto my-6 p-4 shadow-lg rounded-md">
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 px-4 py-4">
          {generalErrorMesg && (
            <h2
              style={{ color: "#ef4444" }}
              className="text-base pb-4 font-semibold text-red-500"
            >
              {generalErrorMesg}
            </h2>
          )}
          <div className="flex items-center space-x-6">
            <div className="my-3 w-full">
              <TextInput
                label="First Name"
                register={register}
                errors={errors}
                placeholder="John"
                name="firstName"
              />
            </div>
            <div className="my-3 w-full">
              <TextInput
                label="Last Name"
                register={register}
                errors={errors}
                placeholder="Doe"
                name="lastName"
              />
            </div>
          </div>
          <div className="flex space-x-6 items-center my-5">
            <div className="my-3 w-full">
              <TextInput
                label="Email"
                register={register}
                errors={errors}
                placeholder="email"
                name="email"
                type="email"
              />
            </div>
            <div className="my-3 w-full">
              <TextInput
                label="Phone Number"
                register={register}
                errors={errors}
                placeholder="1234567890"
                name="phoneNumber"
              />
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="w-full">
              <TextInput
                label="Password"
                placeholder="password"
                type="password"
                name="password"
                register={register}
                errors={errors}
                suffixIcon={<ICONS.eye />}
              />
            </div>
            <div className="w-full">
              <TextInput
                label="Confirm Password"
                placeholder="Confirm password"
                type="password"
                name="confirmPassword"
                register={register}
                errors={errors}
                suffixIcon={<ICONS.eye />}
              />
            </div>
          </div>
          {errorMsg && (
            <span style={{ color: "#ef4444" }} className="text-sm text-red-500">
              {errorMsg}
            </span>
          )}
          <div className="pt-3">
            <div className="flex justify-end py-3 text-gray-400 font-medium font-urbanist text-base">
              <Link href={"/forget-password"}>Forget password?</Link>
            </div>
            <SubmitButton
              isLoading={loading}
              loadingTitle="Please wait"
              title="Create Account"
              type="submit"
              className="py-3 rounded-md"
            />
          </div>
        </form>
        <div className="px-4 py-2 font-medium font-urbanist text-base">
          <h4>
            Already have an account?
            <Link href={"/login"} className="text-[#B10C62] ml-1">
              Login
            </Link>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Register;
