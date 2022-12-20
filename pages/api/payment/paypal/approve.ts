import withHandler from "@libs/server/withHandler";
import sessionHandler from "@libs/server/sessionHandler";
import type { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "@libs/server/prismaClient";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { paymentInfo } = req.body;

    const item = await prismaClient.item.update({
      where: {
        id: paymentInfo.itemId,
      },
      data: {
        isSoldOut: true,
      },
    });

    await prismaClient.record.create({
      data: {
        userId: paymentInfo.buyerId,
        itemId: paymentInfo.itemId,
        kind: "Bought",
      },
    });

    await prismaClient.order.create({
      data: {
        sellerId: item.userId,
        buyerId: paymentInfo.buyerId,
        itemId: item.id,
        price: item.price,
        payerPaypalId: paymentInfo.payerPaypalId,
        paypalOrderId: paymentInfo.paypalOrderId,
      },
    });
    return res.status(200).json({ code: 0 });
  } catch (e: any) {
    return res.status(500).json({ code: 5, message: "Internal Server Error" });
  }
}

export default sessionHandler(
  withHandler({ handler, needEnter: true, methods: ["POST"] })
);
