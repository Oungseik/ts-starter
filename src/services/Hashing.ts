import { Context, Data, Effect as Ef, Layer } from "effect";
import { hash, verify } from "argon2";

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

export const HashingLive = Layer.effect(
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
