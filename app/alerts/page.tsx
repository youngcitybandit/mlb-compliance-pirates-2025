import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Bell, FileText, Info, CheckCircle2, Shield, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function AlertsPage() {
  const alerts = [
    {
      id: "1",
      type: "Urgent",
      title: "New Prohibited Substance Alert: Category Update",
      description: "A new substance category has been added to the MLB prohibited substances list. Immediate review required.",
      date: "2025-01-15",
      action: "View Substance Details",
      icon: AlertCircle,
      variant: "destructive",
    },
    {
      id: "2",
      type: "Warning",
      title: "Testing Protocol Update",
      description: "Updated testing procedures for hormone modulators have been implemented.",
      date: "2025-01-10",
      action: "Review Changes",
      icon: Shield,
      variant: "outline",
    },
    {
      id: "3",
      type: "Info",
      title: "Compliance Training Reminder",
      description: "Annual compliance training must be completed by all team members by January 31st.",
      date: "2025-01-05",
      action: "Complete Training",
      icon: BookOpen,
      variant: "default",
    },
    {
      id: "4",
      type: "Information",
      title: "Upcoming Educational Webinar: Avoiding Contaminated Supplements",
      description:
        "Join our webinar on June 10, 2025, to learn about common supplement contaminants and how to avoid them.",
      date: "May 20, 2025",
      action: "Register for Webinar",
      icon: Info,
      variant: "outline",
    },
    {
      id: "5",
      type: "Resolved",
      title: "Previous Alert: Brand X Pre-Workout Contamination Resolved",
      description: "The issue with Brand X pre-workout has been resolved. Product is now safe for use.",
      date: "May 22, 2025",
      action: "View Resolution",
      icon: CheckCircle2,
      variant: "default",
    },
  ]

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Alerts & Notifications"
        text="Manage and view important compliance alerts and notifications."
      >
        <Button size="sm">
          <Bell className="mr-2 h-4 w-4" />
          Send New Alert
        </Button>
      </DashboardHeader>

      <Card>
        <CardHeader>
          <CardTitle>Recent Alerts</CardTitle>
          <CardDescription>Important updates and actions required from the compliance system.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className="flex items-start space-x-4 rounded-md border p-4">
              <div className="mt-0.5">
                <alert.icon
                  className={`h-5 w-5 ${alert.variant === "destructive" ? "text-destructive" : "text-muted-foreground"}`}
                />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium leading-none">{alert.title}</p>
                  <Badge variant={alert.variant} className="text-xs">
                    {alert.type}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{alert.description}</p>
                <div className="flex items-center pt-2">
                  <time className="text-xs text-muted-foreground">{alert.date}</time>
                  {alert.action && (
                    <Button variant="link" size="sm" className="h-auto p-0 pl-4">
                      {alert.action}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </DashboardShell>
  )
}
