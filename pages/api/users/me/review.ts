import withHandler from "@libs/server/withHandler";
import sessionHandler from "@libs/server/sessionHandler";
import type { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "@libs/server/prismaClient";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { user } = req.session;

    const reviews = await prismaClient.review.findMany({
      where: {
        reviewForId: user.id,
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
    return res.status(500).json({ code: 5, message: "Internal Server Error" });
  }
}

export default sessionHandler(withHandler({ handler, methods: ["GET"] }));
