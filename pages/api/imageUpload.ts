import withHandler from "@libs/server/withHandler";
import sessionHandler from "@libs/server/sessionHandler";
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    body: { preview },
  } = req;
  if (!preview)
    return res.status(400).json({ code: 1, message: "File is not exist" });
  try {
    const {
      data: { result },
    } = await axios({
      method: "POST",
      url: `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v2/direct_upload`,
      headers: {
        Authorization: `Bearer ${process.env.CLOUDFLARE_IMAGE_API_TOKEN}`,
      },
    });
    return res.status(200).json({ code: 0, uploadInfo: result });
  } catch (e) {
    return res
      .status(500)
      .json({ code: 1, message: "Internal Server Error", error: e });
  }
}

export default sessionHandler(
  withHandler({ handler, needEnter: true, methods: ["POST"] })
);
