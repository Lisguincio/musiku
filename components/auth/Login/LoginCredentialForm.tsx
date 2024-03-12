"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().min(2).max(50),
  password: z.string().min(8).max(50),
});

const LoginCredentialForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    reValidateMode: "onSubmit",
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    if (!res) toast.error("Errore sconosciuto");
    if (res?.error) {
      toast.error(`${res?.status} - ${res?.error}`);
    }
    if (res?.ok) {
      router.replace("/");
      toast.success("Accesso effettuato");
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="relative w-full">
          Accedi
          {form.formState.isSubmitting && (
            <Loader2 className="absolute left-3 mr-auto size-4 animate-spin" />
          )}
        </Button>
      </form>
    </Form>
  );
};

export default LoginCredentialForm;
