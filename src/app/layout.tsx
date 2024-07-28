"use client"; // Add this directive

import { Inter } from "next/font/google";
import "./globals.css";
import { SidebarDemo } from "@/components/SidebarDemo";
import { usePathname } from "next/navigation"; // Import usePathname
// import { AuthProvider } from "./Providers";
import { SessionProvider } from "next-auth/react";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname(); // Use usePathname hook
  const hideSidebar = pathname === "/login" || pathname === "/register"; // Determine if the sidebar should be hidden

  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <AuthProvider> */}
        <SessionProvider>
            {/* {children} */}
        {hideSidebar ? children : <SidebarDemo>{children}</SidebarDemo>}
        </SessionProvider>
        {/* </AuthProvider> */}
      </body>
    </html>
  );
}
