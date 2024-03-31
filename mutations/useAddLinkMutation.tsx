import { addLink } from "@/actions/links/LinksActions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useAddLinkMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["links"],
    mutationFn: (value: FormData) => addLink(value),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["links"] });
      toast.success(`Link Aggiunto!`);
    },
  });

  return mutation;
};

export default useAddLinkMutation;
