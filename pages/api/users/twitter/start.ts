
import withHandler from "@libs/server/withHandler";
import sessionHandler from "@libs/server/sessionHandler";
import type { NextApiRequest, NextApiResponse } from "next";
import { URLSearchParams } from "url"
import axios from "axios";
import { createRandomString } from "@libs/utils";
import {authClient} from "@libs/server/twitterClient"


async function handler(req: NextApiRequest, res: NextApiResponse) {
    const PORT = 3001
  // if (req.session.user){
  //   return res.redirect("/")
  // }
//   const baseURL = "https://twitter.com/i/oauth2/authorize?"
//   const config = {
//     response_type: "code",
//     client_id: "WEw5T3M0T3NNQV9MRkFaSUJKdEs6MTpjaQ",
//     redirect_uri: "http://localhost:3001/api/users/twitter/finish",
//     scope: "tweet.read users.read",
//     state: process.env.TWITTER_STATE!,
//     code_challenge: createRandomString(2),
//     code_challenge_method: "plain",
//   }
  
//   return res.redirect(baseURL + new URLSearchParams(config).toString());



  const authUrl = authClient.generateAuthURL({
    state: process.env.TWITTER_STATE!,
    code_challenge_method: "plain",
    code_challenge: "WEGDSG"
  });
  console.log(authUrl)
  res.redirect(authUrl)

    // const baseURL = "https://api.twitter.com/oauth/request_token?"
    // const config = {
    //     oauth_callback: "http://localhost:3001/api/users/twitter/finish"
    // }
    // const token = await axios.post(baseURL + new URLSearchParams(config).toString(), {
    //     headers: {
    //         Authorization: `OAuth oauth_consumer_key="${process.env.TWITTER_API_KEY}", oauth_nonce="13523", oauth_signature="astcvxe", oauth_signature_method="HMAC-SHA1", oauth_timestamp="124", oauth_version="1.0"`
    //     }
    // })
    // console.log(token)
}

export default sessionHandler(withHandler(handler));


