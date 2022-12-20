import withHandler from "@libs/server/withHandler";
import sessionHandler from "@libs/server/sessionHandler";
import type { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "@libs/server/prismaClient";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {
      body: { id, sellerId },
      session: { user },
    } = req;

    const isExist = await prismaClient.chatroom.findUnique({
      where: {
        buyerId_itemId: {
          buyerId: user?.id,
          itemId: +id,
        },
      },
    });

    if (isExist) return res.status(206).json({ code: 1, chatroom: isExist });

    const chatroom = await prismaClient.chatroom.create({
      data: {
        itemId: +id,
        sellerId,
        buyerId: user.id,
      },
    });

    return res.status(200).json({ code: 0, chatroom });
  } catch (e: any) {
    return res.status(500).json({ code: 5, message: "Internal Server Error" });
  }
}

export default sessionHandler(
  withHandler({ handler, needEnter: true, methods: ["POST"] })
);
