"use client";

import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";
import { LocaleProvider } from "@/lib/i18n/LocaleProvider";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider refetchInterval={5 * 60}>
      <LocaleProvider>{children}</LocaleProvider>
    </SessionProvider>
  );
}
