import withHandler from "@libs/server/withHandler";
import sessionHandler from "@libs/server/sessionHandler";
import type { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "@libs/server/prismaClient";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {
      session: { user },
    } = req;

    if (!user)
      return res.status(401).json({ code: 1, message: "Not Logged In" });

    const chatrooms = await prismaClient.chatroom.findMany({
      where: {
        OR: [
          {
            sellerId: user.id,
          },
          {
            buyerId: user.id,
          },
        ],
      },
      include: {
        buyer: {
          select: {
            id: true,
            avatar: true,
            nickname: true,
          },
        },
        seller: {
          select: {
            id: true,
            avatar: true,
            nickname: true,
          },
        },
        chats: {
          select: {
            message: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
    });
    if (!chatrooms)
      return res.status(203).json({ code: 1, message: "Post Not Found" });

    chatrooms.sort((a, b) => {
      return +new Date(b.chats[0].createdAt) - +new Date(a.chats[0].createdAt);
    });

    return res.status(200).json({ code: 0, chatrooms });
  } catch (e: any) {
    return res.status(500).json({ code: 5, message: "Internal Server Error" });
  }
}

export default sessionHandler(
  withHandler({ handler, needEnter: true, methods: ["GET"] })
);
