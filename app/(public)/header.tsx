import PublicDrawer from "@/components/Drawer/PublicDrawer";
import Logo from "@/components/Logo/Logo";
import AccountButton from "@/components/auth/AccountButton";
import { getServerSession } from "next-auth";
import Link from "next/link";

const PublicHeader = async () => {
  const session = await getServerSession();
  return (
    <div className="w-full min-h-16 border-b border-border  flex items-center px-10 py-4">
      <Link href="/">
        <Logo withText />
      </Link>
      <nav className="w-full flex-1 flex justify-end">
        <AccountButton session={session} />
        {<PublicDrawer session={session} />}
      </nav>
    </div>
  );
};

export default PublicHeader;
