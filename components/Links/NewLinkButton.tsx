import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import NewLinkDialog from "./NewLinkForm";

const NewLinkButton = () => {
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
