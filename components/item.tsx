import { createClassName, createImageUrl, createTimeFormat } from "@libs/utils";
import Image from "next/image";
import Link from "next/link";

interface ItemProps {
  id: string | number;
  title: string;
  price: number;
  numOfHearts: number;
  isLiked: boolean;
  createdAt: Date;
  picture?: string | null;
  isSoldOut?: boolean;
}

export default function Item({
  id,
  title,
  price,
  numOfHearts,
  createdAt,
  isLiked,
  picture,
  isSoldOut,
}: ItemProps) {
  const time = createTimeFormat(new Date(createdAt));
  return (
    <Link href={`/items/${id}`}>
      <div className="flex border-b pb-4 px-4 cursor-pointer justify-between group">
        <div className="flex space-x-4">
          {picture ? (
            <div className="relative w-20 h-20 group-hover:w-24 group-hover:h-24 transition-all">
              <Image
                width={120}
                height={120}
                quality={100}
                src={createImageUrl(picture, "itemList")}
                alt="Item List"
                className="absolute top-0 rounded-md w-20 h-20 group-hover:w-24 group-hover:h-24 transition-all"
              />
              {isSoldOut ? (
                <div>
                  <div className="w-20 h-20 bg-slate-300 absolute z-10 top-0 opacity-70 rounded-md text-center group-hover:w-24 group-hover:h-24 group-hover:p-8 transition-all" />
                  <span className="w-20 h-20 absolute z-20 top-0 text-center pt-7 group-hover:pt-8 rounded-md font-bold group-hover:w-24 group-hover:h-24 transition-all">
                    Sold Out
                  </span>
                </div>
              ) : null}
            </div>
          ) : isSoldOut ? (
            <div className="relative">
              <div className="w-20 h-20 bg-orange-300 rounded-md group-hover:w-24 group-hover:h-24 transition-all" />
              <div>
                <div className="w-20 h-20 bg-slate-300 absolute z-10 top-0 opacity-70 rounded-md text-center group-hover:w-24 group-hover:h-24 group-hover:p-8 transition-all" />
                <span className="w-20 h-20 absolute z-20 top-0 text-center pt-7 group-hover:pt-8 rounded-md font-bold group-hover:w-24 group-hover:h-24 transition-all">
                  Sold Out
                </span>
              </div>
            </div>
          ) : (
            <div className="w-20 h-20 bg-orange-300 rounded-md group-hover:w-24 group-hover:h-24 transition-all" />
          )}
          <div className="pt-2 flex flex-col">
            <h3 className="text-base font-bold text-gray-900 group-hover:text-base transition-all pt-2">
              {title}
            </h3>
            {/* <span className="text-xs text-gray-500 group-hover:text-sm transition-all">
              Black
            </span> */}
            <span className="text-sm font-medium mt-1 text-gray-900 group-hover:text-lg transition-all">
              ${price}
            </span>
          </div>
        </div>
        <div className="flex flex-col space-x-2 items-end justify-end">
          <div
            className={createClassName(
              "flex space-x-0.5 items-center text-base",
              isLiked ? "text-red-400" : "text-gray-600"
            )}
          >
            {isLiked ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 group-hover:w-5 group-hover:h-5 transition-all"
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            ) : (
              <svg
                className="w-4 h-4 group-hover:w-5 group-hover:h-5 transition-all"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
            )}

            <span className="group-hover:text-lg transition-all">
              {numOfHearts}
            </span>
          </div>
          <p className="flex mt-2 items-center text-xs text-gray-600 group-hover:text-sm transition-all">
            {time
              ? new Intl.RelativeTimeFormat("en").format(
                  time.difference,
                  time.unit
                )
              : "A Moment Ago"}
            {/* <svg
              className="w-4 h-4 group-hover:w-5 group-hover:h-5 transition-all"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              ></path>
            </svg>
            
            <span className="group-hover:text-lg transition-all">
              {numOfComments}
            </span> */}
          </p>
        </div>
      </div>
    </Link>
  );
}
