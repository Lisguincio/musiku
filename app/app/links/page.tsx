import NewLinkButton from "@/components/Links/NewLinkButton";
import db from "@/db/schema";
import { links as linksSchema } from "@/db/schema/links";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import React from "react";

const Page = async () => {
  const session = await getServerSession();

  const links = await db
    .select()
    .from(linksSchema)
    .where(eq(linksSchema.id, session!.user.id));

  console.log(links);

  return (
    <div>
      <NewLinkButton />
      <h1>Links</h1>
      <p>Links page content</p>
    </div>
  );
};

export default Page;
