import withHandler from "@libs/server/withHandler";
import sessionHandler from "@libs/server/sessionHandler";
import type { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "@libs/server/prismaClient";
import axios from "axios";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    session: { user },
    body: { nickname, avatar },
  } = req;

  if (!user) return res.status(200).json({ code: 2, message: "Not Logged in" });
  console.log(avatar);
  // Check Nothing updated
  if (user.nickname === nickname && !avatar)
    return res.status(406).json({ code: 1, message: "Nothing Updated" });
  try {
    // Same Nickname Check
    const checkExist = await prismaClient.user.findUnique({
      where: {
        nickname,
      },
    });

    if (user.nickname !== nickname && checkExist?.nickname === nickname)
      return res
        .status(406)
        .json({ code: 3, message: "The nickname is already taken" });
    console.log(
      `https://api.cloudflare.com/client/v4/accounts//images/v2/https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v1/${avatar}`
    );
    // Delete Previous Image
    if (user.avatar && avatar) {
      const deletionResult = await axios({
        method: "DELETE",
        url: `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v1/${user.avatar}`,
        headers: {
          Authorization: `Bearer ${process.env.CLOUDFLARE_IMAGE_API_TOKEN}`,
        },
      });
    }

    // Update the user
    const editUser = await prismaClient.user.update({
      where: {
        id: user.id,
      },
      data: {
        nickname,
        avatar,
      },
    });

    req.session.user = editUser;
    await req.session.save();

    return res.status(200).json({ code: 0, data: editUser });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ code: 0, message: "Internal Server Error" });
  }
}

export default sessionHandler(withHandler({ handler, methods: ["PUT"] }));
