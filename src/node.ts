import { serve } from "@hono/node-server";
import { Effect as Ef } from "effect";
import { Server } from "socket.io";

import app from "./app";
import { LoggerLive } from "./services/Logger";
import { demoHandlers } from "./socket_handlers";

const server = Ef.sync(() => serve(app)).pipe(
  Ef.map((server) => new Server(server, { path: "socket.io" })),
);

const wsServer = Ef.gen(function* () {
  const io = yield* server;

  io.on("error", (err) => Ef.runSync(Ef.logError(err).pipe(Ef.provide(LoggerLive))));
  io.on("connection", (socket) => {
    Ef.runSync(Ef.logDebug(`user connected. ID - ${socket.id}`).pipe(Ef.provide(LoggerLive)));

    demoHandlers(io, socket);
  });
});

Ef.runSync(wsServer);
