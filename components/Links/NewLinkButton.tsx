"use client";
import React from "react";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { Plus } from "lucide-react";
import NewLinkDialog from "./NewLinkForm";

const NewLinkButton = () => {
  const session = useSession();

  return (
    <NewLinkDialog
      trigger={
        <Button variant={"outline"}>
          <Plus className="size-4 mr-3" />
          Aggiungi Link
        </Button>
      }
    />
  );
};

export default NewLinkButton;
