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

const StreamDemoDetail: NextPage = () => {
  return (
    <Layout canGoBack title="Livestream Demo">
      <div className="py-12 px-4  space-y-4">
        <div className="pt-4">
          <iframe
            width="921"
            height="518"
            src="https://www.youtube.com/embed/Cmy91LaaEXU"
            className="w-full rounded-md shadow-sm aspect-video bg-slate-500"
            title="Livestream Demo"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </Layout>
  );
};

export default StreamDemoDetail;
