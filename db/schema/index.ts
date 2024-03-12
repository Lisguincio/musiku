import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const sql = neon<boolean, boolean>(process.env.DRIZZLE_DATABASE_URL!);
const db = drizzle(sql);

export default db;
