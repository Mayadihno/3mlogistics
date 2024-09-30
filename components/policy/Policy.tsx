import { policyData } from "@/utils/data";
import React from "react";

const Policy = () => {
  return (
    <div className="my-10 w-[85%] mx-auto font-urbanist">
      <div className="flex justify-between  items-center">
        {policyData.map((item) => (
          <div
            className="flex items-center space-x-5 border rounded-md shadow-sm px-5 py-3"
            key={item.id}
          >
            <item.icon size={45} color="black" />
            <div className="flex flex-col">
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="text-base font-medium">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
      <h3 className=" text-3xl tracking-wider font-ebgaramond font-semibold text-center py-8">
        All Goods in this Store are all in wholesales Price plus Tax
      </h3>
    </div>
  );
};

export default Policy;
