"use client"

import { AlertCircle, FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function RecentUpdates() {
  const updates = [
    {
      id: "1",
      title: "MLB Drug Policy Update",
      date: "May 15, 2025",
      description: "Three new substances added to the banned list",
      type: "policy",
    },
    {
      id: "2",
      title: "Prohibited Substances List Updated",
      description: "Three new substance categories added to the prohibited list",
      date: "2025-01-15",
      type: "update"
    },
    {
      id: "3",
      title: "Testing Protocol Changes",
      description: "Updated testing procedures for hormone modulators",
      date: "2025-01-10",
      type: "alert"
    },
    {
      id: "4",
      title: "Supplement Warning",
      date: "May 5, 2025",
      description: "Contamination found in Brand X pre-workout",
      type: "alert",
    },
  ]

  return (
    <div className="space-y-4">
      {updates.map((update) => (
        <div key={update.id} className="flex items-start space-x-4 rounded-md border p-4">
          <div className="mt-0.5">
            {update.type === "policy" ? (
              <FileText className="h-5 w-5 text-muted-foreground" />
            ) : (
              <AlertCircle className="h-5 w-5 text-destructive" />
            )}
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium leading-none">{update.title}</p>
              {update.type === "alert" && (
                <Badge variant="destructive" className="text-xs">
                  Urgent
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{update.description}</p>
            <div className="flex items-center pt-2">
              <time className="text-xs text-muted-foreground">{update.date}</time>
              <Button variant="link" size="sm" className="h-auto p-0 pl-4">
                View Details
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
