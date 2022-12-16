import { TimeFormatResponseType } from "./responseTypes";

export const createClassName = (...classNames: string[]) => {
  return classNames.join(" ");
};

export const createRandomString = (round: number = 0): string => {
  let result = "";
  for (let i = round + 1; i > 0; i--) {
    result = result + Math.random().toString(36).slice(2);
  }
  return result;
};

export const createImageUrl = (
  id: string,
  variant: "public" | "itemList" | "avatar" | "item"
): string => {
  return `https://imagedelivery.net/iwu4qL82BXIzHfWcF6-4SQ/${id}/${variant}`;
};

export const createTimeFormat = (time: Date): TimeFormatResponseType | null => {
  const response: TimeFormatResponseType = {
    difference: Math.abs(Number(time) - Number(new Date())),
    unit: "second",
  };
  if (response.difference > 1000 * 60 * 60 * 24 * 365) {
    response.difference /= 1000 * 60 * 60 * 24 * 365;
    response.unit = "years";
  } else if (response.difference > 1000 * 60 * 60 * 24 * 30) {
    response.difference /= 1000 * 60 * 60 * 24 * 30;
    response.unit = "months";
  } else if (response.difference > 1000 * 60 * 60 * 24) {
    response.difference /= 1000 * 60 * 60 * 24;
    response.unit = "days";
  } else if (response.difference > 1000 * 60 * 60) {
    response.difference /= 1000 * 60 * 60;
    response.unit = "hours";
  } else if (response.difference > 1000 * 60) {
    response.difference /= 1000 * 60;
    response.unit = "minutes";
  }
  if (response.unit === "second") return null;
  response.difference = Math.floor(response.difference) * -1;
  return response;
};
