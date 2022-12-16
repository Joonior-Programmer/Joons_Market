import { createTimeFormat } from "@libs/utils";
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
  avatar?: string | null;
  children?: React.ReactNode;
  createdAt?: Date;
}

export default function Comment({
  comment,
  nickname,
  picSize = 12,
  children,
  nameSize = "xs",
  avatar,
  createdAt,
}: CommentProps) {
  console.log(createdAt);
  const time = createdAt ? createTimeFormat(new Date(createdAt)) : null;

  return (
    <div className="flex flex-col">
      <Profile
        picSize={picSize}
        textSize={nameSize}
        fontType="bold"
        picLocation="start"
        nickname={nickname}
        avatar={avatar}
      >
        <div className="flex items-center text-xs">
          {children
            ? children
            : time
            ? new Intl.RelativeTimeFormat("en").format(
                time.difference,
                time.unit
              )
            : "A Moment Ago"}
        </div>
      </Profile>
      <div className="text-gray-600 px-4 font-sans">
        <p>{comment}</p>
      </div>
    </div>
  );
}
