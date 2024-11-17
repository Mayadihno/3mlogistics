import OrderDetails from "@/components/order/OrderDetails";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  return <OrderDetails orderId={params.id} />;
};

export default page;
