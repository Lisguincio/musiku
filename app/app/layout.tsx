import { getServerAuthSession } from "@/auth";
import React from "react";
import Sidebar from "./sidebar";

const layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="p-12 w-full">{children}</main>
    </div>
  );
};

export default layout;
