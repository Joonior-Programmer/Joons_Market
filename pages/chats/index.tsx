import type { NextPage } from "next";
import Layout from "@components/layout";
import Link from "next/link";
import useSWR from "swr";
import urls from "@libs/urls";
import useUser from "@libs/client/useUser";
import { ChatroomResponseType } from "@libs/responseTypes";
import Loading from "@components/loading";
import Image from "next/image";
import { createImageUrl } from "@libs/utils";

const Chats: NextPage = () => {
  const { user, isLoading, isError } = useUser({ isLoginRequired: true });
  const { data, error } = useSWR<ChatroomResponseType>(urls.CHAT_URL);
  return (
    <Layout title="Chat" hasTabBar>
      {!data || isLoading ? (
        <Loading />
      ) : (
        <div className="pt-10 pb-16 divide-y-[1px]">
          {data?.chatrooms.map((chatroom, i) => (
            <Link href={`chats/${chatroom.id}`} key={i}>
              <div className="flex group px-4 cursor-pointer py-3 items-center space-x-3">
                {(chatroom.buyerId === user?.id && chatroom.seller.avatar) ||
                (chatroom.sellerId === user?.id && chatroom.buyer.avatar) ? (
                  <Image
                    src={
                      chatroom.buyerId === user?.id
                        ? createImageUrl(chatroom.seller.avatar, "avatar")
                        : createImageUrl(chatroom.buyer.avatar, "avatar")
                    }
                    width={60}
                    height={60}
                    quality={100}
                    alt="Profile"
                    className={`w-12 h-12 rounded-full bg-slate-300 shadow-sm group-hover:w-14 group-hover:h-14 transition-all"`}
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-slate-300 group-hover:w-14 group-hover:h-14 transition-all" />
                )}

                <div className="group-hover:font-bold transition-all">
                  <p className="text-gray-700">
                    {chatroom.buyerId === user?.id
                      ? chatroom.seller.nickname
                      : chatroom.buyer.nickname}
                  </p>
                  <p className="text-sm text-gray-500">
                    {chatroom.chats[0]?.message
                      ? chatroom.chats[0]?.message
                      : "No Message"}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Chats;
