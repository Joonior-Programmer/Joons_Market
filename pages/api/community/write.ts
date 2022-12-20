import withHandler from "@libs/server/withHandler";
import sessionHandler from "@libs/server/sessionHandler";
import type { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "@libs/server/prismaClient";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {
      body: { title, description },
      session: { user },
    } = req;
    const post = await prismaClient.post.create({
      data: {
        title,
        description,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    return res.status(200).json({ code: 0, post });
  } catch (e: any) {
    return res.status(500).json({ code: 5, message: "Internal Server Error" });
  }
}

export default sessionHandler(
  withHandler({ handler, needEnter: true, methods: ["POST"] })
);
