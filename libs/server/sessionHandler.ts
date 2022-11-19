import {withIronSessionApiRoute} from "iron-session/next"

declare module "iron-session" { 
    interface IronSessionData { 
      confirm?: string; 
      user?: {
        nickname: string,
        avatar?: string | null,
        phone?: string | null,
        email?: string | null,
      }
    }
  } 

const cookieOption = {
    cookieName: process.env.COOKIE_NAME!,
    password: process.env.COOKIE_PW!,
    cookieOptions: {},
}



export default function sessionHandler(fn:any, setShortMaxAge:boolean = false){
    setShortMaxAge ? cookieOption.cookieOptions = {
        maxAge: 60 * 3
    } : cookieOption.cookieOptions = {
        maxAge: 60 * 60 * 24 * 14
    }
    return withIronSessionApiRoute(fn, cookieOption)
}