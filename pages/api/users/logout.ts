
import withHandler from "@libs/server/withHandler";
import sessionHandler from "@libs/server/sessionHandler";
import type { NextApiRequest, NextApiResponse } from "next";


async function handler(req: NextApiRequest, res: NextApiResponse) {
    req.session.destroy()
  return res.redirect("/")
}

export default sessionHandler(withHandler(handler));


