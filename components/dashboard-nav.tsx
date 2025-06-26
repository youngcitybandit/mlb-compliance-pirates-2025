"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
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
  ChevronDown,
  ChevronRight,
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
    title: "Contracts",
    icon: FileText,
    children: [
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
    ],
  },
  {
    title: "Team Management",
    icon: Users,
    children: [
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
    ],
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
  items?: any[]
}

export function DashboardNav({ className, items = navItems, ...props }: NavProps) {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpanded = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    )
  }

  const isActive = (href: string) => pathname === href
  const isChildActive = (children: any[]) => children.some(child => isActive(child.href))

  return (
    <nav className={cn("flex flex-col space-y-1", className)} {...props}>
      {items.map((item) => {
        if (item.children) {
          const isExpanded = expandedItems.includes(item.title)
          const hasActiveChild = isChildActive(item.children)
          
          return (
            <div key={item.title}>
              <button
                onClick={() => toggleExpanded(item.title)}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  hasActiveChild
                    ? "bg-pirates-yellow text-pirates-black hover:bg-pirates-yellow/90 hover:text-pirates-black"
                    : "hover:bg-pirates-black/50 hover:text-white",
                  "justify-between w-full",
                )}
              >
                <div className="flex items-center">
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </div>
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
              {isExpanded && (
                <div className="ml-6 mt-1 space-y-1">
                  {item.children.map((child: any) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={cn(
                        buttonVariants({ variant: "ghost" }),
                        isActive(child.href)
                          ? "bg-pirates-yellow text-pirates-black hover:bg-pirates-yellow/90 hover:text-pirates-black"
                          : "hover:bg-pirates-black/50 hover:text-white",
                        "justify-start text-sm",
                      )}
                    >
                      <child.icon className="mr-2 h-3 w-3" />
                      {child.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              isActive(item.href)
                ? "bg-pirates-yellow text-pirates-black hover:bg-pirates-yellow/90 hover:text-pirates-black"
                : "hover:bg-pirates-black/50 hover:text-white",
              "justify-start",
            )}
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.title}
          </Link>
        )
      })}
    </nav>
  )
}
