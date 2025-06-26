import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Settings" text="Manage your account and application preferences." />

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Update your profile information and general preferences.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue="Pirates Admin" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue="admin@pirates.com" />
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>Configure how you receive alerts and updates.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <Switch id="email-notifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="push-notifications">Push Notifications</Label>
              <Switch id="push-notifications" />
            </div>
            <Separator />
            <div className="grid gap-2">
              <Label>Alert Types</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch id="urgent-alerts" defaultChecked />
                  <Label htmlFor="urgent-alerts">Urgent Policy Alerts</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="policy-updates" defaultChecked />
                  <Label htmlFor="policy-updates">Policy Document Updates</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="test-reminders" />
                  <Label htmlFor="test-reminders">Upcoming Test Reminders</Label>
                </div>
              </div>
            </div>
            <Button>Update Preferences</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Management</CardTitle>
            <CardDescription>Manage your account security and data.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline">Change Password</Button>
            <Button variant="destructive">Delete Account</Button>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
