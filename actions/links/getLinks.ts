"use server";

import db from "@/db/schema";
import { NewUser, links } from "@/db/schema/links";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";

export default async function getLinks() {
  console.log("Richiesta di links ricevuta!");
  const session = await getServerSession();
  if (!session) return null;
  const result = await db
    .select()
    .from(links)
    .where(eq(links.id, session.user.id));
  return result;
}

export async function addLink(link: NewUser) {
  console.log("Aggiunta di un link ricevuta!");
  const result = await db.insert(links).values(link);
  return result;
}
