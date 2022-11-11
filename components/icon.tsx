import React from "react";
import Link from "next/link";
interface IconProps {
  children: React.ReactNode;
  text: string;
  href: string;
  kind: "tabIcon" | "orangeIcon";
}

export default function Icon({ children, text, kind, href }: IconProps) {
  return (
    <div>
      {kind === "tabIcon" ? (
        <Link href={href}>
          <div className="flex flex-col items-center space-y-2 cursor-pointer hover:text-orange-500 transition-all hover:font-bold">
            {children}

            <span>{text}</span>
          </div>
        </Link>
      ) : null}
      {kind === "orangeIcon" ? (
        <Link href={href}>
          <div className="flex flex-col items-center group cursor-pointer">
            <div className="w-14 h-14 transition-all group-hover:w-16 group-hover:h-16 group-hover:bg-orange-600 text-white bg-orange-500 rounded-full flex items-center justify-center">
              {children}
            </div>
            <span className="transition-all text-sm font-medium text-gray-700 mt-2 group-hover:text-lg group-hover:font-bold">
              {text}
            </span>
          </div>
        </Link>
      ) : null}
    </div>
  );
}
