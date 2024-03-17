"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useAddLinkMutation from "@/mutations/useAddLinkMutation";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  title: z.string(),
  /* coverImage: z
    .instanceof(File)
    .refine((file) => file.size < 1024 ** 5)
    .optional(), */
  author: z.string(),
});
type LinkType = z.infer<typeof formSchema>;

export function NewLinkForm() {
  // 1. Define your form.
  const mutation = useAddLinkMutation();
  const router = useRouter();
  const form = useForm<LinkType>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  // 2. Define a submit handler.
  function onSubmit(values: LinkType) {
    mutation.mutateAsync(values).then((val) => {
      router.replace("/app/links");
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex gap-2">
          <div className="">
            <FormField
              name="coverImage"
              render={({ field }) => (
                <FormItem className="w-40">
                  <FormLabel className="">Cover Image</FormLabel>
                  <FormLabel className="relative flex w-full h-full aspect-square justify-center items-center rounded-md border-dashed border">
                    {field.value ? (
                      <img
                        src={field.value}
                        alt="Cover Image"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <PlusIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    )}
                  </FormLabel>
                  <FormControl>
                    <Input className="hidden" type="file" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full space-y-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titolo</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Autore</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    {`Seleziona l'autore del brano`}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex justify-end ">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}

export default NewLinkForm;
