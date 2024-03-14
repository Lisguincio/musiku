"use client";
import AccountListItem from "@/components/Drawer/AccountListItem";
import Logo from "@/components/Logo/Logo";
import AccountButton from "@/components/auth/AccountButton";
import { Card } from "@/components/ui/card";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { navLinks } from "@/constants/nav";
import { cn } from "@/utils/utils";
import { LayoutDashboard, LucideIcon, Music } from "lucide-react";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Sidebar = () => {
  const session = useSession().data;
  return (
    <div className=" md:min-w-[250px] max-w-[280px] max-sm:max-w-[100px]  py-8 px-4 flex h-screen flex-col items-center  border  bg-background">
      <Link href={"/app"}>
        <Logo withText />
      </Link>
      <div className="w-full flex-1">
        <Card className="w-full  p-2 mt-8 flex ">
          <NavigationMenu data-orientation="vertical">
            <NavigationMenuList data-orientation="vertical">
              <TooltipProvider>
                {navLinks.map((link) => (
                  <Tooltip key={link.title}>
                    <TooltipTrigger>
                      <SidebarItem
                        href={link.path}
                        label={link.title}
                        Icon={link.icon}
                      />
                    </TooltipTrigger>
                    {link.tooltip && (
                      <TooltipContent
                        side="right"
                        className="flex items-center gap-4 sm:hidden"
                      >
                        {link.title}
                        {link.label && (
                          <span className="ml-auto text-muted-foreground">
                            {link.label}
                          </span>
                        )}
                      </TooltipContent>
                    )}
                  </Tooltip>
                ))}
              </TooltipProvider>
            </NavigationMenuList>
          </NavigationMenu>
        </Card>
      </div>
      <Card className=" flex items-center justify-center w-full px-2 py-2 ">
        <AccountButton session={session} classNames={"sm:hidden"} />
        <AccountListItem session={session} classNames={"max-sm:hidden"} />
      </Card>
    </div>
  );
};

const SidebarItem = ({
  Icon,
  label,
  href,
}: {
  Icon: LucideIcon;
  label: string;
  href: string;
}) => (
  <NavigationMenuItem>
    <Link href={href} legacyBehavior passHref>
      <NavigationMenuLink
        className={cn(
          navigationMenuTriggerStyle(),
          "w-auto sm:w-full px-2 sm:px-4"
        )}
      >
        <Icon className="size-6 md:size-6" />
        <span className={cn("max-sm:hidden ml-2")}>{label}</span>
      </NavigationMenuLink>
    </Link>
  </NavigationMenuItem>
);

export default Sidebar;
