import { Chat, Item, Post, Stream } from "@prisma/client";
import {
  PostWithFavouriteAndCount,
  RecordWithItem,
  ItemWithUserAndFavourite,
  ItemWithUserFavouriteAndCount,
  PostWithUserAndFavouriteAndCount,
  ReviewWithUser,
  StreamWithUser,
  LivechatWithUser,
  ChatroomWithUserAndMessage,
  ChatWithUser,
} from "./modifiedTypes";

export interface ItemResponseType {
  code: number;
  items?: ItemWithUserFavouriteAndCount[];
  item?: ItemWithUserAndFavourite;
  message?: string;
  error?: any;
  relatedItems?: Item[];
}

export interface PostResponseType {
  code: number;
  post?: PostWithUserAndFavouriteAndCount;
  posts?: PostWithUserAndFavouriteAndCount[];
  message?: string;
  error?: any;
  isLiked?: boolean;
}

export interface TimeFormatResponseType {
  unit: Intl.RelativeTimeFormatUnit;
  difference: number;
}

export interface RecordsResponseType {
  code: number;
  records: RecordWithItem[];
}

export interface ReviewResponseType {
  code: number;
  reviews: ReviewWithUser[];
}

export interface StreamsResponseType {
  code: number;
  streams: StreamWithUser[];
}

export interface LivechatResponseType {
  code: number;
  livechats: LivechatWithUser[];
}

export interface ChatroomResponseType {
  code: number;
  chatrooms: ChatroomWithUserAndMessage[];
}

export interface ChatResponseType {
  code: number;
  chats: ChatWithUser[];
}
