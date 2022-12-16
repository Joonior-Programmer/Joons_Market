import { createClassName } from "@libs/utils";

interface TextareaProps {
  inputFor?: string;
  label?: string;
  placeholder: string;
  isDisable?: boolean;
  [key: string]: any;
}

export default function Textarea({
  placeholder,
  label,
  inputFor,
  register,
  isDisable,
  ...rest
}: TextareaProps) {
  return (
    <div>
      {label ? (
        <label htmlFor={inputFor} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      ) : null}

      <textarea
        id={inputFor}
        rows={4}
        className={createClassName(
          "mt-1 shadow-sm w-full focus:ring-orange-500 rounded-md border-gray-300 focus:border-orange-500 required",
          isDisable ? "disabled" : ""
        )}
        placeholder={placeholder}
        {...rest}
        {...register}
      />
    </div>
  );
}
