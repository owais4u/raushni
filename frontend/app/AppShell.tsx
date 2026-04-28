"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import Header from "@/components/Layout/Header";
import Sidebar from "@/components/Layout/Sidebar";
import Footer from "@/components/Layout/Footer";

export default function AppShell({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <main className="mt-16 transition-all duration-300 lg:ml-72">{children}</main>

      <Footer />
    </div>
  );
}
