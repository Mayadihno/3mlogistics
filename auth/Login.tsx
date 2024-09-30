"use client";
import { ICONS } from "@/utils/icons";
import SubmitButton from "@/utils/submitButton";
import TextInput from "@/utils/TextInput";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

type LoginProp = {
  email: string;
  password: string;
};
const Login = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProp>();

  const onSubmit = () => {};

  return (
    <div className=" w-[70%] mx-auto mb-10">
      <h2 className="text-4xl font-semibold text-center pt-8">Login</h2>
      <div className=" w-1/2 mx-auto my-6 p-4 shadow-lg rounded-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="my-3">
            <TextInput
              label="Email"
              register={register}
              errors={errors}
              placeholder="email"
              name="email"
              type="email"
            />
          </div>
          <div className="py-3">
            <TextInput
              label="Password"
              placeholder="password"
              type="password"
              name="password"
              register={register}
              errors={errors}
              suffixIcon={<ICONS.eye />}
            />
            <div className="flex justify-end py-3 text-gray-400 font-medium font-urbanist text-base">
              <Link href={"/forget-password"}>Forget password?</Link>
            </div>
            <SubmitButton
              isLoading={loading}
              loadingTitle="Please wait"
              title="Login"
              type="submit"
              className="py-3 rounded-md"
            />
          </div>
        </form>
        <div className=" pt-2 font-medium font-urbanist text-base">
          <h4>
            Don't have an account?
            <Link href={"/register"} className="text-[#B10C62] ml-1">
              Signup
            </Link>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Login;
