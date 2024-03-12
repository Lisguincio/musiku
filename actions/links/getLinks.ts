"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/prisma/prismaClient";
import { Prisma, link } from "@prisma/client";
import { getServerSession } from "next-auth";

export async function getLinks() {
  console.log("Richiesta di links ricevuta!");
  const session = await getServerSession();
  if (!session) throw new Error("Utente non autenticato");
  const result = await prisma.link.findMany({
    where: {
      user: session.user.id,
    },
    include: {
      user: {
        select: {
          _count: {
            select: {
              link: {
                where: {
                  user: session.user.id,
                },
              },
            },
          },
        },
      },
    },
  });

  return result;
}

export async function addLink({
  ...others
}: Omit<Prisma.linkCreateInput, "user">) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Utente non autenticato");
  console.log(session.user.id);
  console.log("Aggiunta di un link ricevuta!");
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
}
