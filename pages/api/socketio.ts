import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "@libs/modifiedTypes";
import { Server as ServerIO } from "socket.io";
import { Server as NetServer } from "http";
import prismaClient from "@libs/server/prismaClient";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  // It means that socket server was already initialised
  if (res.socket.server.io) {
    console.log("Already set up");
    res.end();
    return;
  }
  const httpServer: NetServer = res.socket.server as any;
  const io = new ServerIO(httpServer);
  res.socket.server.io = io;

  io.on("connect", (socket) => {
    socket.on("join", ({ roomNumber, sendUser, kind }) => {
      socket.join(`${kind}/${roomNumber}`);

      if (sendUser)
        socket.to(`${kind}/${roomNumber}`).emit("welcome", { sendUser });
    });

    socket.on("send", async ({ roomNumber, sendUser, message, kind }) => {
      console.log(socket.id);
      // Send message to the members inside the room
      socket.to(`${kind}/${roomNumber}`).emit("receive", { sendUser, message });
      // await prismaClient.livechat.create({
      //   data: {
      //     message,
      //     userId: sendUser.id,
      //     streamId: +roomNumber,
      //   },
      // });
    });

    socket.on("disconnect", (reason) => {
      socket.rooms.forEach((room) => socket.leave(room));
      console.log(`${socket.id} left the room because ${reason}`);
    });
  });

  console.log("Setting up socket");
  res.end();
};
