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

const ItemDemoDetail: NextPage = () => {
  return (
    <Layout canGoBack title="Item Purchase Demo">
      <div className="py-12 px-4  space-y-4">
        <div className="pt-4">
          <iframe
            width="907"
            height="510"
            src="https://www.youtube.com/embed/pF0fJ_3nUhY"
            title="Item Purchase Demo"
            frameBorder="0"
            className="w-full rounded-md shadow-sm aspect-video bg-slate-500"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </Layout>
  );
};

export default ItemDemoDetail;
