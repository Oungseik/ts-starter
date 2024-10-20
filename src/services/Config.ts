import { Context, Effect, Layer } from "effect";

export class Config extends Context.Tag("Config")<Config, {
  readonly getConfig: Effect.Effect<{
    connection: string;
    port: number;
  }>;
}>() {}

export const ConfigLive = Layer.succeed(Config, {
  getConfig: Effect.succeed({
    connection: "",
    port: 5000,
  }),
});

export const ConfigTest = Layer.succeed(Config, {
  getConfig: Effect.succeed({
    connection: "",
    port: 5000,
  }),
});
