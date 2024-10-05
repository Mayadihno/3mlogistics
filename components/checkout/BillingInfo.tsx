"use client";
import React, { useState } from "react";
import { Card } from "../ui/card";
import TextInput from "@/utils/TextInput";
import { countriesData } from "@/utils/data";
import { formatCurrency } from "@/utils/format";
import { Button } from "../ui/button";
import { useAppSelector } from "@/redux/hooks/hooks";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { setItem } from "@/utils/storage";
import CheckoutSteps from "../checkoutStep/CheckoutStep";

export interface AddressProp {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  company?: string;
  address: string;
  city: string;
  postalCode: string;
  countries: string;
  _id: string;
}

const BillingInfo = () => {
  const { cartItems } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.user);
  const [couponCode, setCouponCode] = useState("");
  const [selected, setSelected] = useState<{
    name: string;
    price: number;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressProp>({
    mode: "onSubmit",
    defaultValues: {
      firstName: user.data?.firstName,
      lastName: user.data?.lastName,
      email: user.data?.email,
      phoneNumber: user.data?.phoneNumber,
      _id: user?.data?._id,
    },
  });

  const subtotal = cartItems.reduce((a, b) => a + b.price * b.qty, 0);
  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.id;
    const price = parseFloat(e.target.getAttribute("data-price") || "0");
    setSelected({ name, price });
  };
  const total = subtotal + (selected?.price ?? 0);

  const handlePayment = async (data: AddressProp) => {
    if (!selected) {
      toast.error("Please select a shipping method");
      return;
    }
    setItem(
      "orderItemsdata",
      JSON.stringify({
        cartitem: cartItems,
        selected: selected,
        totalPrice: total,
        usersData: data,
      })
    );
    router.push("/payment");
  };
  return (
    <>
      {/* <CheckoutSteps current={0} /> */}
      <div className="grid grid-cols-3 w-full space-x-6">
        <form
          onSubmit={handleSubmit(handlePayment)}
          className="w-full font-ebgaramond col-span-2"
          id="billingForm"
        >
          <Card className=" shadow-xl rounded-md p-4">
            <h2 className="text-xl font-semibold pb-5">Billing Info</h2>
            <div className="grid grid-cols-2 gap-x-6">
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
            </div>
            <div className="grid grid-cols-2 gap-x-6 mt-7">
              <div className="flex-1 !text-base">
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
                  type="text"
                  isDisabled={true}
                  register={register}
                  errors={errors}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-6 mt-7">
              <div className="flex-1 !text-base">
                <TextInput
                  label="Company"
                  name="company"
                  type="text"
                  isRequired={false}
                  register={register}
                  errors={errors}
                />
              </div>
              <div className="flex-1 !text-base">
                <TextInput
                  label="Country"
                  name="countries"
                  type="select"
                  placeholder="Select your country"
                  options={countriesData.map((country) => ({
                    value: country.name,
                    displayValue: country.name,
                  }))}
                  register={register}
                  errors={errors}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-x-6 my-5">
              <div className="flex-1 !text-base">
                <TextInput
                  label="City"
                  name="city"
                  type="text"
                  register={register}
                  errors={errors}
                />
              </div>
              <div className="flex-1 !text-base">
                <TextInput
                  label="Address"
                  name="address"
                  type="text"
                  register={register}
                  errors={errors}
                />
              </div>
              <div className="flex-1 !text-base">
                <TextInput
                  label="Postal Code"
                  name="postalCode"
                  type="text"
                  register={register}
                  errors={errors}
                />
              </div>
            </div>
          </Card>
        </form>
        <div className="w-full font-ebgaramond col-span-1">
          <Card className="rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mx-3 mt-2">Order Summary</h2>
            <div className=" border-y mt-2">
              {cartItems.map((item) => (
                <div
                  className="flex justify-between items-center px-3 py-1"
                  key={item.id}
                >
                  <p className="text-sm font-medium">{item.title}</p>
                  <div className="flex text-sm font-medium">
                    <p>{formatCurrency(item.price)}</p> * <p>{item.qty}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center border-b p-2">
              <h3 className="text-lg font-semibold">Subtotal Price:</h3>
              <p className="text-lg font-bold">{formatCurrency(subtotal)}</p>
            </div>
            <form className="flex space-x-3 items-center p-3 border-b">
              <div className="flex-1 !text-base">
                <input
                  type="text"
                  className={`w-full border p-1 outline-none rounded-[5px] h-[40px] pl-2`}
                  placeholder="Discount code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  required
                />
              </div>
              <Button className="text-base font-semibold">Apply</Button>
            </form>
            <div className="flex justify-between md:items-start items-center p-4">
              <h3 className="text-lg font-ebgaramond font-semibold">
                Shipping Fee
              </h3>
              <form className="font-urbanist md:text-base text-sm font-medium">
                {[
                  {
                    id: "postnode",
                    label: "Postnode Pickup (Incl. VAT): ",
                    price: "12050",
                  },
                  {
                    id: "gls",
                    label: "GLS Pickup (Incl. VAT): ",
                    price: "12550",
                  },
                  {
                    id: "bring",
                    label: "Bring Pickup (Incl. VAT): ",
                    price: "9550",
                  },
                ].map((option) => (
                  <div
                    key={option.id}
                    className="flex items-center space-x-2 py-1"
                  >
                    <input
                      type="radio"
                      name="shipping"
                      id={option.id}
                      data-price={parseFloat(option.price)}
                      onChange={handleChange}
                    />
                    <label htmlFor={option.id}>
                      {option.label} {formatCurrency(parseFloat(option.price))}
                    </label>
                  </div>
                ))}
              </form>
            </div>
            <div className="border-t p-2 flex justify-between items-center">
              <h2 className="text-lg font-bold">Total price:</h2>
              <p className="text-lg font-bold">{formatCurrency(total)}</p>
            </div>
            <div className="">
              <Button
                onClick={handleSubmit(handlePayment)}
                className="bg-[#202C45] w-full"
                type="submit"
              >
                Payment
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default BillingInfo;
