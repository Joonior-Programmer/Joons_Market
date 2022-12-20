import type { NextPage } from "next";
import Content from "@components/content";
import Layout from "@components/layout";
import Chat from "@components/chat";
import ChatInput from "@components/chatInput";
import urls from "@libs/urls";
import { useRouter } from "next/router";
import useSWR from "swr";
import Profile from "@components/profile";
import Link from "next/link";
import useUser from "@libs/client/useUser";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import io, { Socket } from "socket.io-client";
import axios from "axios";
import Loading from "@components/loading";

let socket: Socket;
interface MessageForm {
  message: string;
}

interface Livechat {
  message: string;
  userId: number;
  avatar: string;
}

const StreamDetail: NextPage = () => {
  const router = useRouter();
  const id = router?.query.id;
  const { user, isLoading, isError } = useUser({});
  const { data, error } = useSWR(
    router?.query?.id ? urls.STREAM_URL + `/${router?.query?.id}` : null
  );

  // .  Recover
  // const {
  //   data: livechatData,
  //   error: livechatError,
  //   mutate,
  // } = useSWR<LivechatResponseType>(
  //   router?.query?.id
  //     ? urls.STREAM_URL + `/${router?.query?.id}/livechat`
  //     : null
  // );

  const [livechatData, setLivechatData] = useState<Livechat[]>([]);

  // const [sendMessage, { data: messageData, loading, error: messageError }] =
  //   useMutation(
  //     urls.STREAM_URL + `/${router?.query?.id}/livechat/send`,
  //     "POST"
  //   );
  const { register, handleSubmit, reset } = useForm<MessageForm>();

  const [loading, setLoading] = useState(false);
  const onValid = (message: MessageForm) => {
    if (!message.message) return;
    if (!loading && socket) {
      setLoading(true);

      socket.emit("send", {
        sendUser: user,
        message: message.message,
        roomNumber: id,
        kind: "stream",
      });

      axios.post(urls.STREAM_URL + `/${id}/livechat/send`, {
        message: message.message,
      });

      setLivechatData((prev) => [
        ...prev,
        { message: message.message, userId: user.id, avatar: user.avatar },
      ]);
      reset();
      setLoading(false);
    }
  };

  const [streamInfo, setStreamInfo] = useState(false);
  const handleStreamInfo = () => {
    setStreamInfo(!streamInfo);
  };

  const socketInitializer = async () => {
    if (socket) return;
    // We just call it because we don't need anything else out of it
    await fetch("/api/socketio");

    socket = io();

    socket.emit("join", {
      roomNumber: id,
      sendUser: user,
      kind: "stream",
    });

    socket.on("receive", ({ sendUser, message }) => {
      setLivechatData((prev) => [
        ...prev,
        {
          message: message,
          userId: sendUser?.id,
          avatar: sendUser?.avatar,
        },
      ]);
    });
    if (socket) return () => socket.disconnect();
  };

  useEffect(() => {
    if (!id || socket) return;
    socketInitializer();
  }, [id]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const chatroomRef = useRef<HTMLDivElement>(null);

  // Scroll to Bottom when there is a new chat
  useEffect(() => {
    if (!scrollRef) return;
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [livechatData, scrollRef]);

  // const [scrollState, setScrollState] = useState(true); // 자동 스크롤 여부

  // const scrollEvent = _.debounce(() => {
  //   console.log("scroll");
  //   const scrollTop = boxRef.current.scrollTop; // 스크롤 위치
  //   const clientHeight = boxRef.current.clientHeight; // 요소의 높이
  //   const scrollHeight = boxRef.current.scrollHeight; // 스크롤의 높이

  //   // 스크롤이 맨 아래에 있을때
  // 	setScrollState(scrollTop + clientHeight >= scrollHeight - 100 ? true : false);
  // }, 100);
  // const scroll = useCallback(scrollEvent, []);

  // useEffect(() => {
  //   if (scrollState) {
  //     scrollRef.current.scrollIntoView({ behavior: "smooth" });
  //     // scrollRef의 element위치로 스크롤 이동 behavior는 전환 에니메이션의 정의
  //   }
  // }, [messageLog]);

  // useEffect(() => {
  //   boxRef.current.addEventListener("scroll", scroll);
  // });

  return (
    <Layout canGoBack>
      {!data ? (
        <Loading />
      ) : (
        <div className="py-12 px-4  space-y-4">
          <div className="pt-4">
            {data?.stream?.streamUID ? (
              <iframe
                src={`https://customer-lz62w384m4nqsbd2.cloudflarestream.com/${data?.stream?.streamUID}/iframe`}
                className="w-full rounded-md shadow-sm aspect-video bg-slate-500"
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                allowFullScreen={true}
              />
            ) : null}
          </div>

          <div className="border-b-[1px]">
            <Profile
              nickname={data?.stream?.user?.nickname}
              fontType="medium"
              picSize={12}
              picLocation="center"
              textSize="sm"
              avatar={data?.stream?.user?.avatar}
            >
              <Link
                href={`/profile/${
                  user?.id === data?.stream?.user?.id
                    ? ""
                    : data?.stream?.user?.id
                }`}
              >
                <p className="cursor-pointer text-xs font-medium text-gray-500">
                  View profile &rarr;
                </p>
              </Link>
            </Profile>
          </div>

          {data?.stream?.userId === user?.id ? (
            <button
              className="bg-orange-500 p-3 text-white border border-transparent rounded-md shadow-sm text-medium font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none hover:font-bold transition-all"
              onClick={handleStreamInfo}
            >
              Creator Only
            </button>
          ) : null}
          <div className="border-b mb-2">
            {streamInfo ? (
              <div className="text-xs font-medium my-4">
                <p>Stream URL: {data?.stream?.streamURL}</p>
                <p>Key: {data?.stream?.streamKey}</p>
              </div>
            ) : null}

            <Content
              title={data?.stream?.title}
              price={data?.stream?.price}
              content={data?.stream?.description}
            />
          </div>

          {/* Live Chat */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Live Chat</h2>
            <div
              className="py-3 h-[50vh] overflow-y-scroll px-4 space-y-4 bg-slate-50"
              ref={chatroomRef}
            >
              {livechatData?.map((livechat, i) => (
                <div key={i}>
                  <Chat
                    content={livechat.message}
                    isOpponent={user?.id === livechat.userId}
                    avatar={livechat.avatar}
                    userId={user?.id}
                  />
                </div>
              ))}
              {/* {livechatData?.livechats?.map((livechat, i) => (
              <div key={i}>
                <Chat
                  content={livechat.message}
                  isOpponent={user?.id === livechat.userId}
                  avatar={livechat.user.avatar}
                />
              </div>
            ))} */}
              <div ref={scrollRef} />
              {user ? (
                <form onSubmit={handleSubmit(onValid)}>
                  <ChatInput register={register} />
                </form>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default StreamDetail;
