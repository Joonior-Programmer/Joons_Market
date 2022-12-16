import {
  Item,
  User,
  Post,
  Favourite,
  Record,
  Review,
  Stream,
  Livechat,
  Chatroom,
  Chat,
  Order,
} from "@prisma/client";

import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io";

interface CountFavourite {
  _count: { favourites: number };
}

interface CountComment {
  _count: { comments: number };
}

export interface CommentWithUser extends Comment {
  comment: string;
  createdAt: Date;
  user: User;
}

export interface ItemWithUser extends Item {
  user: User;
}

export interface ItemWithFavourite extends Item {
  favourites: User[];
}

export interface ItemWithOrder extends Item {
  order: OrderWithUser;
}

export interface OrderWithUser extends Order {
  buyer: User;
  seller: User;
}

export interface PostWithUser extends Post {
  user: User;
}

export interface PostWithComment extends Post {
  comments: CommentWithUser[];
}

export interface PostWithFavourite extends Post {
  favourites: Favourite[];
}

export interface RecordWithItem extends Record {
  item: ItemWithFavourite & CountFavourite;
}

export interface ReviewWithUser extends Review {
  reviewBy: User;
}

export interface StreamWithUser extends Stream {
  user: User;
}

export interface LivechatWithUser extends Livechat {
  user: {
    id: number;
    avatar: string;
    nickname: string;
  };
}

export interface ChatroomWithUser extends Chatroom {
  buyer: {
    id: number;
    nickname: string;
    avatar: string;
  };
  seller: {
    id: number;
    nickname: string;
    avatar: string;
  };
}

export interface ChatWithUser extends Chat {
  user: {
    id: number;
    avatar: string;
    nickname: string;
  };
}

export interface ChatroomWithChats extends Chatroom {
  chats: { message: string }[];
}

export type ItemWithUserFavouriteAndCount = ItemWithUser &
  ItemWithFavourite &
  CountFavourite &
  CountComment;

export type ItemWithUserAndFavourite = ItemWithUser &
  ItemWithFavourite &
  ItemWithOrder;

export type PostWithFavouriteAndCount = Post &
  PostWithFavourite &
  CountFavourite;

export type PostWithUserAndFavouriteAndCount = PostWithUser &
  PostWithComment &
  PostWithFavourite &
  CountFavourite &
  CountComment;

export type NextApiResponseServerIO = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};

export type ChatroomWithUserAndMessage = Chatroom &
  ChatroomWithChats &
  ChatroomWithUser;
