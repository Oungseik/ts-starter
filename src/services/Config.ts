import { Context, Effect, Layer } from "effect";

export class Config extends Context.Tag("Config")<Config, {
  readonly getConfig: Effect.Effect<{
    connection: string;
  }>;
}>() {}

export const ConfigLive = Layer.succeed(Config, {
  getConfig: Effect.succeed({
    connection: "",
  }),
});

export const ConfigTest = Layer.succeed(Config, {
  getConfig: Effect.succeed({
    connection: "",
  }),
});
