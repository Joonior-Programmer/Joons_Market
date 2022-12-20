import withHandler from "@libs/server/withHandler";
import sessionHandler from "@libs/server/sessionHandler";
import type { NextApiRequest, NextApiResponse } from "next";
import { URLSearchParams } from "url";
import axios from "axios";
import prismaClient from "@libs/server/prismaClient";
import { createRandomString } from "@libs/utils";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // 2nd Layer to send the code from Github with POST Reqeust
    const { code } = req.query;
    let baseURL = "https://github.com/login/oauth/access_token?";
    const config = {
      client_id: process.env.GITHUB_CLIENT_ID!,
      client_secret: process.env.GITHUB_CLIENT_SECRET!,
      code: code!,
    };

    const { data: secondLayerResult } = await axios.post(
      baseURL + new URLSearchParams(config).toString()
    );

    // Handle String Process to get Access Token
    const access_token = secondLayerResult.split("&", 1)[0].split("=")[1];

    // 3rd Layer to get user data with the access token from the POST Request Above
    baseURL = "https://api.github.com/user";
    const { data: userData } = await axios.get(baseURL, {
      headers: {
        Authorization: `token ${access_token}`,
      },
    });

    // 3rd Layer to get user's email
    const { data: emailData } = await axios.get(baseURL + "/emails", {
      headers: {
        Authorization: `token ${access_token}`,
      },
    });
    const primaryEmail = emailData.filter((obj: any) => {
      return obj.primary;
    })[0];

    // Create or Get the user data
    const social = await prismaClient.social.upsert({
      where: {
        socialId_method: {
          socialId: userData.id.toString(),
          method: "github",
        },
      },
      create: {
        socialId: userData.id.toString(),
        email: primaryEmail.email,
        method: "github",
        user: {
          create: {
            nickname: "user-" + createRandomString(2),
          },
        },
      },
      update: {},
      include: {
        user: true,
      },
    });
    req.session.user = social.user;
    req.session.user.social = {
      socialId: social.socialId,
      method: "github",
      email: social.email,
    };

    await req.session.save();
    return res.redirect("/");
  } catch (e) {
    return res.status(500).json({ error: e });
  }
}

export default sessionHandler(withHandler({ handler, methods: ["GET"] }));
