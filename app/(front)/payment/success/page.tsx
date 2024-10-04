// pages/success.tsx
import React from "react";
import { useRouter } from "next/router";
import { ICONS } from "@/utils/icons";

const SuccessPage = () => {
  const router = useRouter();

  // Get query parameters like orderId from the URL
  const { orderId } = router.query;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 md:p-12 text-center">
        <div className="flex items-center justify-center mb-6">
          <ICONS.checkCircle size={50} className="text-green-500" />
        </div>
        <h1 className="text-3xl font-semibold text-gray-800">
          Thank you for your order!
        </h1>
        <p className="mt-4 text-gray-600">
          Your order has been placed successfully. We are processing your order
          and will notify you once it's shipped.
        </p>

        {orderId && (
          <p className="mt-2 text-gray-700">
            Order ID: <span className="font-semibold">{orderId}</span>
          </p>
        )}

        <button
          className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none transition"
          onClick={() => router.push("/")}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
