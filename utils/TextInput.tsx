"use client";
import { ICONS } from "@/utils/icons";
import React, { useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

type TextInputProps = {
  label?: string;
  register?: UseFormRegister<any>;
  name?: string;
  type?: string;
  errors?: FieldErrors<any>;
  placeholder?: string;
  className?: string;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  options?: { value: string; displayValue: string }[];
  value?: string | number | Date;
  onChange?: any;
  isDisabled?: boolean;
  isRequired?: boolean;
};

const TextInput = ({
  label,
  register,
  name,
  type = "text",
  errors,
  placeholder = "",
  className,
  prefixIcon,
  suffixIcon,
  options,
  value,
  onChange,
  isDisabled,
  isRequired = true,
}: TextInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  const isPasswordField = type?.toLowerCase().includes("password");
  const inputType = isPasswordField && showPassword ? "text" : type;

  const baseClass = `appearance-none block w-full pr-10 p-3 shadow-sm md:text-xl text-sm font-semibold text-black rounded-md bg-gray-200
   placeholder:font-Urbanist placeholder:font-semibold placeholder:text-xs md:placeholder:text-base 
   placeholder:text-gray-400 outline-none focus:outline-none sm:text-sm ${className}`;

  const inputValue =
    value instanceof Date ? value.toISOString().split("T")[0] : value;

  return (
    <div className="font-Urbanist relative">
      <label
        htmlFor={`${name}`}
        className="block md:text-xl text-sm pb-2 font-semibold font-Urbanist leading-6 text-black"
      >
        {isRequired ? (
          <div className="flex items-center">
            {label}{" "}
            <span style={{ color: "#ef4444" }} className="pl-1 pt-1">
              *
            </span>
          </div>
        ) : (
          <div className="flex items-center">
            {label} <span className=" text-gray-500 pl-2">(Optional)</span>
          </div>
        )}
      </label>
      <div className="relative">
        {prefixIcon && (
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            {prefixIcon}
          </span>
        )}
        {register ? (
          <>
            {type === "select" ? (
              <select
                {...register(`${name}`, { required: isRequired })}
                id={`${name}`}
                name={`${name}`}
                className={baseClass}
                onChange={onChange}
                disabled={isDisabled}
                value={inputValue as string | number | readonly string[]}
              >
                {options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.displayValue}
                  </option>
                ))}
              </select>
            ) : type === "textarea" ? (
              <textarea
                {...register(`${name}`, { required: isRequired })}
                id={`${name}`}
                name={`${name}`}
                placeholder={`${placeholder}`}
                className={baseClass}
                value={inputValue as string}
              />
            ) : (
              <div className="relative flex justify-end items-center">
                <input
                  {...register(`${name}`, { required: isRequired })}
                  id={`${name}`}
                  name={`${name}`}
                  type={inputType}
                  placeholder={`${placeholder}`}
                  autoComplete={`${name}`}
                  className={baseClass}
                  disabled={isDisabled}
                  value={inputValue as string | number}
                />
                {isPasswordField && (
                  <span
                    className="absolute pr-3 cursor-pointer"
                    onClick={handleTogglePasswordVisibility}
                  >
                    {showPassword ? <ICONS.eyelock /> : suffixIcon}
                  </span>
                )}
              </div>
            )}
          </>
        ) : (
          <>
            {type === "select" ? (
              <select
                id={`${name}`}
                name={`${name}`}
                value={inputValue as string | number | readonly string[]}
                className={baseClass}
              >
                {options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.displayValue}
                  </option>
                ))}
              </select>
            ) : type === "textarea" ? (
              <textarea
                id={`${name}`}
                name={`${name}`}
                placeholder={`${placeholder}`}
                className={baseClass}
                value={inputValue as string}
              />
            ) : (
              <div className="relative flex justify-end items-center">
                <input
                  id={`${name}`}
                  name={`${name}`}
                  type={inputType}
                  placeholder={`${placeholder}`}
                  autoComplete={`${name}`}
                  className={baseClass}
                  value={inputValue as string | number}
                />
                {isPasswordField && (
                  <span
                    className="absolute pr-3 cursor-pointer"
                    onClick={handleTogglePasswordVisibility}
                  >
                    {showPassword ? <ICONS.eyelock /> : suffixIcon}
                  </span>
                )}
              </div>
            )}
          </>
        )}
        {suffixIcon && !isPasswordField && (
          <span className="absolute inset-y-0 right-0 flex items-center pr-3">
            {suffixIcon}
          </span>
        )}
      </div>
      {errors && errors[`${name}`] && (
        <span style={{ color: "#ef4444" }} className="text-sm">
          {label} field is required
        </span>
      )}
    </div>
  );
};

export default TextInput;
