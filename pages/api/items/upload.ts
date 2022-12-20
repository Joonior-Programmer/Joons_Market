import withHandler from "@libs/server/withHandler";
import sessionHandler from "@libs/server/sessionHandler";
import type { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "@libs/server/prismaClient";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {
      body: { title, price, description, picture },
      session: { user },
    } = req;

    const item = await prismaClient.item.create({
      data: {
        title,
        price: +price,
        description,
        picture,
        user: {
          connect: {
            id: user.id,
          },
        },
        record: {
          create: {
            userId: user.id,
            kind: "Sell",
          },
        },
      },
    });

    return res.status(200).json({ code: 0, item });
  } catch (e: any) {
    return res.status(500).json({ code: 5, message: "Internal Server Error" });
  }
}

export default sessionHandler(
  withHandler({ handler, needEnter: true, methods: ["POST"] })
);
