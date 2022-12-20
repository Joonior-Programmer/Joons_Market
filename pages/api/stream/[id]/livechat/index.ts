import withHandler from "@libs/server/withHandler";
import sessionHandler from "@libs/server/sessionHandler";
import type { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "@libs/server/prismaClient";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {
      query: { id },
    } = req;

    if (!id) return res.redirect("/404");

    const livechats = await prismaClient.livechat.findMany({
      where: {
        streamId: +id!.toString(),
      },
      include: {
        user: { select: { id: true, nickname: true, avatar: true } },
      },
    });

    if (!livechats)
      return res.status(203).json({ code: 1, message: "Item Not Found" });

    return res.status(200).json({ code: 0, livechats });
  } catch (e: any) {
    return res.status(500).json({ code: 5, message: "Internal Server Error" });
  }
}

export default sessionHandler(withHandler({ handler, methods: ["GET"] }));
