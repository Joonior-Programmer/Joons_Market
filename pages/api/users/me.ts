import withHandler from "@libs/server/withHandler";
import sessionHandler from "@libs/server/sessionHandler";
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;

  if (!user) return res.status(200).json({ code: 2, message: "Not Logged in" });

  return res.status(200).json({ code: 0, data: user });
}

export default sessionHandler(withHandler({ handler, methods: ["GET"] }));
