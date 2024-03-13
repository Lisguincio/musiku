import Logo from "@/components/Logo/Logo";
import OAuthLoginButton from "@/components/auth/OAuthLoginButton";
import SignupForm from "@/components/auth/signup/SignupForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getServerSession } from "next-auth";
import { getProviders } from "next-auth/react";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerSession();
  const providers = await getProviders();
  if (session) redirect("/");

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <Logo className="mb-4" />
          <CardTitle>Iscriviti</CardTitle>
          <CardDescription>
            Iscriviti! È gratis e ti permette di condividere i tuoi progetti
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex w-full justify-evenly ">
            {providers &&
              Object.values(providers).map((provider) => {
                if (provider.type === "oauth")
                  return (
                    <OAuthLoginButton key={provider.name} provider={provider} />
                  );
              })}
          </div>

          <Separator className="my-6">oppure</Separator>

          {providers?.credentials && (
            <div className="w-full">
              <SignupForm />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  );
};

export default page;
