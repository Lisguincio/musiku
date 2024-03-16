"use client";
import { getLinks } from "@/actions/links/LinksActions";
import { type link as LinkType } from "@prisma/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { DataTable } from "../Table/DataTable";
import columns from "./columns";

const LinksList = ({ links }: { links: LinkType[] }) => {
  const queryClient = useQueryClient();
  const { data, isError, error } = useQuery({
    queryKey: ["links"],
    queryFn: () => getLinks(),
    initialData: links,
  });


  if (isError) return <div>Errore: {error.message}</div>;
  if (data)
    return (
      <div>
        <DataTable columns={columns} data={data} />
      </div>
    );
};

export default LinksList;
