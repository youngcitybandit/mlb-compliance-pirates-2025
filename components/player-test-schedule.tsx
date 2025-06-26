import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Edit } from "lucide-react"

export function PlayerTestSchedule() {
  const scheduledTests = [
    {
      id: "1",
      date: "Jul 10, 2025",
      time: "9:00 AM",
      type: "Random",
      location: "Busch Stadium, St. Louis",
      status: "Scheduled",
    },
    {
      id: "2",
      date: "Sep 5, 2025",
      time: "10:30 AM",
      type: "Regular",
      location: "Busch Stadium, St. Louis",
      status: "Scheduled",
    },
    {
      id: "3",
      date: "Oct 15, 2025",
      time: "9:30 AM",
      type: "Post-Season",
      location: "TBD",
      status: "Tentative",
    },
  ]

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {scheduledTests.map((test) => (
            <TableRow key={test.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-muted-foreground mr-1" />
                  {test.date}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-muted-foreground mr-1" />
                  {test.time}
                </div>
              </TableCell>
              <TableCell>{test.type}</TableCell>
              <TableCell>{test.location}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={
                    test.status === "Scheduled"
                      ? "bg-blue-50 text-blue-700 border-blue-200"
                      : "bg-yellow-50 text-yellow-700 border-yellow-200"
                  }
                >
                  {test.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4 mr-1" />
                  Modify
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
