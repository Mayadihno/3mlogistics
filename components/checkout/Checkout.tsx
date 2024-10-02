import ProtectedRoute from "@/utils/ProtectedRoute";
import React from "react";

const Checkout = () => {
  return (
    <ProtectedRoute>
      <div>Checkout page</div>
    </ProtectedRoute>
  );
};

export default Checkout;
