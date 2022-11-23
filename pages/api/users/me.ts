
import withHandler from "@libs/server/withHandler";
import sessionHandler from "@libs/server/sessionHandler";
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req.session.user){
    return res.status(200).json({code:1})
  }
  return res.status(200).json({code:0, data: req.session.user})
}

export default sessionHandler(withHandler(handler));


