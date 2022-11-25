import withHandler from "@libs/server/withHandler";
import sessionHandler from "@libs/server/sessionHandler";
import type { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "@libs/server/prismaClient";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    if (!id) res.redirect("/404");

    const item = await prismaClient.item.findUnique({
      where: {
        id: +id!.toString(),
      },
      include: {
        user: { select: { id: true, nickname: true, avatar: true } },
      },
    });
    console.log(item);
    if (!item)
      return res.status(203).json({ code: 1, message: "Item Not Found" });
    return res.status(200).json({ code: 0, item });
  } catch (e: any) {
    console.log(e);
    return res.status(500).json({ code: 5, message: "Internal Server Error" });
  }
}

export default sessionHandler(
  withHandler({ handler, needEnter: true, methods: ["GET"] })
);
