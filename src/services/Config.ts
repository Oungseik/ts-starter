import dotenv from "dotenv";
import { Config, Effect as Ef } from "effect";

dotenv.config();

const dialects = ["sqlite", "mysql", "postgresql", "turso"] as const;

export const config = Ef.gen(function* () {
  return {
    socketioPort: yield* Config.number("SOCKET_IO_PORT").pipe(Config.withDefault(5050)),
    port: yield* Config.number("PORT").pipe(Config.withDefault(5000)),
    jwtKey: yield* Config.string("JWT_KEY"),
    jwtExpire: yield* Config.string("JWT_EXPIRE").pipe(Config.withDefault("7d")),
    dbUrl: yield* Config.string("DB_URL"),
    salt: yield* Config.string("SALT").pipe(Config.withDefault("D;%yL9TS:5PalS/d")),
    dialect: (yield* Config.string("DB_DIALECT").pipe(
      Config.validate({
        message: "expect DB_DIALECT to be one of 'sqlite', 'mysql', 'turso' or 'postgresql'",
        validation: (s) => dialects.includes(s as any),
      }),
    )) as (typeof dialects)[number],
  };
});
