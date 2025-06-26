"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { PiratesLogo } from "@/components/pirates-logo"

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6 justify-start flex-shrink-0 w-[160px]", className)} {...props}>
      <Link href="/" className="flex flex-row items-center gap-2 min-w-0 flex-shrink-0">
        <PiratesLogo className="h-6 w-6 flex-shrink-0" />
        <span className="font-bold text-pirates-yellow flex-shrink-0">Pirates</span>
      </Link>
    </nav>
  )
}
