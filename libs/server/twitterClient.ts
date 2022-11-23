import { Client, auth } from "twitter-api-sdk";

const PORT = 3002

export const authClient = new auth.OAuth2User({
    client_id: process.env.TWITTER_CLIENT_ID!,
    callback: `http://localhost:${PORT}/api/users/twitter/finish`,
    scopes: ["tweet.read", "users.read", "offline.access"],
  });
  
export const twitterClient = new Client(authClient);