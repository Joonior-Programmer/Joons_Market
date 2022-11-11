interface ButtonProps {
  text: string;
  [key: string]: any;
}

export default function Button({ text, onClick, ...rest }: ButtonProps) {
  return (
    <button
      className="mt-5 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none hover:font-bold transition-all"
      {...rest}
    >
      {text}
    </button>
  );
}
