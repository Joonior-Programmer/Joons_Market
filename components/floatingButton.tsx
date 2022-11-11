import Link from "next/link";
import React from "react";

interface FloatingButton {
  children: React.ReactNode;
  href: string;
}

export default function FloatingButton({ children, href }: FloatingButton) {
  return (
    <Link href={href}>
      <button className="fixed border-transparent bottom-24 opacity-80 right-5 bg-orange-400 rounded-full p-4 text-white hover:opacity-100 hover:bg-orange-500 hover:font-bold cursor-pointer transition-colors">
        {children}
      </button>
    </Link>
  );
}
