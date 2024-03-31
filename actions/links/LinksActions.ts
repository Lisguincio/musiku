"use server";
import { getServerAuthSession } from "@/auth";
import prisma from "@/prisma/prismaClient";
import { storage } from "@/supabase/supaClient";
import { Prisma } from "@prisma/client";
import { randomUUID } from "crypto";

export async function getLinks() {
  //console.log("Ricevuta richiesta di tutti i link");
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

export async function addLink(data: FormData) {
  try {
    console.log(`Aggiunta di un link ricevuta!`);
    const session = await getServerAuthSession();
    if (!session) throw new Error("Utente non autenticato");

    const id = randomUUID();
    const title = data.get("title") as string;
    const author = data.get("author") as string;
    const coverImage = data.get("coverImage") as Blob;

    //Carico l'immagine su Supabase
    const { data: file, error } = await storage
      .from("main")
      .upload(`links/${id}.png`, coverImage as Blob);
    if (error) throw error;
    const url = storage.from("main").getPublicUrl(file?.path).data.publicUrl;

    //Salvo il link nel database
    return prisma.link.create({
      data: {
        id,
        title: title as string,
        author: author as string,
        coverImage: url,
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
    //Rimuovo l'immagine dallo storage
    const { data: file, error } = await storage
      .from("main")
      .remove([`links/${id}.png`]);
    if (error) throw error;

    //Rimuovo il link dal database
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
