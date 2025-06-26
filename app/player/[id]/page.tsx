import { notFound } from "next/navigation"
import { players } from "@/data/player-roster"
import { PlayerStatisticalAnalysis } from "@/components/player-statistical-analysis"
import { ShoulderInjurySignals } from "@/components/shoulder-injury-signals"
import { BatterInjurySignals } from "@/components/batter-injury-signals"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, AlertCircle, Bell, Stethoscope } from "lucide-react"

type PositionCategory = "pitcher" | "catcher" | "infielder" | "outfielder" | "all" | "injured"
type ComplianceStatus = "Compliant" | "Pending" | "Attention" | "Exempt"
type RiskLevel = "High" | "Medium" | "Low" | "None"

interface PlayerStats {
  avg?: string
  hr?: number
  rbi?: number
  ops?: string
  era?: string
  w?: number
  l?: number
  sv?: number
  whip?: string
  so?: number
}

interface Player {
  id: string
  name: string
  number: string
  position: string
  positionCategory: PositionCategory
  batsThrows: string
  height: string
  weight: string
  complianceStatus: ComplianceStatus
  lastTested: string
  nextTest: string
  contractExpiration: string
  contractValue: string
  stats: PlayerStats
  imageUrl?: string
  riskLevel?: RiskLevel
  injuryStatus?: string
  injuryType?: string
  expectedReturn?: string
  injuryStartDate?: string
}

export default async function PlayerProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const playerToDisplay = players.find((player) => player.id === id)

  if (!playerToDisplay) {
    notFound()
  }

  const getComplianceStatusBadge = (status: ComplianceStatus) => {
    switch (status) {
      case "Compliant":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Compliant
          </Badge>
        )
      case "Pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            <Bell className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      case "Attention":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <AlertCircle className="h-3 w-3 mr-1" />
            Attention
          </Badge>
        )
      case "Exempt":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Exempt
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getInjuryStatusBadge = (status?: string) => {
    if (!status) return null
    const displayStatus = status.replace("Injured List ", "")
    return (
      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 whitespace-nowrap">
        <Stethoscope className="h-3 w-3 mr-1" />
        {displayStatus}
      </Badge>
    )
  }

  const getRiskLevelBadge = (player: Player) => {
    const level = player.riskLevel
    if (!level) return null

    switch (level) {
      case "High":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <AlertCircle className="h-3 w-3 mr-1" />
            High
          </Badge>
        )
      case "Medium":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            <AlertCircle className="h-3 w-3 mr-1" />
            Medium
          </Badge>
        )
      case "Low":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Low
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center gap-4">
        <Avatar className="h-24 w-24 rounded-md">
          <AvatarImage src={playerToDisplay.imageUrl || "/placeholder.svg"} alt={playerToDisplay.name} />
          <AvatarFallback className="rounded-md bg-pirates-yellow text-pirates-black text-4xl">
            {playerToDisplay.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="grid gap-1">
          <h1 className="text-3xl font-bold text-black">
            {playerToDisplay.name} <span className="text-muted-foreground">#{playerToDisplay.number}</span>
          </h1>
          <p className="text-muted-foreground">
            {playerToDisplay.position} | {playerToDisplay.height}, {playerToDisplay.weight} lbs | B/T:{" "}
            {playerToDisplay.batsThrows}
          </p>
          <div className="flex items-center gap-2">
            {playerToDisplay.injuryStatus
              ? getInjuryStatusBadge(playerToDisplay.injuryStatus)
              : getComplianceStatusBadge(playerToDisplay.complianceStatus)}
            {getRiskLevelBadge(playerToDisplay)}
          </div>
        </div>
      </div>

      <Tabs defaultValue="statistical-analysis" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          {" "}
          {/* Changed to grid-cols-4 for better fit */}
          <TabsTrigger value="statistical-analysis">Statistical Analysis</TabsTrigger>
          <TabsTrigger value="compliance-history">Compliance History</TabsTrigger>
          <TabsTrigger value="test-schedule">Test Schedule</TabsTrigger>
          {playerToDisplay.positionCategory === "pitcher" && (
            <TabsTrigger
              value="shoulder-injury-signals"
              className="data-[state=active]:bg-red-500 data-[state=active]:text-white data-[state=active]:border-red-500"
            >
              Shoulder Injury Signals
            </TabsTrigger>
          )}
          {playerToDisplay.positionCategory !== "pitcher" && (
            <TabsTrigger value="batter-injury-signals">Batter Injury Signals</TabsTrigger>
          )}
        </TabsList>
        <TabsContent value="statistical-analysis" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Year-to-Date Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <PlayerStatisticalAnalysis player={playerToDisplay} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="compliance-history" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Compliance History</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Placeholder for compliance history */}
              <p className="text-muted-foreground">
                Compliance history data for {playerToDisplay.name} will be displayed here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="test-schedule" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Test Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Placeholder for test schedule */}
              <p className="text-muted-foreground">
                Test schedule data for {playerToDisplay.name} will be displayed here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        {playerToDisplay.positionCategory === "pitcher" && (
          <TabsContent value="shoulder-injury-signals" className="mt-4">
            <ShoulderInjurySignals />
          </TabsContent>
        )}
        {playerToDisplay.positionCategory !== "pitcher" && (
          <TabsContent value="batter-injury-signals" className="mt-4">
            <BatterInjurySignals />
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
