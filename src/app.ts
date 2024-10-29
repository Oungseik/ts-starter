import { Hono } from "hono";
import { Effect as Ef } from "effect";
import { config } from "./services/Config";
import { LoggerLive } from "./services/Logger";

const app = new Hono();

export const server = Ef.gen(function* () {
  const { port, host } = yield* config;

  yield* Ef.logDebug(`server is running at ${host}:${port}`);
  return { fetch: app.fetch, port };
}).pipe(Ef.annotateLogs({ file: "app.ts" }));

export default Ef.runSync(server.pipe(Ef.provide(LoggerLive)));
