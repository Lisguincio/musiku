"use client";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import React from "react";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="dark">
        {children}
        <Toaster visibleToasts={5} position="bottom-right" />
      </ThemeProvider>
    </SessionProvider>
  );
};

export default Providers;
