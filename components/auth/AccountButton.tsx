"use client";
import { Session } from "next-auth";
import React from "react";
import { signIn, signOut } from "next-auth/react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import { LogOut, User } from "lucide-react";
import Link from "next/link";
import { capitalize, cn } from "@/utils/utils";
import { ClassNameValue } from "tailwind-merge";

const AccountButton = ({
  session,
  classNames,
}: {
  session: Session | null;
  classNames?: ClassNameValue;
}) => {
  if (session) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild className={cn("", classNames)}>
          <Avatar>
            <AvatarImage src={session.user?.image || undefined} />
            <AvatarFallback>
              {session.user?.email?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>
            <div className="flex flex-col">
              <span>{capitalize(session.user.name)}</span>
              <span className="font-normal text-muted-foreground">
                {session.user?.email}
              </span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href={"/profile"}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => signOut()}
              className="text-red-600 font-bold cursor-pointer"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <button onClick={() => signOut()}>Logout</button>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  return <Button onClick={() => signIn()}>Login</Button>;
};

export default AccountButton;
