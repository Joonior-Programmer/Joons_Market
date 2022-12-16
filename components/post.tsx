import useUser from "@libs/client/useUser";
import { PostWithUserAndFavouriteAndCount } from "@libs/modifiedTypes";
import { createClassName, createImageUrl, createTimeFormat } from "@libs/utils";
import Image from "next/image";

import Link from "next/link";

interface PostProps {
  post: PostWithUserAndFavouriteAndCount;
}

export default function Post({ post }: PostProps) {
  const time = createTimeFormat(new Date(post.createdAt));
  return (
    <Link href={`/community/${post.id}`}>
      <div className="flex flex-col items-start py-2 group cursor-pointer">
        <span
          className="flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800
         group-hover:text-sm transition-all"
        >
          Question
        </span>
        <span className="mt-2 text-gray-700  group-hover:text-lg group-hover:font-semibold transition-all">
          <span className="text-orange-500 font-medium">Q.</span>
          {post?.title}
        </span>
        <div className="mt-3 flex items-center justify-between w-full text-gray-500 font-medium text-xs transition-all group-hover:text-sm">
          <div className="flex">
            {post?.user?.avatar ? (
              <Image
                src={createImageUrl(post?.user?.avatar, "avatar")}
                width={60}
                height={60}
                quality={100}
                alt="Profile"
                className={`w-${4} h-${4} rounded-full bg-slate-300 shadow-sm`}
              />
            ) : (
              <div className="w-4 h-4 rounded-full bg-slate-300 group-hover:w-5 group-hover:h-5 transition-all" />
            )}
            <span className="pl-2">{post?.user?.nickname}</span>
          </div>
          <span>
            {time
              ? new Intl.RelativeTimeFormat("en").format(
                  time.difference,
                  time.unit
                )
              : "A Moment Ago"}
          </span>
        </div>
        <div className="flex space-x-5 mt-3 text-gray-700 py-2.5 border-t border-b w-full">
          <span
            className={createClassName(
              "flex space-x-2 items-center text-sm group-hover:font-bold",
              post.favourites.length > 0 ? "text-orange-500" : ""
            )}
          >
            <svg
              className="w-4 h-4 group-hover:h-5 group-hover:w-5 transition-all"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>
              {post._count.favourites > 2
                ? `${post?._count?.favourites} Likes`
                : `${post?._count?.favourites} Like`}
            </span>
          </span>
          <span className="flex space-x-2 items-center text-sm group-hover:font-bold">
            <svg
              className="w-4 h-4 group-hover:h-5 group-hover:w-5 transition-all"
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
            <span>
              {post._count.comments > 2
                ? `${post?._count?.comments} Comments`
                : `${post?._count?.comments} Comment`}
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
