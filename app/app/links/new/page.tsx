import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusIcon } from "lucide-react";
import React from "react";
import NewLinkForm from "./NewLinkForm";

const Page = () => {
  return (
    <div>
      <div className="mb-4">
        <h1 className="text-xl font-bold ">Aggiungi un nuovo brano</h1>
      </div>
      <NewLinkForm />
      <Card className="w-full py-8">
        <CardContent>
          <form className="grid grid-cols-4">
            <Label htmlFor="picture">
              <div className="size-40 aspect-square rounded border flex justify-center items-center">
                <PlusIcon className="text-muted-foreground" />
              </div>
            </Label>
            <div className="col-span-3">
              <Input id="picture" type="file" hidden className="hidden" />
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Name of your project" />
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Deploy</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
