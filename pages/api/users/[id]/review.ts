import withHandler from "@libs/server/withHandler";
import sessionHandler from "@libs/server/sessionHandler";
import type { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "@libs/server/prismaClient";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;

    if (!id)
      return res.status(400).json({ code: 2, message: "Wrong ID is provided" });

    const reviews = await prismaClient.review.findMany({
      where: {
        reviewForId: +id?.toString(),
      },
      include: {
        reviewBy: {
          select: {
            id: true,
            nickname: true,
            avatar: true,
          },
        },
      },
    });
    return res.status(200).json({ code: 0, reviews });
  } catch (e: any) {
    console.log(e);
    return res.status(500).json({ code: 5, message: "Internal Server Error" });
  }
}

export default sessionHandler(withHandler({ handler, methods: ["GET"] }));
