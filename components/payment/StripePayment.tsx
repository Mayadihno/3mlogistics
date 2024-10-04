import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import {
  StripePaymentElementOptions,
  PaymentIntentResult,
} from "@stripe/stripe-js";
import { useAppSelector } from "@/redux/hooks/hooks";
import { CartItem } from "@/redux/slice/cartSlice";
import { AddressProp } from "../checkout/BillingInfo";
import { useRouter } from "next/navigation";
import { convertToSubcurrency, formatCurrency } from "@/utils/format";
import toast from "react-hot-toast";
const StripePayment = ({ amount }: { amount: number }) => {
  const { cartItems } = useAppSelector((state) => state.cart);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentIntent, setPaymentIntent] =
    useState<PaymentIntentResult | null>(null);
  const stripe = useStripe();
  const elements = useElements();

  const [orderData, setOrderData] = useState<{
    usersData: AddressProp;
    cartItems: CartItem[];
    totalPrice: number;
    selected: { name: string; price: number };
  } | null>(null);

  useEffect(() => {
    const storedOrderData = JSON.parse(
      localStorage.getItem("orderItemsdata") || "{}"
    );
    setOrderData(storedOrderData);
  }, []);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch((error) => console.error("Error creating payment intent:", error));
  }, [amount]);
  useEffect(() => {
    if (stripe) {
      stripe.retrievePaymentIntent(clientSecret).then((result) => {
        setPaymentIntent(result);
        if (result && result.paymentIntent?.status === "succeeded") {
          toast.success("Payment succeeded!");
        } else {
          toast.error("Your payment was not successful, please try again.");
        }
      });
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setErrorMessage(submitError.message);
        setLoading(false);
        return;
      }
      const res = await stripe
        .retrievePaymentIntent(clientSecret)
        .then((result) => {
          setPaymentIntent(result);
          if (result && result.paymentIntent?.status === "succeeded") {
            toast.success("Payment succeeded!");
          } else {
            toast.error("Your payment was not successful, please try again.");
          }
        });
      console.log(res);
      console.log(paymentIntent);
    } catch (error) {
      setErrorMessage("An error occurred during payment processing.");
      console.error("Payment processing error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center mt-10">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }
  const paymentElementOptions: StripePaymentElementOptions = {
    layout: "tabs",
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
        {clientSecret && <PaymentElement options={paymentElementOptions} />}

        {errorMessage && <div>{errorMessage}</div>}

        <button
          disabled={!stripe || loading}
          className="text-white w-full p-3 bg-[#202C45] mt-3 rounded-md font-ebgaramond font-bold disabled:opacity-50 disabled:animate-pulse"
        >
          {!loading ? `Pay ` + formatCurrency(amount) : "Processing..."}
        </button>
      </form>
    </div>
  );
};

export default StripePayment;
