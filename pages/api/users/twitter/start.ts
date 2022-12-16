import withHandler from "@libs/server/withHandler";
import sessionHandler from "@libs/server/sessionHandler";
import type { NextApiRequest, NextApiResponse } from "next";
import { authClient } from "@libs/server/twitterClient";

async function handler(req: NextApiRequest, res: NextApiResponse) {

  const authUrl = authClient.generateAuthURL({
    state: process.env.TWITTER_STATE!,
    code_challenge_method: "plain",
    code_challenge: process.env.TWITTER_CODE_CHALLENGE!,
  });
  
  return res.redirect(authUrl);
}

export default sessionHandler(withHandler({ handler, methods: ["GET"] }));
