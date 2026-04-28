"use client";

import { useEffect, useState } from "react";
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

  useEffect(() => {
    const syncDesktopState = () => {
      setSidebarOpen(window.innerWidth >= 1024);
    };
    syncDesktopState();
    window.addEventListener("resize", syncDesktopState);
    return () => window.removeEventListener("resize", syncDesktopState);
  }, []);

  return (
    <div className="min-h-screen">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <main
        className={`mt-28 transition-all duration-300 ${
          sidebarOpen ? "lg:ml-72" : "lg:ml-0"
        }`}
      >
        {children}
      </main>

      <div className={`transition-all duration-300 ${sidebarOpen ? "lg:ml-72" : "lg:ml-0"}`}>
        <Footer />
      </div>
    </div>
  );
}
