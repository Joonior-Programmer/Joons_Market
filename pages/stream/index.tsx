import type { NextPage } from "next";
import Layout from "@components/layout";
import Link from "next/link";
import FloatingButton from "@components/floatingButton";
import useSWR from "swr";
import urls from "@libs/urls";
import { StreamsResponseType } from "@libs/responseTypes";
import Streams from "@components/streams";
import Loading from "@components/loading";
import { useEffect } from "react";
import { createImageUrl, createTimeFormat } from "@libs/utils";
import Image from "next/image";

const Stream: NextPage = () => {
  const { data, error } = useSWR<StreamsResponseType>(urls.STREAM_URL);
  const time = createTimeFormat(new Date(1670939068736));
  return (
    <Layout title="Live" hasTabBar>
      {!data ? (
        <Loading />
      ) : (
        <div className="relative pt-10 pb-20 px-4 space-y-4 divide-y-[1px]">
          {/* Demo */}
          <Link href={"/stream/demo"}>
            <div className="relative pt-4 px-4 cursor-pointer hover:px-2 transition-all">
              <div className="relative w-full rounded-md shadow-sm aspect-video bg-slate-500">
                <Image
                  alt="thumbnail"
                  width={640}
                  height={360}
                  src={createImageUrl(
                    "3c3907f0-8483-4948-1ebb-ddcd6a773200",
                    "public"
                  )}
                  className="w-full rounded-md shadow-sm aspect-video bg-slate-500"
                />
              </div>

              <div className="mt-1 flex">
                <Image
                  src={createImageUrl(
                    "5976b66a-0fcd-4b51-5dc1-ba9d20536e00",
                    "avatar"
                  )}
                  width={64}
                  height={64}
                  alt="Profile"
                  className="w-9 h-9 mt-2 rounded-full bg-slate-300 shadow-sm"
                  quality={100}
                />

                <div className="flex flex-col pl-3">
                  <h3 className="mt-1 text-gray-900 font-bold text-2zl">
                    Live Stream Demo Please Watch It!!!
                  </h3>
                  <span className="text-xs">
                    Joonior Programmer |{" "}
                    {new Intl.RelativeTimeFormat("en").format(
                      time!.difference,
                      time!.unit
                    )}
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Stream List */}

          {data?.streams.map((stream) => (
            <Link href={`stream/${stream.id}`} key={stream.id}>
              <Streams
                title={stream.title}
                createdAt={new Date(stream.createdAt)}
                nickname={stream.user.nickname}
                avatar={stream.user.avatar}
                uid={stream.streamUID}
              />
            </Link>
          ))}

          {/* Create Button */}

          <FloatingButton href="stream/create">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6 hover:h-8 hover:w-8 transition-all"
            >
              <path
                strokeLinecap="round"
                d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </FloatingButton>
        </div>
      )}
    </Layout>
  );
};

export default Stream;
