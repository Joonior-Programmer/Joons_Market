// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import client from "@libs/server/prismaClient";
import withHandler from "@libs/server/withHandler";
import sessionHandler from "@libs/server/sessionHandler";
import type { NextApiRequest, NextApiResponse } from "next";

const ErrorMessage = {
  1: "Verification code is not matched",
  2: "Session Expired",
  3: "No Payload is provided",

}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method;
  const payload =
    req.method === "POST"
      ? req.body.payload
      : req.method === "GET"
      ? req.query.payload
      : null;

  // session expired with "GET" method

  if (!req.session.confirm || !payload && method === "GET") return res.status(400).redirect("/notification/auth-failed")

  // session expired with "POST" method

  if (!req.session.confirm && method === "POST") return res.status(400).json({code: 2, message:ErrorMessage[2]})

  // No payload provided

  if (!payload && method === "POST") return res.status(400).json({code: 3, message:ErrorMessage[3]})

  const foundToken = await client.token.findFirst({
    where: {
      payload,
    },
    include: {
      user: true,
    },
  });

  // Email Verification Failed

  if (
    req.method === "GET" &&
    !foundToken ||
    !(
      req.session.confirm === foundToken?.email ||
      req.session.confirm === foundToken?.phone
    )
  ) {
    return res.status(400).redirect("/notification/auth-failed")
  }

  // Phone Verification Failed

  if (
    req.method === "POST" &&
    !foundToken ||
    !(
      req.session.confirm === foundToken.email ||
      req.session.confirm === foundToken.phone
    )
  ) {
    return res.status(400).json({code: 1, message: ErrorMessage[1]})
  }



  req.session.destroy();

  req.session.user = {
    nickname: foundToken.user.nickname,
    avatar: foundToken.user.nickname,
    email: foundToken.user.email,
    phone: foundToken.user.phone
  };

  await req.session.save();

  await client.token.delete({where: {
    id: foundToken.id
  }});

  return res.status(200).redirect("/");
}

export default sessionHandler(withHandler(handler));
