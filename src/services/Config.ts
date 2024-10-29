import dotenv from "dotenv";
import { Config, Effect as Ef } from "effect";

dotenv.config();

const dialects = ["sqlite", "mysql", "postgresql", "turso"] as const;

export const config = Ef.gen(function* () {
  return {
    host: yield* Config.string("HOST").pipe(Config.withDefault("127.0.0.1")),
    port: yield* Config.number("PORT").pipe(Config.withDefault(5000)),
    dbUrl: yield* Config.string("DB_URL"),
    dialect: (yield* Config.string("DB_DIALECT").pipe(
      Config.validate({
        message: "expect DB_DIALECT to be one of 'sqlite', 'mysql', 'turso' or 'postgresql'",
        validation: (s) => dialects.includes(s as any),
      }),
    )) as (typeof dialects)[number],
  };
});
