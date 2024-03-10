import Image from "next/image";
import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getServerSession();
  if (session?.user) redirect("/");
  return (
    <div className="w-full h-full justify-center flex items-center flex-col px-20 gap-2">
      <h1 className="text-2xl text-white font-bold">
        Please check your email!
      </h1>
      <p className="text-center">
        Ti abbiamo inviato una mail con un link per poter accedere al tuo
        account
      </p>
    </div>
  );
};

export default Page;
