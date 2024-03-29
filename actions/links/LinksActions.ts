"use server";
import { getServerAuthSession } from "@/auth";
import prisma from "@/prisma/prismaClient";
import { Prisma } from "@prisma/client";

export async function getLinks() {
  console.log("Ricevuta richiesta di tutti i link");
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
    return result;
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
export async function deleteLink(id: string) {
  try {
    console.log(`Rimozione di un link[${id}] ricevuta!`);
    const session = await getServerAuthSession();
    if (!session) throw new Error("Utente non autenticato");
    return prisma.link.delete({
      where: {
        id,
      },
    });
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function updateLink({
  id,
  ...others
}: { id: string } & Omit<Prisma.linkUpdateInput, "user" | "id">) {
  try {
    console.log(`Aggiornamento di un link[${id}] ricevuta!`);
    const session = await getServerAuthSession();
    if (!session) throw new Error("Utente non autenticato");
    return prisma.link.update({
      where: {
        id,
      },
      data: others,
    });
  } catch (e) {
    console.error(e);
    throw e;
  }
}
