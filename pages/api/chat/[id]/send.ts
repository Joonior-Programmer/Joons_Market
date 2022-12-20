import withHandler from "@libs/server/withHandler";
import sessionHandler from "@libs/server/sessionHandler";
import type { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "@libs/server/prismaClient";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {
      query: { id },
      body: { message },
      session: { user },
    } = req;
    if (!id) return res.redirect("/404");
    if (!user)
      return res.status(401).json({ code: 1, message: "Not Logged In" });

    const newMessage = await prismaClient.chat.create({
      data: {
        message,
        chatroomId: +id.toString(),
        userId: user.id,
      },
    });
    return res.status(200).json({ code: 0, message: "Success" });
  } catch (e: any) {
    return res.status(500).json({ code: 5, message: "Internal Server Error" });
  }
}

export default sessionHandler(
  withHandler({ handler, needEnter: true, methods: ["POST"] })
);
