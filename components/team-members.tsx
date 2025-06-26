"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MoreHorizontal } from "lucide-react"

type TeamMember = {
  id: string
  name: string
  email: string
  role: "Player" | "Athletic Trainer" | "Team Doctor" | "Coach" | "Admin"
  status: "Active" | "Pending" | "Inactive"
}

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Nolan Arenado",
    email: "nolan.arenado@pirates.com",
    role: "Player",
    status: "Active",
  },
  {
    id: "2",
    name: "Tony Leo",
    email: "tony.l@pirates.com", // Updated email to reflect Pirates branding
    role: "Athletic Trainer",
    status: "Active",
  },
  {
    id: "3",
    name: "Paul Goldschmidt",
    email: "paul.goldschmidt@pirates.com",
    role: "Player",
    status: "Active",
  },
  {
    id: "4",
    name: "Emily Chen",
    email: "emily.c@pirates.com",
    role: "Team Doctor",
    status: "Active",
  },
  {
    id: "5",
    name: "Oliver Marmol",
    email: "oliver.marmol@pirates.com",
    role: "Coach",
    status: "Active",
  },
  {
    id: "6",
    name: "Willson Contreras",
    email: "willson.contreras@pirates.com",
    role: "Player",
    status: "Pending",
  },
]

export function TeamMembers({ role = "all" }: { role?: string }) {
  const [members, setMembers] = useState<TeamMember[]>(teamMembers)

  // Filter by role - Staff includes Coach, Athletic Trainer, and Team Doctor
  const filteredMembers = role === "all" 
    ? members 
    : role === "Staff"
    ? members.filter((m) => ["Coach", "Athletic Trainer", "Team Doctor"].includes(m.role))
    : members.filter((m) => m.role === role)

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredMembers.map((member) => (
            <TableRow key={member.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={`/abstract-geometric-shapes.png?key=kb9u3&height=32&width=32&query=${member.name}`}
                      alt={member.name}
                    />
                    <AvatarFallback className="rounded-md bg-pirates-yellow text-pirates-black">
                      {" "}
                      {/* Changed color */}
                      {member.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium">{member.name}</span>
                    <span className="text-xs text-muted-foreground">{member.email}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>{member.role}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    member.status === "Active" ? "outline" : member.status === "Pending" ? "secondary" : "destructive"
                  }
                >
                  {member.status}
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
                    <DropdownMenuItem>View profile</DropdownMenuItem>
                    <DropdownMenuItem>Set language</DropdownMenuItem>
                    <DropdownMenuItem>Send notification</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>View compliance history</DropdownMenuItem>
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
