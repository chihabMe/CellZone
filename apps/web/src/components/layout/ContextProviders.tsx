"use client";
import { UiProvider } from "@/context/uiContext";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { SessionProvider } from "next-auth/react";

export const queryClient = new QueryClient();
const ContextProviders = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <UiProvider>{children}</UiProvider>
        </SessionProvider>
      </QueryClientProvider>
    </>
  );
};

export default ContextProviders;
