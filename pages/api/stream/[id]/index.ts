import withHandler from "@libs/server/withHandler";
import sessionHandler from "@libs/server/sessionHandler";
import type { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "@libs/server/prismaClient";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {
      query: { id },
      session: { user },
    } = req;

    if (!id) return res.redirect("/404");

    const stream = await prismaClient.stream.findUnique({
      where: {
        id: +id!.toString(),
      },
      include: {
        user: { select: { id: true, nickname: true, avatar: true } },
      },
    });

    if (!stream)
      return res.status(203).json({ code: 1, message: "Item Not Found" });

    if (stream.userId !== user?.id) {
      stream.streamKey = "";
      stream.streamURL = "";
    }

    return res.status(200).json({ code: 0, stream });
  } catch (e: any) {
    return res.status(500).json({ code: 5, message: "Internal Server Error" });
  }
}

export default sessionHandler(withHandler({ handler, methods: ["GET"] }));
