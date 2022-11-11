interface TextareaProps {
  inputFor?: string;
  label?: string;
  placeholder: string;
  [key: string]: any;
}

export default function Textarea({
  placeholder,
  label,
  inputFor,
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
        className="mt-1 shadow-sm w-full focus:ring-orange-500 rounded-md border-gray-300 focus:border-orange-500"
        placeholder={placeholder}
        {...rest}
      />
    </div>
  );
}
