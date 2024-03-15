import React from "react";
import Sidebar from "./sidebar";
import AppHeader from "./header";

const layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AppHeader />
      <div className="md:flex">
        <Sidebar />
        <main className=" p-4 w-full">{children}</main>
      </div>
    </div>
  );
};

export default layout;
