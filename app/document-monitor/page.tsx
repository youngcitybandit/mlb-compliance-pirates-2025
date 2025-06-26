"use client"

import type React from "react"

import { useState } from "react"
import { FileText, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { DocumentChanges } from "@/components/document-changes"
import { PiratesLogo } from "@/components/pirates-logo" // Changed from CardinalsLogo

export default function DocumentMonitorPage() {
  const [isScanning, setIsScanning] = useState(false)

  const handleScan = () => {
    setIsScanning(true)
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false)
    }, 2000)
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Pirates Document Monitor" text="Track changes to MLB policy documents.">
        {" "}
        {/* Changed text */}
        <Button onClick={handleScan} disabled={isScanning}>
          <RefreshCw className={`mr-2 h-4 w-4 ${isScanning ? "animate-spin" : ""}`} />
          {isScanning ? "Scanning..." : "Scan for Changes"}
        </Button>
      </DashboardHeader>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <PiratesLogo className="h-8 w-8" /> {/* Changed to PiratesLogo */}
            <div>
              <CardTitle>Pirates Document Change Detection</CardTitle> {/* Changed text */}
              <CardDescription>Automatically detect changes in MLB policy documents.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-md border p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-medium">MLB Drug Prevention and Treatment Program</h3>
                </div>
                <Badge variant="outline">Last checked: 2 hours ago</Badge>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                System automatically scans for changes in the official MLB policy documents. When changes are detected,
                notifications are sent to all relevant Pirates team members. {/* Changed text */}
              </p>
            </div>

            <DocumentChanges />

            <div className="rounded-md border p-4 bg-muted/50">
              <h3 className="font-medium">How Document Monitoring Works</h3>
              <ul className="mt-2 space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="rounded-full bg-pirates-yellow text-pirates-black px-2 text-xs">1</span>{" "}
                  {/* Changed color */}
                  <span>System regularly checks the official MLB policy repository for updates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="rounded-full bg-pirates-yellow text-pirates-black px-2 text-xs">2</span>{" "}
                  {/* Changed color */}
                  <span>When changes are detected, the system compares the new document with the previous version</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="rounded-full bg-pirates-yellow text-pirates-black px-2 text-xs">3</span>{" "}
                  {/* Changed color */}
                  <span>Changes are highlighted and categorized by importance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="rounded-full bg-pirates-yellow text-pirates-black px-2 text-xs">4</span>{" "}
                  {/* Changed color */}
                  <span>Notifications are sent to all relevant Pirates team members based on their roles</span>{" "}
                  {/* Changed text */}
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardShell>
  )
}

function Badge({ children, variant }: { children: React.ReactNode; variant: string }) {
  const getVariantClass = () => {
    switch (variant) {
      case "outline":
        return "border bg-background hover:bg-muted/50 text-foreground"
      case "secondary":
        return "bg-secondary text-secondary-foreground hover:bg-secondary/80"
      case "destructive":
        return "bg-destructive text-destructive-foreground hover:bg-destructive/90"
      default:
        return "bg-primary text-primary-foreground hover:bg-primary/90"
    }
  }

  return (
    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${getVariantClass()}`}>
      {children}
    </span>
  )
}
