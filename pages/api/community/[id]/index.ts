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

    const post = await prismaClient.post.findUnique({
      where: {
        id: +id!.toString(),
      },
      include: {
        user: { select: { id: true, nickname: true, avatar: true } },
        favourites: {
          where: {
            userId: user?.id || 999999999999999,
          },
          select: {
            userId: true,
          },
        },
        comments: {
          select: {
            id: true,
            comment: true,
            createdAt: true,
            user: {
              select: {
                id: true,
                nickname: true,
                avatar: true,
              },
            },
          },
        },
        _count: {
          select: {
            favourites: true,
            comments: true,
          },
        },
      },
    });

    if (!post)
      return res.status(203).json({ code: 1, message: "Post Not Found" });

    return res.status(200).json({ code: 0, post });
  } catch (e: any) {
    console.log(e);
    return res.status(500).json({ code: 5, message: "Internal Server Error" });
  }
}

export default sessionHandler(withHandler({ handler, methods: ["GET"] }));
