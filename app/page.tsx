"use client"

import {
  AlertTriangle,
  Bell,
  FileText,
  Files,
  Shield,
  Stethoscope,
  TrendingDown,
  TrendingUp,
  UserRound,
  Users,
  Search,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { RecentUpdates } from "@/components/recent-updates"
import { SubstancesList } from "@/components/substances-list"
import { TeamMembers } from "@/components/team-members"
import { DashboardShell } from "@/components/dashboard-shell"
import { StatisticalTriggerInfo } from "@/components/statistical-trigger-info" // Import the component

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Pirates Compliance Dashboard"
        text="Monitor banned substances and stay compliant with MLB regulations."
      >
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </Button>
          <Button size="sm">
            <FileText className="mr-2 h-4 w-4" />
            View Latest Policy
          </Button>
        </div>
      </DashboardHeader>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Prohibited Substances</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <p className="text-xs text-muted-foreground">
              Substances monitored under MLB regulations
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Players</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">40</div>
            <p className="text-xs text-muted-foreground">Active roster</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Players on Injured List</CardTitle>
            <Stethoscope className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Currently sidelined</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Notifications</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">Requires acknowledgment</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Urgent Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Immediate action required</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Performers</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Exceeding expectations</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Underperforming Players</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Needs attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
            <Files className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">25</div>
            <p className="text-xs text-muted-foreground">Policies, guides, and FAQs</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <UserRound className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <p className="text-xs text-muted-foreground">Players, trainers, and staff</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Policy Update</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">May 15, 2025</div>
            <p className="text-xs text-muted-foreground">3 weeks ago</p>
          </CardContent>
        </Card>
      </div>
      <StatisticalTriggerInfo /> {/* Re-added the component here */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Prohibited Substances</CardTitle>
            <CardDescription>Latest changes to the MLB prohibited substances list.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">New Category Added</p>
                  <p className="text-xs text-muted-foreground">Metabolic Modulators - May affect energy metabolism</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Category Updated</p>
                  <p className="text-xs text-muted-foreground">Hormone Modulators - Updated testing protocols</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Updates</CardTitle>
            <CardDescription>Latest changes to the MLB prohibited substances list.</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentUpdates />
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Pirates Team Members</CardTitle>
            <CardDescription>Players and staff requiring compliance notifications.</CardDescription>
          </CardHeader>
          <CardContent>
            <TeamMembers />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Educational Resources</CardTitle>
            <CardDescription>Materials to help understand MLB substance policies.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs className="w-full" defaultValue="videos">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="videos">Videos</TabsTrigger>
                <TabsTrigger value="articles">Articles</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
              </TabsList>
              <TabsContent className="mt-4 space-y-4" value="videos">
                <div className="flex items-center gap-3 rounded-md border p-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded bg-muted">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-medium leading-none">Understanding MLB Drug Policy</h4>
                    <p className="text-sm text-muted-foreground">12 min video</p>
                  </div>
                  <Button className="ml-auto h-auto p-0" size="sm" variant="ghost">
                    Watch
                  </Button>
                </div>
                <div className="flex items-center gap-3 rounded-md border p-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded bg-muted">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-medium leading-none">Pirates Supplement Safety Guide</h4>
                    <p className="text-sm text-muted-foreground">8 min video</p>
                  </div>
                  <Button className="ml-auto h-auto p-0" size="sm" variant="ghost">
                    Watch
                  </Button>
                </div>
              </TabsContent>
              <TabsContent className="mt-4 space-y-4" value="articles">
                <div className="flex items-center gap-3 rounded-md border p-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded bg-muted">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-medium leading-none">2025 MLB Drug Policy Changes</h4>
                    <p className="text-sm text-muted-foreground">5 min read</p>
                  </div>
                  <Button className="ml-auto h-auto p-0" size="sm" variant="ghost">
                    Read
                  </Button>
                </div>
                <div className="flex items-center gap-3 rounded-md border p-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded bg-muted">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-medium leading-none">Pirates Guide to Avoiding Contaminated Supplements</h4>
                    <p className="text-sm text-muted-foreground">7 min read</p>
                  </div>
                  <Button className="ml-auto h-auto p-0" size="sm" variant="ghost">
                    Read
                  </Button>
                </div>
              </TabsContent>
              <TabsContent className="mt-4 space-y-4" value="faq">
                <div className="space-y-4">
                  <div className="rounded-md border p-4">
                    <h4 className="font-medium">What happens if a prohibited substance is detected?</h4>
                    <p className="text-sm text-muted-foreground">
                      Players testing positive face suspensions of 80 games for a first violation, 162 games for a second, and a lifetime ban for a third.
                    </p>
                  </div>
                  <div className="rounded-md border p-4">
                    <h4 className="font-medium">How often is the prohibited substance list updated?</h4>
                    <p className="text-sm text-muted-foreground">
                      The list is reviewed quarterly and updated as new substances are identified that may affect performance.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
