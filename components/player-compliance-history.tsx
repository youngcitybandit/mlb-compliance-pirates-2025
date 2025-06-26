"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, FileText, XCircle } from "lucide-react"

export function PlayerComplianceHistory() {
  const testHistory = [
    {
      id: "1",
      date: "May 10, 2025",
      type: "Random",
      result: "Negative",
      substances: "Full Panel",
      notes: "Standard random test",
    },
    {
      id: "2",
      date: "Mar 15, 2025",
      type: "Scheduled",
      result: "Negative",
      substances: "Full Panel",
      notes: "Spring training test",
    },
    {
      id: "3",
      date: "Jan 20, 2025",
      type: "Off-Season",
      result: "Negative",
      substances: "Full Panel",
      notes: "Off-season random test",
    },
    {
      id: "4",
      date: "Oct 5, 2024",
      type: "Post-Season",
      result: "Negative",
      substances: "Full Panel",
      notes: "End of season test",
    },
    {
      id: "5",
      date: "Aug 12, 2024",
      type: "Random",
      result: "Negative",
      substances: "Full Panel",
      notes: "Standard random test",
    },
  ]

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Result</TableHead>
            <TableHead>Substances</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead className="text-right">Report</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {testHistory.map((test) => (
            <TableRow key={test.id}>
              <TableCell className="font-medium">{test.date}</TableCell>
              <TableCell>{test.type}</TableCell>
              <TableCell>
                {test.result === "Negative" ? (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Negative
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                    <XCircle className="h-3 w-3 mr-1" />
                    Positive
                  </Badge>
                )}
              </TableCell>
              <TableCell>{test.substances}</TableCell>
              <TableCell className="max-w-[200px] truncate">{test.notes}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">
                  <FileText className="h-4 w-4 mr-1" />
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
