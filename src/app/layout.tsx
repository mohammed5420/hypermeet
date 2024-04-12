import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { cn } from "~/lib/utils"
import { TRPCReactProvider } from "~/trpc/react";
import { ClerkProvider } from "@clerk/nextjs";
import { NavBar } from "~/components/nav-bar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "HyperMeet",
  description: "The Next Generation of Video Conferencing",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cn(
          "dark text-foreground min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}>
          <NavBar />
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
