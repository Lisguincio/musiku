"use client";
import { addLink } from "@/actions/links/getLinks";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { toast } from "sonner";

const formSchema = z.object({
  author: z.string(),
  title: z.string(),
});

export function NewLinkDialog({ trigger }: { trigger: React.ReactNode }) {
  const queryClient = useQueryClient();
  const [open, setOpen] = React.useState(false);
  const mutation = useMutation({
    mutationKey: ["links"],
    mutationFn: addLink,
    onSuccess: () => {
      toast.success("Link added");
      queryClient.invalidateQueries({ queryKey: ["links"] });
    },
    onSettled: () => {
      setOpen(false);
    },
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      author: "",
      title: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    mutation.mutate(values);
    if (mutation.isSuccess) {
      setOpen(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Aggiungi un nuovo link</DialogTitle>
          <DialogDescription>
            Utilizza questo form per aggiungere un nuovo link al tuo profilo.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id="newLinkForm"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default NewLinkDialog;
