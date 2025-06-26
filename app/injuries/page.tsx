import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlayerRoster } from "@/components/player-roster"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Download, Filter, Info } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function InjuriesPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Injured List" text="Track and manage players on the injured list.">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </DashboardHeader>

      <Alert className="mb-6 border-amber-200 bg-amber-50 text-amber-800">
        <Info className="h-4 w-4" />
        <AlertTitle>Demo Mode</AlertTitle>
        <AlertDescription>
          This is a demonstration using hypothetical players but real MLB regulations and banned substances.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Injured Players</CardTitle>
              <CardDescription>Players currently on the injured list</CardDescription>
            </div>
            <div className="w-full sm:w-auto">
              <Input placeholder="Search players..." className="w-full sm:w-[250px]" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <PlayerRoster filter="injured" />
        </CardContent>
      </Card>
    </DashboardShell>
  )
}
