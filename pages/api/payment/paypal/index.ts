import withHandler from "@libs/server/withHandler";
import sessionHandler from "@libs/server/sessionHandler";
import type { NextApiRequest, NextApiResponse } from "next";

import createOrder from "@libs/server/paypalCreateOrder";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { item } = req.body;

    const order = await createOrder("CAD", item.price + ".00", item.title);
    return res.status(200).json({ code: 0, id: order.id });
  } catch (e: any) {
    return res.status(500).json({ code: 5, message: "Internal Server Error" });
  }
}

export default sessionHandler(
  withHandler({ handler, needEnter: true, methods: ["POST"] })
);
