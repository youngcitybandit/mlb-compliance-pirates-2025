import { Bell } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { NotificationsList } from "@/components/notifications-list"

export default function NotificationsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Pirates Notifications" text="Manage and send notifications to team members.">
        {" "}
        {/* Changed text */}
        <Button>
          <Bell className="mr-2 h-4 w-4" />
          Send New Notification
        </Button>
      </DashboardHeader>
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Notifications</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="sent">Sent</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Notifications</CardTitle>
              <CardDescription>View all notifications sent to Pirates team members.</CardDescription>{" "}
              {/* Changed text */}
            </CardHeader>
            <CardContent>
              <NotificationsList />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Notifications</CardTitle>
              <CardDescription>Notifications waiting for acknowledgment.</CardDescription>
            </CardHeader>
            <CardContent>
              <NotificationsList filter="pending" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="sent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sent Notifications</CardTitle>
              <CardDescription>Notifications that have been delivered.</CardDescription>
            </CardHeader>
            <CardContent>
              <NotificationsList filter="sent" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="scheduled" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Notifications</CardTitle>
              <CardDescription>Notifications scheduled for future delivery.</CardDescription>
            </CardHeader>
            <CardContent>
              <NotificationsList filter="scheduled" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
