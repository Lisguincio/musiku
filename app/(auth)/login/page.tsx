import Logo from "@/components/Logo/Logo";
import LoginCredentialForm from "@/components/auth/Login/LoginCredentialForm";
import OAuthLoginButton from "@/components/auth/OAuthLoginButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { getServerSession } from "next-auth";
import { getProviders } from "next-auth/react";
import Image from "next/image";
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
          <CardTitle>Accedi</CardTitle>
          <CardDescription>
            Accedi e inizia a condividere i tuoi progetti con il mondo
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

          {providers?.email && (
            <div className="w-full">
              <LoginCredentialForm />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  );
};

export default page;
