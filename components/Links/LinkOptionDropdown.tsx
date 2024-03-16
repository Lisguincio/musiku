"use client";
import { deleteLink } from "@/actions/links/LinksActions";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { link } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ClipboardCopy, LinkIcon, MoreVertical, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const LinkOptionDropdown = ({ link }: { link: link }) => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  function copyToClipboard() {
    const navigator = window.navigator as Navigator;
    navigator.clipboard.writeText(link.id).then(() => {
      toast.success("Link copiato negli appunti");
      setIsOpen(false);
    });
  }

  const mutation = useMutation({
    mutationKey: ["link"],
    mutationFn: (id: string) => deleteLink(id),

    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: ["links"] });
      toast.success("Link eliminato con successo");
    },
    onSettled: () => {
      setIsOpen(false);
    },
  });

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="aspect-square size-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex justify-end px-1 space-x-1 *:size-8 *:p-2">
          <Button
            variant="outline"
            title="Remove"
            onClick={() => mutation.mutate(link.id)}
          >
            <Trash2 className="size-4" />
            <span className="sr-only">Rimuovi</span>
          </Button>
          <Button
            variant="outline"
            title="Remove"
            onClick={() => copyToClipboard}
          >
            <LinkIcon />
            <span className="sr-only">Rimuovi</span>
          </Button>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Yo</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>View customer</DropdownMenuItem>
        <DropdownMenuItem>View payment details</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LinkOptionDropdown;
