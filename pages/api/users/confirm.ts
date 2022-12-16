// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import client from "@libs/server/prismaClient";
import withHandler from "@libs/server/withHandler";
import sessionHandler from "@libs/server/sessionHandler";
import type { NextApiRequest, NextApiResponse } from "next";

const codeMessage = {
  0: "Success",
  1: "Verification code is not matched",
  2: "Session Expired",
  3: "No Payload is provided",
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method;
  if (!(method === "GET" || method === "POST"))
    return res.status(400).json({ code: 1, message: "Wrong Approach" });

  // if the user already logged in
  if (req.session.user && method === "GET") return res.redirect("/");

  const payload =
    req.method === "POST"
      ? req.body.payload
      : req.method === "GET"
      ? req.query.payload
      : null;

  // session expired with "GET" method
  if ((!req.session.confirm || !payload) && method === "GET") {
    return res.status(406).redirect("/notification/auth-failed");
  }

  // session expired with "POST" method
  if (!req.session.confirm && method === "POST")
    return res.status(406).json({ code: 2, message: codeMessage[2] });

  // No payload provided
  if (!payload && method === "POST")
    return res.status(406).json({ code: 3, message: codeMessage[3] });

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
    (!foundToken || req.session.confirm !== foundToken?.email)
  ) {
    if (foundToken)
      await client.token.delete({
        where: {
          id: foundToken.id,
        },
      });
    return res.status(406).redirect("/notification/auth-failed");
  }

  // Phone Verification Failed
  if (
    req.method === "POST" &&
    (!foundToken || !(req.session.confirm === foundToken?.phone))
  ) {
    if (foundToken)
      await client.token.delete({
        where: {
          id: foundToken.id,
        },
      });
    return res.status(406).json({ code: 1, message: codeMessage[1] });
  }

  req.session.destroy();

  req.session.user = foundToken?.user;

  await req.session.save();
  console.log("Session save succeeded");
  await client.token.delete({
    where: {
      id: foundToken!.id,
    },
  });

  if (method === "POST")
    return res.status(200).json({ code: 0, message: codeMessage[0] });
  if (method === "GET") return res.redirect("/");
}

export default sessionHandler(
  withHandler({ handler, methods: ["GET", "POST"] })
);
