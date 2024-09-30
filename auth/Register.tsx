"use client";
import { ICONS } from "@/utils/icons";
import SubmitButton from "@/utils/submitButton";
import TextInput from "@/utils/TextInput";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

type RegisterProp = {
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  address: string;
  firstName: string;
  lastName: string;
};

const Register = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterProp>();

  const onSubmit = () => {};
  return (
    <div className="w-[70%] mx-auto mb-10">
      <h2 className="text-4xl font-semibold text-center pt-8">
        Create Account
      </h2>
      <div className=" w-1/2 mx-auto my-6 p-4 shadow-lg rounded-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center space-x-4">
            <div className="my-3 w-full">
              <TextInput
                label="First Name"
                register={register}
                errors={errors}
                placeholder="John"
                name="fullName"
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
          <div className="flex space-x-4 items-center my-5">
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
          <div className="flex items-center space-x-4">
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
          <div className="py-3">
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
        <div className=" pt-2 font-medium font-urbanist text-base">
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
