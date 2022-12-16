import type { NextPage } from "next";
import Chat from "@components/chat";
import ChatInput from "@components/chatInput";
import Layout from "@components/layout";
import { useForm } from "react-hook-form";
import urls from "@libs/urls";
import { useRouter } from "next/router";
import useSWR from "swr";
import useUser from "@libs/client/useUser";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { ChatResponseType } from "@libs/responseTypes";
import axios from "axios";
import Loading from "@components/loading";

let socket: Socket;

interface ChatForm {
  message: string;
}

const ChatDetail: NextPage = () => {
  const { register, handleSubmit, reset } = useForm<ChatForm>();
  const router = useRouter();
  const id = router?.query?.id;
  const { user, isLoading, isError } = useUser({ isLoginRequired: true });
  const { data, error, mutate } = useSWR<ChatResponseType>(
    id && user ? urls.CHAT_URL + `/${id}?userId=${user.id}` : null
  );
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollRef) return;
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data, scrollRef]);

  const socketInitializer = async () => {
    if (socket) return;
    // We just call it because we don't need anything else out of it
    await fetch("/api/socketio");

    socket = io();

    socket.emit("join", {
      roomNumber: id,
      sendUser: user,
      kind: "chat",
    });

    socket.on("receive", ({ sendUser, message }) => {
      mutate(
        (prev) =>
          prev &&
          ({
            ...prev,
            chats: [
              ...prev.chats,
              { userId: sendUser?.id as number, message, user: sendUser },
            ],
          } as any),
        false
      );
    });
    if (socket) return () => socket.disconnect();
  };

  useEffect(() => {
    if (!id && socket) return;
    socketInitializer();
  }, [id]);

  const onValid = ({ message }: ChatForm) => {
    if (!message) return;
    if (!loading && socket) {
      setLoading(true);

      socket.emit("send", {
        sendUser: user,
        message: message,
        roomNumber: id,
        kind: "chat",
      });

      axios.post(urls.CHAT_URL + `/${id}/send`, {
        message: message,
      });

      mutate(
        (prev) =>
          prev &&
          ({
            ...prev,
            chats: [
              ...prev.chats,
              {
                userId: user?.id,
                message: message,
                user: {
                  nickname: user?.nickname,
                  avatar: user?.avatar,
                  userId: user?.id,
                },
              },
            ],
          } as any),
        false
      );

      reset();
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error) router.replace("/404");
  }, [error, router]);

  return (
    <Layout canGoBack>
      {!data || isLoading ? (
        <Loading />
      ) : (
        <div className="pt-12 pb-8 px-4 space-y-4 mb-6">
          {data?.chats.map((chat, i) => (
            <div key={i}>
              <Chat
                isOpponent={user?.id === chat.userId}
                content={chat.message}
                avatar={chat.user?.avatar}
                userId={chat.userId}
              />
            </div>
          ))}
          <div ref={scrollRef} />
          <form onSubmit={handleSubmit(onValid)}>
            <ChatInput register={register} />
          </form>
        </div>
      )}
    </Layout>
  );
};

export default ChatDetail;
