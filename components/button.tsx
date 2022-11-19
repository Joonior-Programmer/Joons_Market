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
  [key: string]: any;
}

export default function Button({
  text,
  onClick,
  marginTop = 5,
  textSize = "sm",
  py = 2,
  px = 4,
  p,

  ...rest
}: ButtonProps) {
  return (
    <button
      className={createClassName(
        `mt-${marginTop} p-3 w-full bg-orange-500 hover:bg-orange-600  text-white border border-transparent rounded-md shadow-sm text-${textSize} font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none hover:font-bold transition-all`,
        p ? `p-${p}` : `py-${py} px-${px}`
      )}
      {...rest}
    >
      {text}
    </button>
  );
}
