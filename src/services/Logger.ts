import { Context, Effect, Layer } from "effect";
import { pino } from "pino";

const p = pino();

class Logger extends Context.Tag("Logger")<Logger, {
  readonly info: (
    data: unknown,
    options?: Record<string, unknown>,
  ) => Effect.Effect<void>;
  readonly warn: (
    data: unknown,
    options?: Record<string, unknown>,
  ) => Effect.Effect<void>;
  readonly debug: (
    data: unknown,
    options?: Record<string, unknown>,
  ) => Effect.Effect<void>;
  readonly error: (
    data: unknown,
    options?: Record<string, unknown>,
  ) => Effect.Effect<void>;
  readonly trace: (
    data: unknown,
    options?: Record<string, unknown>,
  ) => Effect.Effect<void>;
  readonly fatal: (
    data: unknown,
    options?: Record<string, unknown>,
  ) => Effect.Effect<void>;
}>() {}

export const LoggerLive = Layer.succeed(Logger, {
  info(data, options) {
    let logger = options ? p.child(options) : p;
    logger.info(data);
    return Effect.void;
  },

  warn(data, options) {
    let logger = options ? p.child(options) : p;
    logger.warn(data);
    return Effect.void;
  },
  debug(data, options) {
    let logger = options ? p.child(options) : p;
    logger.debug(data);
    return Effect.void;
  },
  error(data, options) {
    let logger = options ? p.child(options) : p;
    logger.error(data);
    return Effect.void;
  },
  trace(data, options) {
    let logger = options ? p.child(options) : p;
    logger.trace(data);
    return Effect.void;
  },
  fatal(data, options) {
    let logger = options ? p.child(options) : p;
    logger.fatal(data);
    return Effect.void;
  },
});
