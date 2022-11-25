import { createClassName } from "@libs/utils";
import React, { useState } from "react";
import { UseFormRegister } from "react-hook-form";

interface InputProps {
  inputFor: string;
  label: string;
  kind: "text" | "phone" | "price" | "number";
  required?: boolean;
  [key: string]: any;
}

export default function Input({
  inputFor,
  label,
  kind = "text",
  register,
  required = false,
  ...rest
}: InputProps) {
  return (
    <div className="my-5">
      <label htmlFor={inputFor} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      {kind === "text" ? (
        <div className="mb-3">
          <input
            id={inputFor}
            {...rest}
            {...register(inputFor, required ? { required: true } : {})}
            className="appearance-none pl-7 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:ring-1"
          />
        </div>
      ) : null}
      {kind === "number" ? (
        <div className="mb-3">
          <input
            type="number"
            id={inputFor}
            {...rest}
            {...register(inputFor, required ? { required: true } : {})}
            className="appearance-none pl-7 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:ring-1"
          />
        </div>
      ) : null}
      {kind === "price" ? (
        <div className="rounded-md shadow-sm relative flex items-center">
          <div className="absolute left-0 pl-3 flex items-center justify-center pointer-events-none">
            <span className="text-gray-500 text-sm">$</span>
          </div>
          <input
            id={inputFor}
            type="number"
            placeholder="0"
            {...rest}
            {...register(inputFor, required ? { required: true } : {})}
            className="appearance-none pl-7 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
          <div className="absolute right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-500">USD</span>
          </div>
        </div>
      ) : null}
      {kind === "phone" ? (
        <div className="flex rounded-md shadow-sm">
          <span className="flex w-24 items-center justify-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-100 text-gray-500 selection-none text-sm">
            🇰🇷 +82
          </span>
          <input
            id={inputFor}
            type="number"
            className="appearance-none w-full px-3 py-2 border rounded-l-none border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            {...rest}
            {...register(inputFor, {
              required,
              pattern: {
                value: /^[0-9]+$/,
                message: "Please enter a number",
              },
            })}
          />
        </div>
      ) : null}
    </div>
  );
}
