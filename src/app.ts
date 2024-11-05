import { Effect as Ef } from "effect";
import { Hono } from "hono";

import { config } from "./services/Config";
import { LoggerLive } from "./services/Logger";

const app = new Hono();

export const server = Ef.gen(function* () {
  const { port } = yield* config;

  yield* Ef.log(`server is running at http://localhost:${port}`);
  return { fetch: app.fetch, port };
}).pipe(Ef.annotateLogs({ file: "app.ts" }));

export default Ef.runSync(server.pipe(Ef.provide(LoggerLive)));
