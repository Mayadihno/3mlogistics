"use client";
import TextInput from "@/utils/TextInput";
import { LoaderCircle } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import emailjs from "@emailjs/browser";
export interface ContactProp {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message: string;
  subject: string;
}
const Contact = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactProp>();
  const onSubmit = (data: ContactProp) => {
    setLoading(true);
    try {
      const templateParams = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        message: data.message,
        subject: data.subject,
      };
      emailjs
        .send(
          "service_jlpkyyb",
          "template_71hr7ku",
          templateParams,
          "0RwIucuJJihXwNViI"
        )
        .then(
          (result) => {
            console.log(result.text);
            toast.success(
              "Your Message has been sent to Mayadihno. Thank You!!!"
            );
            setLoading(false);
            reset();
          },
          (error) => {
            console.log(error.text);
            toast.error(
              "Error occur when sending your message. Kindly try again later."
            );
            setLoading(false);
          }
        );
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Try again later");
      setLoading(false);
    }
  };
  return (
    <div className=" md:w-[90%] w-[95%] mx-auto mt-6 mb-10">
      <h2 className="text-4xl font-semibold text-center pb-6">Contact Us</h2>
      <div className="bg-white shadow-2xl py-4 px-6 rounded-md md:w-[70%] w-full mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="font-ebgaramond">
          <div className="flex space-x-5">
            <div className="w-full">
              <TextInput
                label="First Name"
                register={register}
                errors={errors}
                placeholder="John"
                name="firstName"
              />
            </div>
            <div className="w-full">
              <TextInput
                label="Last Name"
                register={register}
                errors={errors}
                placeholder="Doe"
                name="lastName"
              />
            </div>
          </div>
          <div className="flex space-x-5 py-5">
            <div className=" w-full">
              <TextInput
                label="Email Address"
                register={register}
                errors={errors}
                placeholder="JohnDoe@gmail.com"
                name="email"
                type="email"
                className="w-full"
              />
            </div>
            <div className=" w-full">
              <TextInput
                label="Phone Number"
                register={register}
                errors={errors}
                placeholder="0123456789"
                name="phoneNumber"
                className="w-full"
              />
            </div>
          </div>
          <div className="pb-5">
            <TextInput
              label="Subject"
              register={register}
              errors={errors}
              placeholder="Subject"
              name="subject"
              className="w-full"
            />
          </div>
          <div className="">
            <TextInput
              label="Message"
              register={register}
              errors={errors}
              placeholder="Message"
              name="message"
              className="w-full h-[200px]"
              type="textarea"
            />
          </div>
          <div className="mt-5">
            <button className="md:bg-white bg-[#202C45] w-full text-lg font-semibold text-center text-white md:text-[#202C45] hover:text-white px-5 py-3 rounded-md hover:bg-[#202C45]/100">
              {loading ? (
                <span className="flex items-center justify-center">
                  <LoaderCircle className="mr-2 animate-spin" />
                  Sending message...
                </span>
              ) : (
                " Send Message"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
