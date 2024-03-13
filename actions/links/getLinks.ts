"use server";

import { getServerAuthSession } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/prisma/prismaClient";
import { Prisma } from "@prisma/client";

export async function getLinks() {
  console.log("Richiesta di links ricevuta!");
  const session = await getServerAuthSession();
  if (!session) throw new Error("Utente non autenticato");
  try {
    const result = await prisma.link.findMany({
      where: {
        user: {
          id: session.user.id,
        },
      },
    });
    return { result };
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function addLink({
  ...others
}: Omit<Prisma.linkCreateInput, "user">) {
  try {
    console.log(`Aggiunta di un link ricevuta!`);
    const session = await getServerAuthSession();
    if (!session) throw new Error("Utente non autenticato");
    return prisma.link.create({
      data: {
        ...others,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });
  } catch (e) {
    console.error(e);
    throw e;
  }
}