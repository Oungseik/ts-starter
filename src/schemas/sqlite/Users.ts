import * as D from "drizzle-orm/sqlite-core";

export const users = D.sqliteTable("users", {
  id: D.integer("id").primaryKey({ autoIncrement: true }),
  name: D.text("name"),
});
