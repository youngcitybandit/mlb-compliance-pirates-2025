"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlayCircle, Calendar, Clock } from "lucide-react"
import { LiveGamefeedPlayers } from "@/components/live-gamefeed-players"
import { PiratesPitchersLiveTracker } from "@/components/pirates-pitchers-live-tracker"
import { ProbablePitcherDashboard } from "@/components/probable-pitcher-dashboard"

export default function LiveGamefeedPage() {
  const testScheduleCheck = async () => {
    try {
      const response = await fetch('/api/baseball-savant?type=schedule');
      const data = await response.json();
      console.log('Schedule check result:', data);
      alert(`Schedule check completed. Found ${data.data?.games?.length || 0} games today.`);
    } catch (error) {
      console.error('Error testing schedule check:', error);
      alert('Error testing schedule check');
    }
  };

  const testLiveCheck = async () => {
    try {
      const response = await fetch('/api/baseball-savant?type=live');
      const data = await response.json();
      console.log('Live check result:', data);
      alert(`Live check completed. Found ${data.data?.length || 0} live games.`);
    } catch (error) {
      console.error('Error testing live check:', error);
      alert('Error testing live check');
    }
  };

  const testMorningCheck = async () => {
    try {
      const response = await fetch('/api/baseball-savant?type=morning');
      const data = await response.json();
      console.log('Morning check result:', data);
      alert(`Morning check completed. System status: ${data.data?.systemStatus}. Next check: ${data.data?.nextCheckTime}. Games today: ${data.data?.todaysGames?.length || 0}`);
    } catch (error) {
      console.error('Error testing morning check:', error);
      alert('Error testing morning check');
    }
  };

  return (
    <DashboardShell>
      <DashboardHeader heading="Live Gamefeed" text="Real-time updates and insights from ongoing MLB games." />

      {/* Test Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-pirates-yellow" />
            System Controls
          </CardTitle>
          <CardDescription>
            Test the morning schedule check and live game detection system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Button onClick={testScheduleCheck} variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              Test Schedule Check
            </Button>
            <Button onClick={testLiveCheck} variant="outline" size="sm">
              <PlayCircle className="mr-2 h-4 w-4" />
              Test Live Check
            </Button>
            <Button onClick={testMorningCheck} variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              Test Morning Check
            </Button>
          </div>
        </CardContent>
      </Card>

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
