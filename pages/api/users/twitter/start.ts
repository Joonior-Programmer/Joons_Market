import withHandler from "@libs/server/withHandler";
import sessionHandler from "@libs/server/sessionHandler";
import type { NextApiRequest, NextApiResponse } from "next";
import { authClient } from "@libs/server/twitterClient";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const PORT = 3001;

  const authUrl = authClient.generateAuthURL({
    state: process.env.TWITTER_STATE!,
    code_challenge_method: "plain",
    code_challenge: "WEGDSG",
  });
  res.redirect(authUrl);
}

export default sessionHandler(withHandler(handler));
