import withHandler from "@libs/server/withHandler";
import sessionHandler from "@libs/server/sessionHandler";
import type { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "@libs/server/prismaClient";
import { Kind } from "@prisma/client";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {
      query: { id, kind },
      session: { user },
    } = req;

    if (!id) return res.redirect("/404");
    if (
      !kind ||
      !(kind === Kind.Sell || kind === Kind.Bought || kind === Kind.Favourite)
    )
      return res.status(400).json({ code: 5, message: "Provide Wrong Kind" });
    const records = await prismaClient.record.findMany({
      where: {
        userId: +id.toString(),
        kind: kind as Kind,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        item: {
          include: {
            _count: {
              select: {
                favourites: true,
              },
            },
            favourites: {
              where: {
                userId: user?.id || 999999999999999,
              },
              select: {
                userId: true,
              },
            },
          },
        },
      },
    });

    if (!records)
      return res.status(203).json({ code: 1, message: "Records Not Found" });
    return res.status(200).json({ code: 0, records });
  } catch (e: any) {
    console.log(e);
    return res.status(500).json({ code: 5, message: "Internal Server Error" });
  }
}

export default sessionHandler(
  withHandler({ handler, needEnter: true, methods: ["GET"] })
);
