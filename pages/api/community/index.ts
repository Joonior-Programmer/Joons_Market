import withHandler from "@libs/server/withHandler";
import sessionHandler from "@libs/server/sessionHandler";
import type { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "@libs/server/prismaClient";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { user } = req.session;
    const posts = await prismaClient.post.findMany({
      include: {
        user: true,
        favourites: {
          where: {
            userId: user?.id || 999999999999999,
          },
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            favourites: true,
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).json({ code: 0, posts });
  } catch (e: any) {
    return res.status(500).json({ code: 5, message: "Internal Server Error" });
  }
}

export default sessionHandler(withHandler({ handler, methods: ["GET"] }));
