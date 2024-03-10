import React from "react";
import AppHeader from "./header";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AppHeader />
      {children}
    </div>
  );
};

export default layout;
