import { Context, Data, Effect as Ef, Layer } from "effect";
import jwt, { type JwtPayload } from "jsonwebtoken";

import { config } from "./Config";

export class JwtError extends Data.TaggedError("JwtError")<{ message: string }> {}

export class Jwt extends Context.Tag("JwtService")<
  Jwt,
  {
    readonly sign: <T extends Record<string, unknown>>(payload: T) => Ef.Effect<string, JwtError>;
    readonly verify: (token: string) => Ef.Effect<JwtPayload, JwtError>;
  }
>() {}

export const JwtLive = Layer.effect(
  Jwt,
  Ef.gen(function* () {
    const { jwtKey, jwtExpire } = yield* config;

    return {
      sign: (payload) =>
        Ef.try(() => jwt.sign(payload, jwtKey, { expiresIn: jwtExpire })).pipe(
          Ef.catchAll(() => new JwtError({ message: "error occured while signing token" })),
        ),
      verify: (token: string) =>
        Ef.try(() => jwt.verify(token, jwtKey)).pipe(
          Ef.flatMap((payload) =>
            typeof payload === "object"
              ? Ef.succeed(payload)
              : new JwtError({ message: "Expect payload to be 'object', got 'string'" }),
          ),
          Ef.catchTags({
            JwtError: (_) => _,
            UnknownException: () =>
              new JwtError({ message: "unexpected error occured while verifying token" }),
          }),
        ),
    };
  }),
);
