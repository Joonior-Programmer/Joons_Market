import { prisma, PrismaClient } from "@prisma/client";

declare global {
  var client: PrismaClient | undefined;
}

const client = global.client ? global.client : new PrismaClient();

if (process.env.NODE_ENV === "development") global.client = client;

export default client as PrismaClient;
