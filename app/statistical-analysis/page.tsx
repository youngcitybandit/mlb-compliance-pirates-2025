import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Download, Filter, Info, RefreshCw, TrendingUp } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { StatisticalAnomalyTable } from "@/components/statistical-anomaly-table"

export default function StatisticalAnalysisPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Statistical Anomaly Detection"
        text="Identify players with significant statistical increases that may warrant attention."
      >
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Update Stats
          </Button>
        </div>
      </DashboardHeader>

      <Alert className="mb-6 border-amber-200 bg-amber-50 text-amber-800">
        <Info className="h-4 w-4" />
        <AlertTitle>Demo Mode</AlertTitle>
        <AlertDescription>
          This is a demonstration using hypothetical players but real MLB regulations and banned substances. In a real
          implementation, this system would integrate with official MLB statistics and player health data.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <div>
                  <CardTitle>Statistical Increase Detection</CardTitle>
                  <CardDescription>Players showing significant increases in key performance indicators</CardDescription>
                </div>
              </div>
              <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-2">
                <Input placeholder="Search players..." className="w-full sm:w-[250px]" />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Filter By</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>Risk Level</DropdownMenuItem>
                      <DropdownMenuItem>Position</DropdownMenuItem>
                      <DropdownMenuItem>Age Group</DropdownMenuItem>
                      <DropdownMenuItem>Potential Substance</DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="space-y-4">
              <TabsList>
                <TabsTrigger value="all">All Players</TabsTrigger>
                <TabsTrigger value="hitters">Hitters</TabsTrigger>
                <TabsTrigger value="pitchers">Pitchers</TabsTrigger>
                <TabsTrigger value="high-risk">High Risk</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <StatisticalAnomalyTable filter="all" />
              </TabsContent>
              <TabsContent value="hitters">
                <StatisticalAnomalyTable filter="hitters" />
              </TabsContent>
              <TabsContent value="pitchers">
                <StatisticalAnomalyTable filter="pitchers" />
              </TabsContent>
              <TabsContent value="high-risk">
                <StatisticalAnomalyTable filter="high-risk" />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
