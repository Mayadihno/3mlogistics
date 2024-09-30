import { LoaderCircle } from "lucide-react";
import React from "react";

const Spinner = () => {
  return (
    <div className="fixed inset-0 bg-[#0006] z-50 flex justify-center items-center">
      <div className="flex flex-col items-center justify-center">
        <LoaderCircle size={80} color="white" className="animate-spin" />
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
