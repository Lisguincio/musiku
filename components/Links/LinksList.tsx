"use client";
import { deleteLink, getLinks } from "@/actions/links/LinksActions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Delete, Loader, Trash } from "lucide-react";
import { link } from "@prisma/client";
import React from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";

const LinksList = ({ links }: { links: link[] }) => {
  const queryClient = useQueryClient();
  const { data, isError, error, isFetching, isPlaceholderData } = useQuery({
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

  if (isFetching) return <Loader className="animate-spin" />;
  if (isError) return <div>Errore: {error.message}</div>;
  if (data)
    return (
      <div className="flex flex-col gap-2">
        {data?.map((link) => (
          <div key={link.id} className="w-full flex items-center bg-black  p-6">
            {link.title} - {link.author}
            <Button
              className="ml-auto"
              onClick={() => mutation.mutate(link.id)}
            >
              <Trash className="size-4" />
            </Button>
          </div>
        ))}
      </div>
    );
};

export default LinksList;
