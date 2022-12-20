import withHandler from "@libs/server/withHandler";
import sessionHandler from "@libs/server/sessionHandler";
import type { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "@libs/server/prismaClient";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {
      query: { id, userId },
      session: { user },
    } = req;
    if (!user)
      return res.status(401).json({ code: 1, message: "Not Logged In" });

    const isValid = await prismaClient.chatroom.findUnique({
      where: {
        id: +id!.toString(),
      },
    });

    if (!isValid)
      res.status(400).json({ code: 2, message: "The room not exist" });
    if (isValid?.buyerId !== user.id && isValid?.sellerId !== user.id)
      res.status(401).json({ code: 2, message: "You are Not in the room" });

    const chats = await prismaClient.chat.findMany({
      where: {
        chatroomId: +id!.toString(),
        OR: [
          {
            chatroom: {
              sellerId: user.id,
            },
          },
          {
            chatroom: {
              buyerId: user.id,
            },
          },
        ],
      },
      include: {
        user: {
          select: {
            id: true,
            avatar: true,
            nickname: true,
          },
        },
      },
    });
    if (!chats)
      return res.status(203).json({ code: 1, message: "chats Not Found" });

    return res.status(200).json({ code: 0, chats });
  } catch (e: any) {
    return res.status(500).json({ code: 5, message: "Internal Server Error" });
  }
}

export default sessionHandler(
  withHandler({ handler, needEnter: true, methods: ["GET"] })
);
