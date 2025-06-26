import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlayCircle } from "lucide-react"
import { LiveGamefeedPlayers } from "@/components/live-gamefeed-players"
import { PiratesPitchersLiveTracker } from "@/components/pirates-pitchers-live-tracker"
import { ProbablePitcherDashboard } from "@/components/probable-pitcher-dashboard"

export default function LiveGamefeedPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Live Gamefeed" text="Real-time updates and insights from ongoing MLB games." />

      {/* Probable Pitcher Dashboard */}
      <ProbablePitcherDashboard />

      {/* Pirates Pitchers Live Tracker */}
      <PiratesPitchersLiveTracker />

      {/* Players to Track */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PlayCircle className="h-5 w-5 text-pirates-yellow" />
            Players to Track
          </CardTitle>
          <CardDescription>
            This section displays players with recent statistical anomalies or underperformance that may warrant live
            monitoring.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LiveGamefeedPlayers />
        </CardContent>
      </Card>
    </DashboardShell>
  )
}
