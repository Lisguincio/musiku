"use client";
import { deleteLink, getLinks } from "@/actions/links/LinksActions";
import { type link as LinkType } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { DataTable } from "../Table/DataTable";
import columns from "./columns";

const LinksList = ({ links }: { links: LinkType[] }) => {
  const queryClient = useQueryClient();
  const { data, isError, error } = useQuery({
    queryKey: ["links"],
    queryFn: () => getLinks(),
    initialData: links,
  });

  const mutation = useMutation({
    mutationFn: (id: string) => deleteLink(id),
    onSuccess: () => {
      toast.success("Link rimosso con successo!");
      queryClient.invalidateQueries({ queryKey: ["links"] });
    },
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
