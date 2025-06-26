import { Input } from "@/components/ui/input"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlayerRoster } from "@/components/player-roster"
import { Button } from "@/components/ui/button"
import { Download, Filter, Info } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function RosterPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Team Roster" text="Current roster with compliance status and statistics.">
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
              <CardTitle>2025 Active Roster</CardTitle>
              <CardDescription>40-man roster with compliance status and statistics</CardDescription>
            </div>
            <div className="w-full sm:w-auto">
              <Input placeholder="Search players..." className="w-full sm:w-[250px]" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All Players</TabsTrigger>
              <TabsTrigger value="pitchers">Pitchers</TabsTrigger>
              <TabsTrigger value="catchers">Catchers</TabsTrigger>
              <TabsTrigger value="infielders">Infielders</TabsTrigger>
              <TabsTrigger value="outfielders">Outfielders</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <PlayerRoster filter="all" />
            </TabsContent>
            <TabsContent value="pitchers">
              <PlayerRoster filter="pitcher" />
            </TabsContent>
            <TabsContent value="catchers">
              <PlayerRoster filter="catcher" />
            </TabsContent>
            <TabsContent value="infielders">
              <PlayerRoster filter="infielder" />
            </TabsContent>
            <TabsContent value="outfielders">
              <PlayerRoster filter="outfielder" />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </DashboardShell>
  )
}
