
import withHandler from "@libs/server/withHandler";
import sessionHandler from "@libs/server/sessionHandler";
import type { NextApiRequest, NextApiResponse } from "next";
import { URLSearchParams } from "url"

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // if (req.session.user){
  //   return res.redirect("/")
  // }
  console.log("a")
  const baseURL = "https://github.com/login/oauth/authorize?"
  const config = {
    client_id: process.env.GITHUB_CLIENT_ID!,
    scope: "read:user user:email"
  }
  console.log(baseURL + new URLSearchParams(config).toString())
  return res.redirect(baseURL + new URLSearchParams(config).toString())
}

export default sessionHandler(withHandler(handler));


