import LoginCredentialForm from "@/components/auth/Login/LoginCredentialForm";
import OAuthLoginButton from "@/components/auth/OAuthLoginButton";
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
      <div className="min-w-[380px] border p-8 rounded-md flex flex-col items-center">
        <Image
          alt="Next.js logo"
          src={"/next.svg"}
          height={50}
          width={100}
          className="dark:invert"
        />
        <div className="flex mt-8 w-full justify-evenly ">
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
      </div>
    </div>
  );
};

export default page;
