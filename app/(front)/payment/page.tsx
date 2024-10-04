import Payment from "@/components/payment/Payment";
import ProtectedRoute from "@/utils/ProtectedRoute";
import React from "react";

const page = () => {
  return (
    <ProtectedRoute>
      <Payment />
    </ProtectedRoute>
  );
};

export default page;
