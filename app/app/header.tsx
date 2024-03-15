import Logo from "@/components/Logo/Logo";
import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/offcanvas";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

const AppHeader = () => {
  return (
    <header className="md:hidden p-4 flex items-center w-full">
      <Link href={"/app"}>
        <Logo withText className="flex-1" />
      </Link>
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="ghost" className="ml-auto">
            <MenuIcon />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">Ciao</div>
        </DrawerContent>
      </Drawer>
    </header>
  );
};

export default AppHeader;
