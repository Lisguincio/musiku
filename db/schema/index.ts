import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { drizzle as DrizzlePG } from "drizzle-orm/postgres-js/driver";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

/* const migrationClient = postgres(process.env.DRIZZLE_DATABASE_URL!, { max: 1 });
migrate(DrizzlePG(migrationClient), {
  migrationsFolder: "drizzle",
}); */

const sql = neon<boolean, boolean>(process.env.DRIZZLE_DATABASE_URL!);
const db = drizzle(sql);

export default db;
