import * as SqliteDrizzle from "@effect/sql-drizzle/Sqlite";
import { SqliteClient } from "@effect/sql-sqlite-bun";
import * as D from "drizzle-orm/sqlite-core";
import { Config, Effect, Layer } from "effect";

// setup

const SqlLive = SqliteClient.layerConfig({
  filename: Config.string("SQLITE_URL"),
});
const DrizzleLive = SqliteDrizzle.layer.pipe(
  Layer.provide(SqlLive),
);

export const SqliteDbLive = Layer.mergeAll(SqlLive, DrizzleLive);

// usage

const users = D.sqliteTable("users", {
  id: D.integer("id").primaryKey({ autoIncrement: true }),
  name: D.text("name"),
});

let program = Effect.gen(function* () {
  const db = yield* SqliteDrizzle.SqliteDrizzle;
  yield* db.delete(users);
  yield* db.insert(users).values({ id: 1, name: "Alice" });
  const results = yield* db.select().from(users);
  console.log(results);
});

const runnable = program.pipe(
  Effect.provide(SqliteDbLive),
);

Effect.runPromise(runnable);
