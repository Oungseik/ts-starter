import { Effect as Ef, Context, Data, Record } from "effect";

export class TokenError extends Data.TaggedError("TokenError")<{ message: string }> {}

export class Token extends Context.Tag("TokenService")<
  Token,
  {
    readonly sign: <T extends Record<string, unknown>>(payload: T) => Ef.Effect<string, TokenError>;
    readonly verify: <T extends Record<string, unknown>>(token: string) => Ef.Effect<T, TokenError>;
  }
>() {}
