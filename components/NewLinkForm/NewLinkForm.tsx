"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm, useFormContext } from "react-hook-form";
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
import { Loader, Loader2, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { storage } from "@/supabase/supaClient";
import LinkUrlList from "./UrlList";
import { Prisma, provider } from "@prisma/client";

const formSchema = z.object({
  title: z.string(),
  coverImage: z.instanceof(Blob).optional(),
  author: z.string(),
  urls: z.array(
    z.object({
      id: z.number(),
      icon: z.string().optional(),
      provider: z.string(),
      url: z.string(),
      buttonText: z.string().optional().default("Ascolta"),
    })
  ),
});
export type LinkType = z.infer<typeof formSchema>;

export function NewLinkForm({ providers }: { providers: provider[] }) {
  const router = useRouter();
  const mutation = useAddLinkMutation();
  const form = useForm<LinkType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
      urls: providers.map((provider, index) => ({
        id: index,
        provider: provider.name,
        icon: provider.icon,
        url: "",
      })),
    },
  });

  const onSubmit = async (values: LinkType) => {
    console.log(values);
    const data = new FormData();
    data.append("title", values.title);
    data.append("author", values.author);
    if (values.coverImage) data.append("coverImage", values.coverImage);
    values.urls.forEach((url, index) => {
      data.append(`urls[]`, JSON.stringify(url));
    });
    await mutation.mutateAsync(data);
    router.replace("/app/links");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex gap-2">
          <div className="">
            <FormField
              name="coverImage"
              render={({ field: { onChange, value, ...other } }) => (
                <FormItem className="w-40">
                  <FormLabel className="">Cover Image</FormLabel>
                  <FormLabel className="relative flex w-full h-full aspect-square justify-center items-center rounded-md border-dashed border">
                    {value ? (
                      <img
                        src={URL.createObjectURL(value)}
                        alt="Cover Image"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <PlusIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    )}
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="hidden"
                      type="file"
                      {...other}
                      onChange={(event) => {
                        const file = event.target.files?.item(0);
                        if (!file) return null;
                        onChange(file);
                      }}
                    />
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
        <LinkUrlList />
        <div className="flex justify-end ">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            Aggiungi
            {form.formState.isSubmitting && (
              <Loader2 className=" size-4 ml-4 animate-spin" />
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default NewLinkForm;
