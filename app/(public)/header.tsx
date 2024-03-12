import PublicDrawer from "@/components/Drawer/PublicDrawer";
import Logo from "@/components/Logo/Logo";
import AccountButton from "@/components/auth/AccountButton";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { getServerSession } from "next-auth";
import Link from "next/link";

const PublicHeader = async () => {
  const session = await getServerSession();
  return (
    <div className="w-full min-h-16 border-b border-border  flex items-center px-10 py-4">
      <Link href="/">
        <Logo withText />
      </Link>
      <nav className="w-full flex-1 gap-8 flex justify-end">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem asChild>
              <Link href="/app" legacyBehavior passHref>
                <NavigationMenuLink>Dashboard</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <AccountButton session={session} />
      </nav>
      <PublicDrawer session={session} />
    </div>
  );
};

export default PublicHeader;
