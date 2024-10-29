import { Config, Effect as Ef } from "effect";

export const config = Ef.gen(function* () {
  return {
    host: yield* Config.string("HOST").pipe(Config.withDefault("127.0.0.1")),
    port: yield* Config.number("PORT").pipe(Config.withDefault(5000)),
  };
});
