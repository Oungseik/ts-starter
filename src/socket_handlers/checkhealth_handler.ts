import { Effect as Ef } from "effect";
import { Server, Socket } from "socket.io";

import { LoggerLive } from "@/services/Logger";

interface ClientToServerDemoEvents {
  checkhealth: (time: string) => void;
}
interface ServerToClientDemoEvents {
  emitCheckHealth: (time: string) => void;
}

export function demoHandlers(
  _io: Server<ClientToServerDemoEvents, ServerToClientDemoEvents>,
  socket: Socket<ClientToServerDemoEvents, ServerToClientDemoEvents>,
) {
  socket.on("checkhealth", (time) => Ef.runSync(Ef.log(time).pipe(Ef.provide(LoggerLive))));
  socket.emit("emitCheckHealth", new Date().toISOString());
}
