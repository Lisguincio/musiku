"use client";
import { getSession, signOut, useSession } from "next-auth/react";
import { Button, ButtonProps } from "../ui/button";
import { Session } from "next-auth";
import { toast } from "sonner";

const LogoutButton = ({
  session,
  ...props
}: { session: Session | null } & ButtonProps) => {
  if (!session) return;

  function handleLogout() {
    const promise = signOut();
    toast.promise(promise, {
      loading: "Uscita in corso",
      error: (e: Error) => e.message,
    });
  }

  if (session.user)
    return (
      <Button onClick={handleLogout} {...props}>
        Logout
      </Button>
    );
};

export default LogoutButton;
