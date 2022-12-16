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

    const item = await prismaClient.item.findUnique({
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
        order: {
          include: {
            buyer: true,
            seller: true,
          },
        },
      },
    });

    if (!item)
      return res.status(203).json({ code: 1, message: "Item Not Found" });

    const splittedTitle = item.title.split(" ").map((name) => {
      return {
        title: {
          contains: name,
        },
      };
    });

    const relatedItems = await prismaClient.item.findMany({
      where: {
        OR: splittedTitle,
        AND: {
          NOT: {
            id: item.id,
          },
        },
      },
    });

    return res.status(200).json({ code: 0, item, relatedItems });
  } catch (e: any) {
    console.log(e);
    return res.status(500).json({ code: 5, message: "Internal Server Error" });
  }
}

export default sessionHandler(withHandler({ handler, methods: ["GET"] }));
