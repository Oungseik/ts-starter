import { defineConfig } from "drizzle-kit";
import { Effect } from "effect";

import { config as C } from "./src/services/Config";

const config = Effect.gen(function* () {
  const { dbUrl: url, dialect } = yield* C;

  return defineConfig({
    schema: `./src/schemas/${dialect}/index.ts`,
    out: "./drizzle",
    dialect,
    dbCredentials: { url },
    verbose: true,
    strict: true,
  });
});

export default Effect.runSync(config);
