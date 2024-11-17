import React from "react";
import AdminOrderDetails from "../../_components/AdminOrderDetails";

const page = ({ params }: { params: { id: string } }) => {
  return <AdminOrderDetails orderId={params.id} />;
};

export default page;
