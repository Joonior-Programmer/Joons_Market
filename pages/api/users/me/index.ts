import withHandler from "@libs/server/withHandler";
import sessionHandler from "@libs/server/sessionHandler";
import type { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "@libs/server/prismaClient";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;

  if (!user) return res.status(200).json({ code: 2, message: "Not Logged in" });

  const loggedInUser = await prismaClient.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      id: true,
      nickname: true,
      avatar: true,
    },
  });
  return res.status(200).json({ code: 0, data: loggedInUser });
}

export default sessionHandler(withHandler({ handler, methods: ["GET"] }));
