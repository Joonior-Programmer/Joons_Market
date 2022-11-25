import withHandler from "@libs/server/withHandler";
import sessionHandler from "@libs/server/sessionHandler";
import type { NextApiRequest, NextApiResponse } from "next";
import { twitterClient, authClient } from "@libs/server/twitterClient";
import prismaClient from "@libs/server/prismaClient";
import { createRandomString } from "@libs/utils";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { state, code } = req.query;
  try {
    authClient.generateAuthURL({
      state: process.env.TWITTER_STATE!,
      code_challenge_method: "plain",
      code_challenge: process.env.TWITTER_CODE_CHALLENGE!,
    });

    await authClient.requestAccessToken(code as string);

    const { data: userData } = await twitterClient.users.findMyUser();
    
    const social = await prismaClient.social.upsert({
      where: {
        socialId_method: {
          socialId: userData!.id.toString(),
          method: "twitter",
        },
      },
      create: {
        socialId: userData!.id.toString(),
        method: "twitter",
        user: {
          create: {
            nickname: createRandomString(3),
          },
        },
      },
      update: {},
      include: {
        user: true,
      },
    });
    // console.log(userData)
    req.session.user = social.user;
    req.session.user.social = {
      socialId: social.socialId,
      method: "twitter",
    };

    await req.session.save();
    
    await authClient.revokeAccessToken();
    
    return res.redirect("/");
  } catch (e: any) {
    // console.log(e);
    res.status(500).json({ error: e });
  }
}

export default sessionHandler(withHandler({handler, methods: ["GET"]}));
