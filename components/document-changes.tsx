"use client"

import { AlertCircle, FileText, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function DocumentChanges() {
  const changes = [
    {
      id: "1",
      document: "MLB Drug Prevention and Treatment Program 2025",
      date: "May 15, 2025",
      changes: [
        {
          type: "addition",
          description: "Added S-23 to the list of prohibited SARMs",
          severity: "high",
        },
        {
          type: "addition",
          description: "Added Ibutamoren (MK-677) to the list of prohibited Growth Hormone Secretagogues",
          severity: "high",
        },
        {
          type: "addition",
          description: "Added Cardarine (GW501516) to the list of prohibited PPAR Agonists",
          severity: "high",
        },
      ],
    },
    {
      id: "2",
      document: "Cardinals Testing Procedures Manual 2025",
      date: "March 20, 2025",
      changes: [
        {
          type: "modification",
          description: "Updated off-season testing protocols for Cardinals players",
          severity: "medium",
        },
        {
          type: "modification",
          description: "Changed notification period for random testing from 24 hours to 12 hours",
          severity: "medium",
        },
      ],
    },
  ]

  return (
    <div className="space-y-4">
      {changes.map((change) => (
        <div key={change.id} className="rounded-md border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <h3 className="font-medium">{change.document}</h3>
            </div>
            <span className="text-sm text-muted-foreground">{change.date}</span>
          </div>
          <div className="mt-4 space-y-3">
            {change.changes.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                {item.type === "addition" ? (
                  <Plus className="mt-0.5 h-4 w-4 text-green-500" />
                ) : (
                  <AlertCircle className="mt-0.5 h-4 w-4 text-amber-500" />
                )}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm">{item.description}</p>
                    <Badge
                      variant={
                        item.severity === "high" ? "destructive" : item.severity === "medium" ? "default" : "outline"
                      }
                    >
                      {item.severity}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="outline" size="sm">
              View Full Document
            </Button>
            <Button size="sm">Send Notification to Cardinals</Button>
          </div>
        </div>
      ))}
    </div>
  )
}
