import { UserPlus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { TeamMembers } from "@/components/team-members"

export default function TeamPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Pirates Team Members" text="Manage team members and their compliance status.">
        {" "}
        {/* Changed text */}
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Team Member
        </Button>
      </DashboardHeader>
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Members</TabsTrigger>
          <TabsTrigger value="players">Players</TabsTrigger>
          <TabsTrigger value="staff">Staff</TabsTrigger>
          <TabsTrigger value="trainers">Athletic Trainers</TabsTrigger>
          <TabsTrigger value="doctors">Team Doctor</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Team Members</CardTitle>
              <CardDescription>View and manage all Pirates team members.</CardDescription> {/* Changed text */}
              <div className="flex w-full max-w-sm items-center space-x-2 mt-2">
                <Input type="search" placeholder="Search team members..." />
                <Button type="submit">Search</Button>
              </div>
            </CardHeader>
            <CardContent>
              <TeamMembers role="all" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="players" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Players</CardTitle>
              <CardDescription>View and manage Pirates players.</CardDescription> {/* Changed text */}
            </CardHeader>
            <CardContent>
              <TeamMembers role="Player" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="staff" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Staff</CardTitle>
              <CardDescription>View and manage Pirates staff members.</CardDescription> {/* Changed text */}
            </CardHeader>
            <CardContent>
              <TeamMembers role="Staff" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="trainers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Athletic Trainers</CardTitle>
              <CardDescription>View and manage Pirates athletic trainers.</CardDescription> {/* Changed text */}
            </CardHeader>
            <CardContent>
              <TeamMembers role="Athletic Trainer" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="doctors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Doctor</CardTitle>
              <CardDescription>View and manage Pirates team doctors.</CardDescription>
            </CardHeader>
            <CardContent>
              <TeamMembers role="Team Doctor" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
