import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { DashboardNav } from "@/components/dashboard-nav"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { PiratesLogo } from "@/components/pirates-logo"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MLB Compliance Dashboard",
  description: "Monitor compliance and stay compliant with MLB regulations",
  keywords: ["MLB", "compliance", "baseball", "regulations", "monitoring"],
  authors: [{ name: "MLB Compliance Team" }],
  creator: "MLB Compliance Team",
  publisher: "MLB",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://mlb-compliance.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "MLB Compliance Dashboard",
    description: "Monitor compliance and stay compliant with MLB regulations",
    url: "https://mlb-compliance.com",
    siteName: "MLB Compliance",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MLB Compliance Dashboard",
    description: "Monitor compliance and stay compliant with MLB regulations",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SidebarProvider>
            <div className="flex min-h-screen flex-col">
              <header className="sticky top-0 z-40 border-b bg-black text-white">
                <div className="max-w-7xl mx-auto flex h-16 items-center justify-between py-4 px-4 lg:px-6">
                  <div className="flex items-center gap-4 min-w-0 flex-shrink-0 w-[200px]">
                    <SidebarTrigger className="lg:hidden" /> {/* Visible only on small screens */}
                    <MainNav className="hidden lg:flex flex-shrink-0" /> {/* Pirates logo on the LEFT */}
                  </div>
                  <div className="flex items-center flex-shrink-0">
                    <UserNav />
                  </div>
                </div>
              </header>
              <div className="flex-1 items-start lg:grid lg:grid-cols-[280px_1fr]">
                {" "}
                {/* Adjust grid for desktop with fixed sidebar width */}
                <Sidebar className="hidden lg:block w-[280px]">
                  {" "}
                  {/* Hidden on small screens with fixed width */}
                  <SidebarHeader className="flex flex-row items-center gap-2 h-14 px-6 border-b min-w-0 flex-shrink-0 w-full">
                    <PiratesLogo className="h-8 w-8 flex-shrink-0" />
                    <span className="font-bold text-pirates-yellow flex-shrink-0">Pirates</span>
                  </SidebarHeader>
                  <SidebarContent>
                    <DashboardNav className="px-4 py-2" />
                  </SidebarContent>
                  <SidebarFooter className="border-t p-4">
                    <p className="text-xs text-muted-foreground">Last policy update: May 15, 2025</p>
                  </SidebarFooter>
                </Sidebar>
                <main className="flex w-full flex-1 flex-col overflow-hidden">
                  {" "}
                  {/* Added main tag and overflow */}
                  <div className="max-w-7xl mx-auto py-6 px-4 lg:px-6">{children}</div>
                </main>
              </div>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
