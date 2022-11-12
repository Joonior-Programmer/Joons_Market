interface ContentProps {
  title: string;
  price: number;
  content: string;
}

export default function Content({ title, price, content }: ContentProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
      <span className="text-2xl block mt-1 text-gray-900">${price}</span>
      <p className=" mt-4 mb-8 text-gray-700">{content}</p>
    </div>
  );
}
