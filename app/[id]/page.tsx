import { getLink } from "@/actions/links/LinksActions";
import React from "react";

const Page = async ({ params }: { params: { id: string } }) => {
  const link = await getLink(params.id);
  return <div>{link?.title}</div>;
};

export default Page;
