import { getServerSession } from "next-auth";
import { getProviders } from "next-auth/react";
import React from "react";
import { redirect } from "next/navigation";
import OAuthLoginButton from "@/components/auth/OAuthLoginButton";
import { z } from "zod";
import LoginCredentialForm from "@/components/auth/Login/LoginCredentialForm";
import Image from "next/image";
import Divider from "@/components/ui/divider";
import SignupForm from "@/components/auth/signup/SignupForm";

const page = async () => {
  const session = await getServerSession();
  const providers = await getProviders();
  if (session) redirect("/");

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="min-w-[380px] border p-8 rounded-md flex flex-col items-center space-y-4">
        <Image
          alt="Next.js logo"
          src={"/next.svg"}
          height={50}
          width={100}
          className="dark:invert"
        />
        {providers?.email && (
          <div className="w-full">
            <SignupForm />
          </div>
        )}
        <Divider
          orientation={"horizontal"}
          className="my-8"
          text={
            <span className="text-stone-400 px-4 bg-background">Oppure</span>
          }
        />
        <div className="flex w-full h-full justify-evenly">
          {providers &&
            Object.values(providers).map((provider) => {
              if (provider.type === "oauth")
                return (
                  <OAuthLoginButton key={provider.name} provider={provider} />
                );
            })}
        </div>
      </div>
    </div>
  );
};

export default page;
