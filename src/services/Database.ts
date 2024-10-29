import * as SqliteDrizzle from "@effect/sql-drizzle/Sqlite";
import { SqliteClient } from "@effect/sql-sqlite-bun";
import { Effect, Layer } from "effect";

import { config } from "./Config";

const SqlLive = config.pipe(
  Effect.map((c) => SqliteClient.layer({ filename: c.dbUrl })),
  Layer.unwrapEffect,
);

const DrizzleLive = SqliteDrizzle.layer.pipe(Layer.provide(SqlLive));

export const SqliteDbLive = Layer.mergeAll(SqlLive, DrizzleLive);
