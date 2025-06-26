"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, MoreHorizontal, Trash } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Notification = {
  id: string
  title: string
  recipients: string
  sentDate: Date
  status: "Pending" | "Sent" | "Scheduled" | "Read"
  priority: "High" | "Medium" | "Low"
}

const notifications: Notification[] = [
  {
    id: "1",
    title: "New Banned Substance Alert: S-23",
    recipients: "All Players, Athletic Trainers",
    sentDate: new Date(2025, 4, 15, 9, 30),
    status: "Pending",
    priority: "High",
  },
  {
    id: "2",
    title: "Pirates Testing Schedule for June",
    recipients: "All Players",
    sentDate: new Date(2025, 4, 14, 14, 15),
    status: "Sent",
    priority: "Medium",
  },
  {
    id: "3",
    title: "New Prohibited Substance Alert: Category Update",
    recipients: "All Team Members",
    sentDate: new Date(2025, 4, 20, 10, 0),
    status: "Scheduled",
    priority: "Low",
  },
  {
    id: "4",
    title: "Quarterly Compliance Review",
    recipients: "Athletic Trainers, Team Doctors",
    sentDate: new Date(2025, 4, 10, 11, 45),
    status: "Read",
    priority: "Medium",
  },
  {
    id: "5",
    title: "Urgent: Contaminated Supplement Warning",
    recipients: "All Players",
    sentDate: new Date(2025, 4, 5, 8, 0),
    status: "Sent",
    priority: "High",
  },
]

export function NotificationsList({ filter }: { filter?: string }) {
  const [notificationsList, setNotificationsList] = useState<Notification[]>(
    filter ? notifications.filter((n) => n.status.toLowerCase() === filter.toLowerCase()) : notifications,
  )

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Title</TableHead>
            <TableHead>Recipients</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {notificationsList.map((notification) => (
            <TableRow key={notification.id}>
              <TableCell className="font-medium">{notification.title}</TableCell>
              <TableCell>{notification.recipients}</TableCell>
              <TableCell>{format(notification.sentDate, "MMM d, yyyy h:mm a")}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    notification.status === "Pending"
                      ? "secondary"
                      : notification.status === "Scheduled"
                        ? "outline"
                        : notification.status === "Read"
                          ? "default"
                          : "outline"
                  }
                >
                  {notification.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    notification.priority === "High"
                      ? "destructive"
                      : notification.priority === "Medium"
                        ? "default"
                        : "outline"
                  }
                >
                  {notification.priority}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      View details
                    </DropdownMenuItem>
                    <DropdownMenuItem>Resend notification</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash className="mr-2 h-4 w-4" />
                      Delete notification
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
