"use client";
import { getLinks } from "@/actions/links/getLinks";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import React from "react";

const LinksList = () => {
  const { data, isError, error, isFetching } = useQuery({
    queryKey: ["links"],
    queryFn: () => getLinks(),
  });

  if (isFetching) return <Loader className="animate-spin" />;
  if (isError) return <div>Errore: {error.message}</div>;
  if (data?.result)
    return (
      <div>
        {data?.result?.map((link) => (
          <div id={link.id}>
            {link.title} - {link.author}
          </div>
        ))}
      </div>
    );
};

export default LinksList;
