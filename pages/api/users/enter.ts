import client from "@libs/server/prismaClient";
import withHandler from "@libs/server/withHandler";
import sessionHandler from "@libs/server/sessionHandler";
import { createRandomString } from "@libs/utils";
// import sendTextMessage from "@libs/server/sendTextMessage";
import type { NextApiRequest, NextApiResponse } from "next";


async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, phone } = req.body;
  console.log(req.method);
  const payload = email
    ? createRandomString(2)                           // For Email
    : Math.floor(Math.random() * 1000000).toString(); // For Phone
  const userData = email ? { email } : phone ? { phone } : undefined;
  if(!userData) return res.status(400).end();
  let token = await client.token.upsert({
    where: { ...userData },
    create: {
      payload,
      ...userData,
      user: {
        connectOrCreate: {
          where: {
            ...userData,
          },
          create: {
            nickname: createRandomString(3),
            ...userData,
          },
        },
      },
    },
    update: {
      payload
    },
  });
  console.log(token)
  req.session.confirm = userData.email ? userData.email : userData.phone;
  await req.session.save()

  // send a text message if the user logged in with phone number

  /* *** IMPORTANT!!! Since my Twilio account is a trial account, it can only be sent to my Phone number. ***
   If you want to see Demo, Please visit to  """LINK"""  */

  // if (!payload.includes("@")) await sendTextMessage(process.env.PHONE_NUMBER!, token.payload);


  return res.status(200).json({ code: 0 });
}

export default sessionHandler(withHandler(handler));
