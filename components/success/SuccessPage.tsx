"use client";
import { ICONS } from "@/utils/icons";
import { useRouter, useSearchParams } from "next/navigation";

const SuccessPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <div className="flex flex-col items-center justify-center py-20 bg-gray-100">
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
            Order ID:{" "}
            <span className="font-semibold font-ebgaramond">{orderId}</span>
          </p>
        )}

        <button
          className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none transition"
          onClick={() => router.push("/home")}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
