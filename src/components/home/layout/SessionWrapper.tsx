// components/SessionWrapper.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { UserProvider } from "@/contexts/UserContext";

export default function SessionWrapper({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <UserProvider>
        {children}
      </UserProvider>
    </SessionProvider>
  );
}