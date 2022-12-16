import { createClassName } from "@libs/utils";

interface ButtonProps {
  text: string;
  marginTop?: number;
  px?: number;
  py?: number;
  p?: number;
  textSize?:
    | "xs"
    | "sm"
    | "base"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl"
    | "8xl"
    | "9xl";
  isDisabled?: boolean;
  width?: string;
  [key: string]: any;
}

export default function Button({
  text,
  onClick,
  marginTop = 5,
  textSize = "sm",
  py = 3,
  px = 3,
  p = 3,
  isDisabled = false,
  width = "full",
  ...rest
}: ButtonProps) {
  return (
    <button
      className={createClassName(
        `mt-${marginTop} w-${width} text-white border border-transparent rounded-md shadow-sm text-${textSize} font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none hover:font-bold transition-all`,
        px && py
          ? `py-${py} px-${px}`
          : px
          ? `px-${px}`
          : py
          ? `py-${py}`
          : `p-${p}`,
        isDisabled ? "bg-orange-300" : "bg-orange-500 hover:bg-orange-600"
      )}
      onClick={onClick}
      {...rest}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
}
