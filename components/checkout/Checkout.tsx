"use client";
import ProtectedRoute from "@/utils/ProtectedRoute";
import React from "react";
import BillingInfo from "./BillingInfo";

const Checkout = () => {
  return (
    <ProtectedRoute>
      <div className=" w-[90%] mx-auto my-10">
        <BillingInfo />
      </div>
    </ProtectedRoute>
  );
};

export default Checkout;
