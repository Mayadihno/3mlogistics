import { Loader } from "lucide-react";
import React from "react";

type SubmitButtonProp = {
  title: string;
  type: "submit" | "reset" | "button" | undefined;
  isLoading: boolean;
  loadingTitle: string;
  className?: string;
};
const SubmitButton = ({
  title,
  type = "submit",
  isLoading = false,
  loadingTitle,
  className,
}: SubmitButtonProp) => {
  return (
    <div>
      {isLoading ? (
        <button
          type={type}
          disabled
          className={`${className} flex w-full justify-center font-ebgaramond !rounded-2xl bg-[#202C45] 
          px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm
           hover:bg-[#202C45] focus-visible:outline focus-visible:outline-2
            focus-visible:outline-offset-2 focus-visible:outline-[#202C45] items-center`}
        >
          <Loader className=" w-4 h-4 mr-2 flex-shrink-0 animate-spin" />
          {loadingTitle}
        </button>
      ) : (
        <button
          type={type}
          className={`${className} flex w-full justify-center font-ebgaramond !rounded-2xl bg-[#202C45] 
          px-3 py-2 text-sm md:text-xl font-semibold leading-6 text-white shadow-sm
           hover:bg-[#202c4591] focus-visible:outline focus-visible:outline-2
            focus-visible:outline-offset-2 focus-visible:outline-[#202C45] items-center`}
        >
          {title}
        </button>
      )}
    </div>
  );
};

export default SubmitButton;
