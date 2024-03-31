import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const NewLinkButton = () => {
  return (
    <Link href={"/app/links/new"}>
      <Button variant={"outline"} className="">
        <Plus className="size-4 mr-3" />
        Aggiungi Link
      </Button>
    </Link>
  );
};

export default NewLinkButton;
