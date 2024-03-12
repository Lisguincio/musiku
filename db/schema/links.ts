import {
  boolean,
  json,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { users } from "./users";

export const links = pgTable("link", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  title: text("title").notNull(),
  content: text("content"),
  author: text("author").notNull(),
  ownerId: text("ownerId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  releaseDate: timestamp("releaseDate", { mode: "date" }),
  published: boolean("published").notNull().default(false),
  coverImage: text("coverImage"),
  links: json("links").array(),

  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow(),
});

export type NewUser = typeof users.$inferInsert;
