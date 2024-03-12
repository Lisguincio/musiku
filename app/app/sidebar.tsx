"use client";
import AccountListItem from "@/components/Drawer/AccountListItem";
import Logo from "@/components/Logo/Logo";
import { Card } from "@/components/ui/card";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
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
              <SidebarItem
                href="/app"
                label="Dashboard"
                icon={<LayoutDashboard />}
              />
              <SidebarItem href="/app/links" label="Links" icon={<Music />} />
            </NavigationMenuList>
          </NavigationMenu>
        </Card>
      </div>
      <Card className="w-full px-2 py-2">
        <AccountListItem session={session} />
      </Card>
    </div>
  );
};

const SidebarItem = ({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
}) => (
  <NavigationMenuItem>
    <Link href={href} legacyBehavior passHref>
      <NavigationMenuLink className={cn(navigationMenuTriggerStyle())}>
        {icon}
        <span className={cn("max-sm:hidden ml-2")}>{label}</span>
      </NavigationMenuLink>
    </Link>
  </NavigationMenuItem>
);

export default Sidebar;
