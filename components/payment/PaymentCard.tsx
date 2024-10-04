"use client";
import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { convertToSubcurrency } from "@/utils/format";
import StripePayment from "./StripePayment";
const PaymentCard = () => {
  const [stripeApiKey, setStripeApiKey] = useState<string>("");
  const [orderData, setOrderData] = useState({
    totalPrice: 0,
  });
  async function getStripeApiKey() {
    try {
      const res = await fetch("/api/stripeKey", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch the Stripe API key");
      }

      const data = await res.json();
      setStripeApiKey(data.stripeApiKey);
    } catch (error) {
      console.error("Error fetching Stripe API key:", error);
    }
  }
  useEffect(() => {
    const storedOrderData = JSON.parse(
      localStorage.getItem("orderItemsdata") || "{}"
    );
    setOrderData(storedOrderData);
  }, []);

  const amount = orderData?.totalPrice;

  useEffect(() => {
    getStripeApiKey();
  }, []);
  return (
    <div className="w-[90%] mx-auto">
      {stripeApiKey && (
        <Elements
          stripe={loadStripe(stripeApiKey)}
          options={{
            mode: "payment",
            amount: convertToSubcurrency(amount),
            currency: "dkk",
          }}
        >
          <div className="">
            <StripePayment amount={amount} />
          </div>
        </Elements>
      )}
    </div>
  );
};

export default PaymentCard;
