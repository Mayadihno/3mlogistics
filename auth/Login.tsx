"use client";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { useLoginUserMutation } from "@/redux/rtk/createUser";
import { login, setSessionToken } from "@/redux/slice/userSlice";
import { ICONS } from "@/utils/icons";
import { getItem, removeItem, setItem } from "@/utils/storage";
import SubmitButton from "@/utils/submitButton";
import TextInput from "@/utils/TextInput";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type LoginProp = {
  email: string;
  password: string;
};
const Login = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProp>();

  const router = useRouter();

  const [loginUser] = useLoginUserMutation();
  const onSubmit = async (data: LoginProp) => {
    try {
      setLoading(true);
      const { data: res } = await loginUser({ data });
      if (res.status === 200) {
        toast.success(res?.message);
        setLoading(false);
        setItem("sessionToken", res?.accessToken);
        dispatch(login(res?.data));
        const redirectToCheckout = await getItem("redirectAfterLogin");
        if (redirectToCheckout === "checkout") {
          removeItem("redirectAfterLogin");
          router.replace("/checkout");
        } else {
          router.replace("/home");
        }
      } else {
        toast.error(res?.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Internal Server error try again later");
    }
  };

  return (
    <div className=" w-[70%] mx-auto mb-10">
      <h2 className="text-4xl font-semibold text-center pb-6 pt-8">Login</h2>
      <div className="w-1/2 mx-auto my-6 shadow-2xl rounded-md">
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 px-4 py-4">
          <div className="py-4">
            <TextInput
              label="Email"
              register={register}
              errors={errors}
              placeholder="email"
              name="email"
              type="email"
            />
          </div>
          <div className="pt-2">
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
        <div className="px-4 py-2 font-medium font-urbanist text-base">
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
