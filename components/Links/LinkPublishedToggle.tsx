"use client";
import useTogglePublished from "@/mutations/useTogglePublished";
import { link } from "@prisma/client";
import React from "react";
import { Switch } from "../ui/switch";

const LinkPublishedToggle = ({ link }: { link: link }) => {
  const mutation = useTogglePublished({
    id: link.id,
  });

  return (
    <Switch
      checked={link.published}
      onCheckedChange={() => mutation.mutate(!link.published)}
    />
  );
};

export default LinkPublishedToggle;
