import { METHODS } from "http";
import { NextApiRequest, NextApiResponse } from "next";

type method = "GET" | "POST" | "PUT" | "DELETE";
interface ConfigType {
  handler: (req: NextApiRequest, res: NextApiResponse) => void;
  needEnter?: boolean;
  needLogout?: boolean;
  methods: method[];
}

export default function withHandler({
  handler,
  needEnter = false,
  needLogout = false,
  methods,
}: ConfigType) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    if (needEnter && !req.session.user)  return res.redirect("/enter");

    if (needLogout && req.session.user)  return res.redirect("/");

    if (req.method && !methods.includes(req.method as method))
      return res.status(405).json({ code: 9, message: "Wrong Approach" });
      
    try {
      await handler(req, res);
    } catch (error) {
      return res.status(500).json(error);
    }
  };
}
