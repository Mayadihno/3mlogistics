import React from "react";
import EditProduct from "../../_components/EditProduct";

const page = ({ params }: { params: { id: string } }) => {
  return <EditProduct productId={params.id} />;
};

export default page;
