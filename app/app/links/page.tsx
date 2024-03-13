"use client";
import { getLinks } from "@/actions/links/getLinks";
import LinksList from "@/components/Links/LinksList";
import NewLinkButton from "@/components/Links/NewLinkButton";
import { useQuery } from "@tanstack/react-query";

const Page = () => {
  return (
    <div>
      <NewLinkButton />

      <LinksList />
    </div>
  );
};

export default Page;
