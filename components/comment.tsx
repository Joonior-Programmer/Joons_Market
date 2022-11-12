import { useEffect, useState } from "react";
import Profile from "./profile";

interface CommentProps {
  nickname: string;
  comment: string;
  picSize?: number;
  nameSize?:
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

  children: React.ReactNode;
}

export default function Comment({
  comment,
  nickname,
  picSize = 12,
  children,
  nameSize = "sm",
}: CommentProps) {
  return (
    <div className="flex flex-col">
      <Profile
        picSize={picSize}
        textSize={nameSize}
        fontType="bold"
        picLocation="start"
        nickname={nickname}
      >
        <div className="flex items-center">{children}</div>
      </Profile>
      <div className="text-gray-600 px-4 font-sans">
        <p>{comment}</p>
      </div>
    </div>
  );
}
