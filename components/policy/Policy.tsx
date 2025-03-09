import { policyData } from "@/utils/data";
import React from "react";

const Policy = () => {
  return (
    <div className="my-10 md:w-[85%] w-[95%] mx-auto font-urbanist">
      <div className="flex md:flex-row flex-col justify-between md:items-center md:space-y-0 space-y-4">
        {policyData.map((item) => (
          <div
            className="flex items-center md:space-x-5 space-x-0 border rounded-md shadow-sm px-5 py-3"
            key={item.id}
          >
            <item.icon size={45} color="black" />
            <div className="flex flex-col pl-3 md:pl-0">
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="text-base font-medium">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
      <h3 className="md:text-3xl text-lg tracking-wider font-ebgaramond font-semibold text-center py-4 md:py-8">
        All Goods in this Store are all in wholesales Price plus Tax
      </h3>
    </div>
  );
};

export default Policy;
