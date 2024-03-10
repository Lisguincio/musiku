"use client";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/offcanvas";
import { Menu } from "lucide-react";
import { Session } from "next-auth";
import { Button } from "../ui/button";
import AccountListItem from "./AccountListItem";
import { DrawerClose } from "../ui/drawer";

const PublicDrawer = ({ session }: { session: Session | null }) => {
  return (
    <Drawer>
      <DrawerTrigger className="md:hidden" asChild>
        <Button variant="outline">
          <Menu />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="md:hidden">
        <DrawerHeader></DrawerHeader>
        <DrawerFooter>
          <AccountListItem session={session} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default PublicDrawer;
