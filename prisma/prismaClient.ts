import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type LinkCreate = Prisma.linkCreateInput;

export type { LinkCreate };

export default prisma;
