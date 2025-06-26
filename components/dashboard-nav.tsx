"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  AlertCircle,
  Bell,
  FileText,
  Home,
  Settings,
  Shield,
  TrendingUp,
  UserRound,
  Users,
  TrendingDown,
  Tv,
  Plug,
  Receipt,
  Brain,
  Heart,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

const navItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    title: "Roster",
    href: "/roster",
    icon: UserRound,
  },
  {
    title: "Contract Assessments",
    href: "/contract-assessments",
    icon: FileText,
  },
  {
    title: "Contract Insurance",
    href: "/contract-insurance",
    icon: Shield,
  },
  {
    title: "Injured List",
    href: "/injuries",
    icon: AlertCircle,
  },
  {
    title: "Load Management",
    href: "/roster-management",
    icon: Brain,
  },
  {
    title: "Recovery Monitoring",
    href: "/recovery-monitoring",
    icon: Heart,
  },
  {
    title: "Statistical Analysis",
    href: "/statistical-analysis",
    icon: TrendingUp,
  },
  {
    title: "Statistical Analysis",
    href: "/statistical-analysis-down",
    icon: TrendingDown,
  },
  {
    title: "Substances",
    href: "/substances",
    icon: Shield,
  },
  {
    title: "Notifications",
    href: "/notifications",
    icon: Bell,
  },
  {
    title: "Team Members",
    href: "/team",
    icon: Users,
  },
  {
    title: "Recent Transactions",
    href: "/transactions",
    icon: Receipt,
  },
  {
    title: "Documents",
    href: "/documents",
    icon: FileText,
  },
  {
    title: "Alerts",
    href: "/alerts",
    icon: AlertCircle,
  },
  {
    title: "Live Gamefeed",
    href: "/live-gamefeed",
    icon: Tv,
  },
  {
    title: "Integrations",
    href: "/integrations",
    icon: Plug,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

interface NavProps extends React.HTMLAttributes<HTMLElement> {
  items?: {
    href: string
    title: string
    icon: React.ComponentType<{ className?: string }>
  }[]
}

export function DashboardNav({ className, items = navItems, ...props }: NavProps) {
  const pathname = usePathname()

  return (
    <nav className={cn("flex flex-col space-y-1", className)} {...props}>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href
              ? "bg-pirates-yellow text-pirates-black hover:bg-pirates-yellow/90 hover:text-pirates-black"
              : "hover:bg-pirates-black/50 hover:text-white",
            "justify-start",
          )}
        >
          <item.icon className="mr-2 h-4 w-4" />
          {item.title}
        </Link>
      ))}
    </nav>
  )
}
