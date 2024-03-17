import { updateLink } from "@/actions/links/LinksActions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useTogglePublished = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["links", { id }],
    mutationFn: (value: boolean) => updateLink({ id, published: value }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["links"] });
      toast.success(`Link Aggiornato!`, {
        description: data.published
          ? `Il link ${data.title} è ora stato pubblicato!`
          : `Il link ${data.title} è stato nascosto!`,
      });
    },
  });

  return mutation;
};

export default useTogglePublished;
