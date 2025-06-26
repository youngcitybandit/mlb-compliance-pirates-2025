import { Upload, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { DocumentsList } from "@/components/documents-list"

export default function DocumentsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="MLB Policy Documents" text="Manage and track MLB policy documents.">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Upload className="mr-2 h-4 w-4" />
            Upload
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New Document
          </Button>
        </div>
      </DashboardHeader>
      <Card>
        <CardHeader>
          <CardTitle>Policy Documents</CardTitle>
          <CardDescription>MLB policy documents and version history.</CardDescription>
          <div className="flex w-full max-w-sm items-center space-x-2 mt-2">
            <Input type="search" placeholder="Search documents..." />
            <Button type="submit">Search</Button>
          </div>
        </CardHeader>
        <CardContent>
          <DocumentsList />
        </CardContent>
      </Card>
    </DashboardShell>
  )
}
