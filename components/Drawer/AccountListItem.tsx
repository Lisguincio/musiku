"use client";
import { capitalize, cn } from "@/utils/utils";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { ClassNameValue } from "tailwind-merge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const AccountListItem = ({
  session,
  classNames,
}: {
  session?: Session | null;
  classNames?: ClassNameValue;
}) => {
  if (!session) return null;
  return (
    <div className={cn("grid grid-cols-6 items-center ", classNames)}>
      <Avatar className="">
        <AvatarImage
          src={session.user?.image || undefined}
          width={20}
          height={20}
        />
        <AvatarFallback>
          {session.user?.email?.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col max-sm:hidden *:truncate justify-center pl-4 col-span-5">
        <Link href={"/profile"} className="font-semibold">
          {capitalize(session.user.name)}
        </Link>
        <span className="text-muted-foreground">{session.user.email}</span>
        <div className="flex">
          <button
            onClick={() => signOut()}
            className="text-destructive flex text-left"
          >
            Esci
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountListItem;
