import { NextApiRequest, NextApiResponse } from "next";

interface ResponseType {
    code: number,
    data: any
}

export default function withHandler(fn:(  req: NextApiRequest,
    res: NextApiResponse) => void, needEnter: boolean = false, needLogout:boolean = false){
        return async function(req: NextApiRequest,
            res: NextApiResponse) {
                if( needEnter) {
                    return res.redirect("/enter")
                }
                if (needLogout){
                    return res.redirect("/")
                }
                if (req.method === "POST" || req.method === "GET" || req.method === "DELETE" || req.method === "PUT"){
                    try {
                        await fn(req, res);
                    }
                    catch (error) {
                        return res.status(500).json(error);
                    }
                }
                else {
                    return res.status(405).end()
                }
            }
}