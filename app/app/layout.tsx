import React from "react";
import AppHeader from "./header";
import Sidebar from "./sidebar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession();
  //if (!session) redirect("/login");

  return (
    <div className="flex">
      <Sidebar />
      <main className="p-12">{children}</main>
    </div>
  );
};

export default layout;
