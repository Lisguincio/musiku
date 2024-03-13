"use client";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { QueryClient } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { Toaster } from "sonner";
import { UseQueryProvider } from "./useQuery";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <UseQueryProvider>
      <SessionProvider>
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
          <Toaster visibleToasts={5} position="bottom-right" />
        </ThemeProvider>
      </SessionProvider>
    </UseQueryProvider>
  );
};

export default Providers;
