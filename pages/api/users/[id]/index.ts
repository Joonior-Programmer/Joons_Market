import withHandler from "@libs/server/withHandler";
import sessionHandler from "@libs/server/sessionHandler";
import type { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "@libs/server/prismaClient";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try{
    const {id} = req.query;

    // if (isNaN(+id?.toString())) return res.redirect("/404")

    const user = await prismaClient.user.findUnique({
        where: {
            id: +id!
        },
        select: {
          id: true,
          nickname: true,
          avatar: true
        }
    })
    // console.log(user)
    if (!user) return res.status(203).json({code:1, message:"User Not Found"})
    return res.status(200).json({code:0, data: user})
  } catch (e: any) {
    console.log(e);
    return res.status(500).json({ code: 5, message: "Internal Server Error" });
  }
}

export default sessionHandler(withHandler({ handler, methods: ["GET"] }));
