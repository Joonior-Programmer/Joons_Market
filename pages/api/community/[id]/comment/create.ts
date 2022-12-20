import withHandler from "@libs/server/withHandler";
import sessionHandler from "@libs/server/sessionHandler";
import type { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "@libs/server/prismaClient";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {
      body: { comment },
      query: { id },
      session: { user },
    } = req;
    if (!id) return res.redirect("/404");

    const newComment = await prismaClient.comment.create({
      data: {
        comment,
        userId: user?.id,
        postId: +id.toString(),
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
