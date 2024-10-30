import { Effect as Ef, Context, Data } from "effect";

export class HashingError extends Data.TaggedError("HashingError")<{ message: string }> {}

export class Hashing extends Context.Tag("HashingService")<
  Hashing,
  {
    readonly hash: (passwd: string) => Ef.Effect<string, HashingError>;
    readonly verify: (hash: string, passwd: string) => Ef.Effect<boolean, HashingError>;
  }
>() {}
