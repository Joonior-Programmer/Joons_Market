import { Item, User } from "@prisma/client";

interface ItemWithUser extends Item {
    user: User
}


export interface ItemResponseType {
    code: number;
    items?: Item[]
    item?:  ItemWithUser
    message?: string
    error?: any
}