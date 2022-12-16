import { createImageUrl } from "@libs/utils";
import Image from "next/image";
import Link from "next/link";

interface chatProps {
  isOpponent?: boolean;
  content: string;
  avatar?: string | null;
  userId: number;
}

export default function Chat({
  isOpponent = false,
  content,
  avatar = null,
  userId,
}: chatProps) {
  avatar = avatar ? createImageUrl(avatar, "avatar") : null;
  return (
    <div>
      <div
        className={
          !isOpponent
            ? "flex items-start space-x-2 py-1"
            : "py-1 flex flex-row-reverse items-end space-x-2 space-x-reverse"
        }
      >
        <Link href={`/profile/${userId}`}>
          {avatar ? (
            <Image
              src={avatar}
              width={32}
              height={32}
              quality={100}
              alt="Profile"
              className={`w-${8} h-${8} rounded-full bg-slate-300 shadow-sm`}
            />
          ) : (
            <div className="rounded-full w-8 h-8 bg-slate-300" />
          )}
        </Link>
        <div
          className={
            !isOpponent
              ? "w-1/2 overflow-auto text-sm text-gray-700 p-2 border border-gray-300 rounded-md bg-white"
              : "w-1/2 overflow-auto text-sm text-gray-700 p-2 border border-gray-300 rounded-md bg-white"
          }
        >
          <p>{content}</p>
        </div>
      </div>

      {/* {!isOpponent ? (
        <div className="flex items-start space-x-2 py-1">
          {avatar ? (
            <Image
              src={avatar}
              width={32}
              height={32}
              quality={100}
              alt="Profile"
              className={`w-${8} h-${8} rounded-full bg-slate-300 shadow-sm`}
            />
          ) : (
            <div className="rounded-full w-8 h-8 bg-slate-300" />
          )}
          <div className="w-1/2 overflow-auto text-sm text-gray-700 p-2 border border-gray-300 rounded-md bg-white">
            <p>{content}</p>
          </div>
        </div>
      ) : (
        <div className="py-1 flex flex-row-reverse items-end space-x-2 space-x-reverse">
          {avatar ? (
            <Image
              src={avatar}
              width={32}
              height={32}
              quality={100}
              alt="Profile"
              className={`w-${8} h-${8} rounded-full bg-slate-300 shadow-sm`}
            />
          ) : (
            <div className="rounded-full w-8 h-8 bg-slate-300" />
          )}
          <div className="w-1/2 overflow-auto text-sm text-gray-700 p-2 border border-gray-300 rounded-md bg-white">
            <p>{content}</p>
          </div>
        </div>
      )} */}
    </div>
  );
}
