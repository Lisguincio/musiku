import { Prisma, PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

type LinkCreate = Prisma.linkCreateInput;
export type { LinkCreate };
export type { link, provider, user } from "@prisma/client";

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;