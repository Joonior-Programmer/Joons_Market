import { StreamWithUser } from "@libs/modifiedTypes";
import { createImageUrl, createTimeFormat } from "@libs/utils";
import Image from "next/image";
import { useState } from "react";

interface StreamProps {
  title: String;
  nickname: String;
  createdAt: Date;
  avatar?: string | null;
  uid: string;
}

export default function Streams({
  title,
  nickname,
  createdAt,
  avatar,
  uid,
}: StreamProps) {
  const time = createTimeFormat(createdAt);
  avatar = avatar ? createImageUrl(avatar, "avatar") : undefined;

  const [imageError, setImageError] = useState(false);
  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="relative pt-4 px-4 cursor-pointer hover:px-2 transition-all">
      <div className="relative w-full rounded-md shadow-sm aspect-video bg-slate-500">
        {!imageError ? (
          <Image
            alt="thumbnail"
            width={640}
            height={360}
            src={`https://customer-lz62w384m4nqsbd2.cloudflarestream.com/${uid}/thumbnails/thumbnail.jpg?height=480`}
            onError={handleImageError}
            className="w-full rounded-md shadow-sm aspect-video bg-slate-500"
          />
        ) : (
          <div className="w-full rounded-md shadow-sm aspect-video bg-slate-500" />
        )}
      </div>

      <div className="mt-1 flex">
        {avatar ? (
          <Image
            src={avatar}
            width={64}
            height={64}
            alt="Profile"
            className="w-9 h-9 rounded-full mt-2 bg-slate-300 shadow-sm"
            quality={100}
          />
        ) : (
          <div className="w-8 h-8 mt-2 rounded-full bg-slate-300" />
        )}
        <div className="flex flex-col pl-3">
          <h3 className="mt-1 text-gray-900 font-bold text-2zl">{title}</h3>
          <span className="text-xs">
            {nickname} |{" "}
            {time
              ? new Intl.RelativeTimeFormat("en").format(
                  time.difference,
                  time.unit
                )
              : "A Moment Ago"}
          </span>
        </div>
      </div>
    </div>
  );
}
