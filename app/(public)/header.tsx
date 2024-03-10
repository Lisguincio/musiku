import React from "react";
import { getServerSession } from "next-auth";
import Image from "next/image";
import LogoutButton from "@/components/auth/LogoutButton";
import { Button } from "@/components/ui/button";
import AccountButton from "@/components/auth/AccountButton";
import Link from "next/link";

const PublicHeader = async () => {
  const session = await getServerSession();
  return (
    <div className="w-full min-h-16 border-b border-border  flex items-center px-10">
      <Link href={"/"}>
        <Image
          src={"/next.svg"}
          alt="Next.js Logo"
          className="dark:invert"
          width={100}
          height={100}
        />
      </Link>
      <nav className="w-full flex-1 flex justify-end">
        <AccountButton session={session} />
      </nav>
    </div>
  );
};

export default PublicHeader;
