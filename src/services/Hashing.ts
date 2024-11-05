import { hash, verify } from "argon2";
import bcrypt from "bcrypt";
import { Context, Data, Effect as Ef, Layer } from "effect";

import { config } from "./Config";

export class HashingError extends Data.TaggedError("HashingError")<{ message: string }> {}
export class HashNotMatchError extends Data.TaggedError("HashNotMatchError")<{ message: string }> {}

export class Hashing extends Context.Tag("HashingService")<
  Hashing,
  {
    readonly hash: (passwd: string) => Ef.Effect<string, HashingError>;
    readonly verify: (
      hash: string,
      passwd: string,
    ) => Ef.Effect<true, HashingError | HashNotMatchError>;
  }
>() {}

export const Argon2HashingLive = Layer.effect(
  Hashing,
  Ef.gen(function* () {
    return {
      verify: (hash, passwd) =>
        Ef.tryPromise(() => verify(hash, passwd)).pipe(
          Ef.if({
            onTrue: () => Ef.succeed(true as const),
            onFalse: () => new HashNotMatchError({ message: "password does not match" }),
          }),
          Ef.catchTag("UnknownException", (e) => new HashingError({ message: e.message })),
        ),

      hash: (passwd) =>
        Ef.tryPromise(() => hash(passwd)).pipe(
          Ef.catchTag("UnknownException", (e) => new HashingError({ message: e.message })),
        ),
    };
  }),
);

export const BcryptHashingLive = Layer.effect(
  Hashing,
  Ef.gen(function* () {
    const c = yield* config;

    return {
      verify: (hash, passwd) =>
        Ef.tryPromise(() => bcrypt.compare(passwd, hash)).pipe(
          Ef.if({
            onTrue: () => Ef.succeed(true as const),
            onFalse: () => new HashNotMatchError({ message: "password does not match" }),
          }),
          Ef.catchTag("UnknownException", (e) => new HashingError({ message: e.message })),
        ),

      hash: (passwd) =>
        Ef.tryPromise(() => bcrypt.hash(passwd, c.salt)).pipe(
          Ef.catchTag("UnknownException", (e) => new HashingError({ message: e.message })),
        ),
    };
  }),
);
