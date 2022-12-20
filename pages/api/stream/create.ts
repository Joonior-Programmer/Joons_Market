import withHandler from "@libs/server/withHandler";
import sessionHandler from "@libs/server/sessionHandler";
import type { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "@libs/server/prismaClient";
import axios from "axios";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {
      body: { title, price, description },
      session: { user },
    } = req;

    if (!user)
      return res.status(401).json({ code: 1, message: "Not logged in" });

    const {
      data: {
        result: {
          uid,
          rtmps: { url, streamKey },
        },
      },
    } = await axios({
      method: "POST",
      url: `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/stream/live_inputs`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CLOUDFLARE_STREAM_API_TOKEN}`,
      },
      data: {
        defaultCreator: user.nickname,
        meta: { name: `${user.nickname}/${title}` },
        recording: {
          mode: "automatic",
          requireSignedURLs: false,
          timeoutSeconds: 30,
        },
      },
    });

    const stream = await prismaClient.stream.create({
      data: {
        title,
        price: +price,
        description,
        user: {
          connect: {
            id: user.id,
          },
        },
        streamKey: streamKey,
        streamUID: uid,
        streamURL: url,
      },
    });
    return res.status(200).json({ code: 0, stream });
  } catch (e: any) {
    return res.status(500).json({ code: 5, message: "Internal Server Error" });
  }
}

export default sessionHandler(
  withHandler({ handler, needEnter: true, methods: ["POST"] })
);
