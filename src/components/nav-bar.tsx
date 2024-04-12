"use client"
import { UserButton } from "@clerk/nextjs"
import { Shell } from "lucide-react"
import Link from "next/link"
import * as React from "react"

export const NavBar: React.FC = () => {
  return (
    <header className="sticky top-0 flex justify-between h-16 items-center gap-4 border-b border-slate-200 dark:border-slate-800 bg-background px-4 md:px-6">
      <Link href="/" className="flex items-center gap-2 text-xl font-semibold text-foreground">
        <Shell className="w-6 h-6" />
        HyperMeet
      </Link>
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="#"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Home
        </Link>
        <Link
          href="#"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Rooms
        </Link>
        <Link
          href="#"
          className="text-foreground transition-colors hover:text-foreground"
        >
          Settings
        </Link>
        <UserButton />
      </nav>
    </header>)
}
