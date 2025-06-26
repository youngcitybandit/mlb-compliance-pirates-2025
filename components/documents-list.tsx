"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Eye, FileText, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Document = {
  id: string
  name: string
  type: string
  uploadDate: Date
  version: string
  status: "Current" | "Archived" | "Draft"
}

const documents: Document[] = [
  {
    id: "1",
    name: "MLB Drug Prevention and Treatment Program 2025",
    type: "PDF",
    uploadDate: new Date(2025, 4, 15),
    version: "v2025.1",
    status: "Current",
  },
  {
    id: "2",
    name: "Banned Substances List 2025",
    type: "PDF",
    uploadDate: new Date(2025, 4, 15),
    version: "v2025.1",
    status: "Current",
  },
  {
    id: "3",
    name: "Prohibited Substances List 2025",
    type: "PDF",
    uploadDate: new Date(2025, 0, 10),
    version: "v2025.2",
    status: "Archived",
  },
  {
    id: "4",
    name: "Supplement Guidelines 2025",
    type: "PDF",
    uploadDate: new Date(2025, 3, 5),
    version: "v2025.1",
    status: "Current",
  },
  {
    id: "5",
    name: "Testing Procedures Manual 2025",
    type: "PDF",
    uploadDate: new Date(2025, 2, 20),
    version: "v2025.1",
    status: "Current",
  },
  {
    id: "6",
    name: "Therapeutic Use Exemption Policy 2025",
    type: "PDF",
    uploadDate: new Date(2025, 1, 15),
    version: "v2025.1",
    status: "Current",
  },
]

export function DocumentsList() {
  const [documentsList] = useState<Document[]>(documents)

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[350px]">Document Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Upload Date</TableHead>
            <TableHead>Version</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documentsList.map((document) => (
            <TableRow key={document.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{document.name}</span>
                </div>
              </TableCell>
              <TableCell>{document.type}</TableCell>
              <TableCell>{format(document.uploadDate, "MMM d, yyyy")}</TableCell>
              <TableCell>{document.version}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    document.status === "Current" ? "default" : document.status === "Draft" ? "secondary" : "outline"
                  }
                >
                  {document.status}
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
                      View document
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Compare versions</DropdownMenuItem>
                    <DropdownMenuItem>View change history</DropdownMenuItem>
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
