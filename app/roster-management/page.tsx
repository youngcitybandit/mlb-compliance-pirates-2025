"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Calendar, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Clock, 
  Activity,
  Users,
  Target,
  BarChart3,
  Zap,
  Shield,
  Brain,
  Sun,
  Moon,
  CalendarDays,
  Heart,
  Brain as BrainIcon,
  Home,
  Plane,
  Bell
} from "lucide-react"
import { players } from "@/data/player-roster"

interface RestSchedule {
  playerId: string
  playerName: string
  position: string
  lastGame: string
  nextGame: string
  restDays: number
  fatigueLevel: "Low" | "Medium" | "High" | "Critical"
  performanceTrend: "Improving" | "Stable" | "Declining"
  recommendedAction: string
  injuryRisk: "Low" | "Medium" | "High"
  consecutiveGames: number
  travelDays: number
  dayNightPreference: "Day" | "Night" | "Neutral"
  offDayStrategy: "Pre-Rest" | "Post-Rest" | "Split-Rest"
  mentalFatigue: number
  physicalFatigue: number
  lifeFactors: string[]
  performanceDropThreshold: number
}

interface PerformancePattern {
  playerId: string
  playerName: string
  dayGames: { avg: number; games: number; trend: string }
  nightGames: { avg: number; games: number; trend: string }
  postRest: { avg: number; games: number; trend: string }
  consecutiveGames: { avg: number; games: number; trend: string }
  postOffDay: { avg: number; games: number; trend: string }
  travelGames: { avg: number; games: number; trend: string }
  pattern: string
  optimalRestDays: number
  performanceDropThreshold: number
}

interface TacticalScenario {
  id: string
  title: string
  description: string
  impact: "High" | "Medium" | "Low"
  recommendation: string
  players: string[]
  urgency: "Immediate" | "This Week" | "Next Week"
}

interface UpcomingMatchup {
  id: string
  opponent: string
  seriesType: "Home" | "Away"
  startDate: string
  endDate: string
  games: number
  dayGames: number
  nightGames: number
  travelDays: number
  timeZoneChange?: string
  opponentStrength: "Strong" | "Average" | "Weak"
  strategicImportance: "High" | "Medium" | "Low"
  restRecommendations: string[]
  keyPlayers: string[]
  weatherConsiderations?: string
}

interface NextGameCalendar {
  id: string
  date: string
  dayOfWeek: string
  opponent: string
  location: "Home" | "Away"
  gameTime: string
  gameType: "Day" | "Night"
  gameNumber: number
  travelDays: number
  timeZone: string
  timeZoneChange?: string
  restRecommendations: string[]
  keyRestPlayers: string[]
  strategicNotes: string
  weatherForecast?: string
}

const restScheduleData: RestSchedule[] = [
  {
    playerId: "1",
    playerName: "Oneil Cruz",
    position: "SS",
    lastGame: "2025-06-23",
    nextGame: "2025-06-25",
    restDays: 2,
    fatigueLevel: "Low",
    performanceTrend: "Improving",
    recommendedAction: "Ready to play - optimal night game performance",
    injuryRisk: "Low",
    consecutiveGames: 3,
    travelDays: 0,
    dayNightPreference: "Night",
    offDayStrategy: "Post-Rest",
    mentalFatigue: 25,
    physicalFatigue: 20,
    lifeFactors: ["Good sleep pattern", "Family in town"],
    performanceDropThreshold: 4
  },
  {
    playerId: "2",
    playerName: "Ke'Bryan Hayes",
    position: "3B",
    lastGame: "2025-06-24",
    nextGame: "2025-06-25",
    restDays: 1,
    fatigueLevel: "Medium",
    performanceTrend: "Stable",
    recommendedAction: "Consider rest day - shows decline after 4+ consecutive games",
    injuryRisk: "Medium",
    consecutiveGames: 4,
    travelDays: 1,
    dayNightPreference: "Day",
    offDayStrategy: "Pre-Rest",
    mentalFatigue: 45,
    physicalFatigue: 60,
    lifeFactors: ["Travel fatigue", "Recent family stress"],
    performanceDropThreshold: 3
  },
  {
    playerId: "4",
    playerName: "Mitch Keller",
    position: "SP",
    lastGame: "2025-06-22",
    nextGame: "2025-06-27",
    restDays: 5,
    fatigueLevel: "Low",
    performanceTrend: "Improving",
    recommendedAction: "Full recovery achieved - optimal for day game start",
    injuryRisk: "Low",
    consecutiveGames: 1,
    travelDays: 0,
    dayNightPreference: "Day",
    offDayStrategy: "Post-Rest",
    mentalFatigue: 15,
    physicalFatigue: 10,
    lifeFactors: ["Well-rested", "Good recovery routine"],
    performanceDropThreshold: 2
  },
  {
    playerId: "5",
    playerName: "David Bednar",
    position: "CL",
    lastGame: "2025-06-24",
    nextGame: "2025-06-25",
    restDays: 1,
    fatigueLevel: "High",
    performanceTrend: "Declining",
    recommendedAction: "Critical rest needed - performance drops after 2+ consecutive appearances",
    injuryRisk: "High",
    consecutiveGames: 2,
    travelDays: 1,
    dayNightPreference: "Neutral",
    offDayStrategy: "Split-Rest",
    mentalFatigue: 75,
    physicalFatigue: 80,
    lifeFactors: ["High stress", "Sleep disruption"],
    performanceDropThreshold: 4
  }
]

const performancePatterns: PerformancePattern[] = [
  {
    playerId: "1",
    playerName: "Oneil Cruz",
    dayGames: { avg: 0.285, games: 15, trend: "Stable" },
    nightGames: { avg: 0.295, games: 45, trend: "Improving" },
    postRest: { avg: 0.320, games: 8, trend: "Improving" },
    consecutiveGames: { avg: 0.270, games: 12, trend: "Declining" },
    postOffDay: { avg: 0.310, games: 6, trend: "Improving" },
    travelGames: { avg: 0.280, games: 18, trend: "Stable" },
    pattern: "Night game specialist with strong post-rest recovery",
    optimalRestDays: 2,
    performanceDropThreshold: 4
  },
  {
    playerId: "2",
    playerName: "Ke'Bryan Hayes",
    dayGames: { avg: 0.310, games: 12, trend: "Improving" },
    nightGames: { avg: 0.275, games: 48, trend: "Declining" },
    postRest: { avg: 0.290, games: 10, trend: "Stable" },
    consecutiveGames: { avg: 0.265, games: 15, trend: "Declining" },
    postOffDay: { avg: 0.285, games: 8, trend: "Stable" },
    travelGames: { avg: 0.260, games: 20, trend: "Declining" },
    pattern: "Day game performer with consecutive game fatigue",
    optimalRestDays: 1,
    performanceDropThreshold: 3
  },
  {
    playerId: "4",
    playerName: "Mitch Keller",
    dayGames: { avg: 3.20, games: 8, trend: "Improving" },
    nightGames: { avg: 3.65, games: 12, trend: "Stable" },
    postRest: { avg: 3.10, games: 6, trend: "Improving" },
    consecutiveGames: { avg: 4.20, games: 8, trend: "Declining" },
    postOffDay: { avg: 3.05, games: 4, trend: "Improving" },
    travelGames: { avg: 3.80, games: 10, trend: "Stable" },
    pattern: "Day game specialist with extended rest benefits",
    optimalRestDays: 4,
    performanceDropThreshold: 2
  }
]

const tacticalScenarios: TacticalScenario[] = [
  {
    id: "1",
    title: "Off-Day Rest Strategy",
    description: "Upcoming off-day on June 30th - optimize rest distribution",
    impact: "High",
    recommendation: "Rest Bednar and Hayes pre-off-day, Cruz post-off-day for optimal performance",
    players: ["David Bednar", "Ke'Bryan Hayes", "Oneil Cruz"],
    urgency: "This Week"
  },
  {
    id: "2",
    title: "Day/Night Game Optimization",
    description: "3 day games this week vs 2 night games - leverage player preferences",
    impact: "Medium",
    recommendation: "Start Hayes in day games, Cruz in night games, Keller for day start",
    players: ["Ke'Bryan Hayes", "Oneil Cruz", "Mitch Keller"],
    urgency: "This Week"
  },
  {
    id: "3",
    title: "Consecutive Game Management",
    description: "5-game stretch starting June 25th - prevent fatigue accumulation",
    impact: "High",
    recommendation: "Implement staggered rest - 2 players per day to maintain performance",
    players: ["David Bednar", "Ke'Bryan Hayes"],
    urgency: "Immediate"
  },
  {
    id: "4",
    title: "Travel Impact Mitigation",
    description: "West coast trip next week - account for travel fatigue and time zones",
    impact: "Medium",
    recommendation: "Extra rest day for travel-affected players, adjust rotation",
    players: ["David Bednar", "Ke'Bryan Hayes"],
    urgency: "Next Week"
  }
]

const upcomingMatchups: UpcomingMatchup[] = [
  {
    id: "1",
    opponent: "Cincinnati Reds",
    seriesType: "Home",
    startDate: "June 25, 2025",
    endDate: "June 27, 2025",
    games: 3,
    dayGames: 1,
    nightGames: 2,
    travelDays: 0,
    opponentStrength: "Average",
    strategicImportance: "High",
    restRecommendations: [
      "Rest Bednar before series finale",
      "Start Cruz in night games",
      "Use Hayes in day game"
    ],
    keyPlayers: ["Oneil Cruz", "Ke'Bryan Hayes", "David Bednar"],
    weatherConsiderations: "Hot weather expected - hydration focus"
  },
  {
    id: "2",
    opponent: "Milwaukee Brewers",
    seriesType: "Away",
    startDate: "June 30, 2025",
    endDate: "July 2, 2025",
    games: 3,
    dayGames: 0,
    nightGames: 3,
    travelDays: 1,
    timeZoneChange: "None",
    opponentStrength: "Strong",
    strategicImportance: "High",
    restRecommendations: [
      "Extra rest day for travel",
      "Optimize bullpen usage",
      "Monitor Keller's rest schedule"
    ],
    keyPlayers: ["Mitch Keller", "David Bednar", "Oneil Cruz"],
    weatherConsiderations: "Indoor stadium - no weather concerns"
  },
  {
    id: "3",
    opponent: "Chicago Cubs",
    seriesType: "Home",
    startDate: "July 4, 2025",
    endDate: "July 6, 2025",
    games: 3,
    dayGames: 2,
    nightGames: 1,
    travelDays: 0,
    opponentStrength: "Strong",
    strategicImportance: "Medium",
    restRecommendations: [
      "Holiday weekend - expect large crowds",
      "Day game specialists ready",
      "Manage bullpen for weekend series"
    ],
    keyPlayers: ["Ke'Bryan Hayes", "Mitch Keller", "Oneil Cruz"],
    weatherConsiderations: "July heat - afternoon games challenging"
  },
  {
    id: "4",
    opponent: "St. Louis Cardinals",
    seriesType: "Away",
    startDate: "July 8, 2025",
    endDate: "July 10, 2025",
    games: 3,
    dayGames: 1,
    nightGames: 2,
    travelDays: 1,
    timeZoneChange: "None",
    opponentStrength: "Average",
    strategicImportance: "Medium",
    restRecommendations: [
      "Mid-week travel - minimize disruption",
      "Strategic rest day placement",
      "Optimize for day game performance"
    ],
    keyPlayers: ["Oneil Cruz", "David Bednar", "Ke'Bryan Hayes"],
    weatherConsiderations: "Midwest summer - variable conditions"
  },
  {
    id: "5",
    opponent: "Los Angeles Dodgers",
    seriesType: "Away",
    startDate: "July 15, 2025",
    endDate: "July 17, 2025",
    games: 3,
    dayGames: 0,
    nightGames: 3,
    travelDays: 2,
    timeZoneChange: "PST (-3 hours)",
    opponentStrength: "Strong",
    strategicImportance: "High",
    restRecommendations: [
      "Extended travel preparation",
      "Time zone adjustment period",
      "Extra rest for west coast trip",
      "Optimize for night game performance"
    ],
    keyPlayers: ["Oneil Cruz", "Mitch Keller", "David Bednar"],
    weatherConsiderations: "Southern California - mild conditions"
  }
]

const nextGameCalendarData: NextGameCalendar[] = [
  {
    id: "1",
    date: "June 25, 2025",
    dayOfWeek: "Wednesday",
    opponent: "Cincinnati Reds",
    location: "Home",
    gameTime: "7:05 PM",
    gameType: "Night",
    gameNumber: 1,
    travelDays: 0,
    timeZone: "EST",
    restRecommendations: [
      "Rest David Bednar - high fatigue from previous 2 appearances",
      "Start Oneil Cruz - optimal night game performance",
      "Consider rest for Ke'Bryan Hayes - approaching consecutive game limit"
    ],
    keyRestPlayers: ["David Bednar", "Ke'Bryan Hayes"],
    strategicNotes: "Series opener - leverage home field advantage and night game specialists"
  },
  {
    id: "2",
    date: "June 26, 2025",
    dayOfWeek: "Thursday",
    opponent: "Cincinnati Reds",
    location: "Home",
    gameTime: "1:35 PM",
    gameType: "Day",
    gameNumber: 2,
    travelDays: 0,
    timeZone: "EST",
    restRecommendations: [
      "Start Mitch Keller - optimal day game pitcher",
      "Use Ke'Bryan Hayes - day game specialist",
      "Rest Oneil Cruz - night game preference",
      "Monitor David Bednar - if needed, limit to 1 inning"
    ],
    keyRestPlayers: ["Oneil Cruz", "David Bednar"],
    strategicNotes: "Day game - leverage day game specialists and Keller's rest schedule"
  },
  {
    id: "3",
    date: "June 27, 2025",
    dayOfWeek: "Friday",
    opponent: "Cincinnati Reds",
    location: "Home",
    gameTime: "7:05 PM",
    gameType: "Night",
    gameNumber: 3,
    travelDays: 0,
    timeZone: "EST",
    restRecommendations: [
      "Start Oneil Cruz - back to night game",
      "Full rest for David Bednar - 3 days minimum",
      "Consider rest for Ke'Bryan Hayes - 5 consecutive games"
    ],
    keyRestPlayers: ["David Bednar", "Ke'Bryan Hayes"],
    strategicNotes: "Series finale - maximize night game performance and prepare for travel"
  },
  {
    id: "4",
    date: "June 30, 2025",
    dayOfWeek: "Monday",
    opponent: "Milwaukee Brewers",
    location: "Away",
    gameTime: "8:10 PM",
    gameType: "Night",
    gameNumber: 1,
    travelDays: 1,
    timeZone: "CST",
    timeZoneChange: "-1 hour",
    restRecommendations: [
      "Extra rest day for travel adjustment",
      "Start fresh bullpen - 3 days rest for Bednar",
      "Optimize lineup for time zone change",
      "Consider travel fatigue in player selection"
    ],
    keyRestPlayers: ["All high-fatigue players"],
    strategicNotes: "Away series opener - account for travel and time zone adjustment"
  }
]

export default function RosterManagementPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const criticalAlerts = useMemo(() => {
    return restScheduleData.filter(player => 
      player.fatigueLevel === "Critical" || 
      player.injuryRisk === "High" ||
      player.performanceTrend === "Declining" ||
      player.consecutiveGames >= player.performanceDropThreshold
    )
  }, [])

  const midSeasonStats = useMemo(() => {
    const totalGames = 81
    const gamesRemaining = 81
    const playoffPush = gamesRemaining <= 20
    return { totalGames, gamesRemaining, playoffPush }
  }, [])

  const getFatigueColor = (level: string) => {
    switch (level) {
      case "Low": return "bg-green-100 text-green-800 border-green-200"
      case "Medium": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "High": return "bg-orange-100 text-orange-800 border-orange-200"
      case "Critical": return "bg-red-100 text-red-800 border-red-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "Improving": return <TrendingUp className="h-4 w-4 text-green-600" />
      case "Stable": return <Activity className="h-4 w-4 text-blue-600" />
      case "Declining": return <TrendingDown className="h-4 w-4 text-red-600" />
      default: return <Activity className="h-4 w-4 text-gray-600" />
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "Immediate": return "bg-red-100 text-red-800 border-red-200"
      case "This Week": return "bg-orange-100 text-orange-800 border-orange-200"
      case "Next Week": return "bg-blue-100 text-blue-800 border-blue-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Strategic Roster & Rest Management</h1>
          <p className="text-muted-foreground">
            Mid-season tactical optimization: Game {midSeasonStats.totalGames} of 162 - Balancing performance with recovery
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-gray-300 hover:bg-gray-50">
            <Bell className="mr-2 h-4 w-4" />
            Send New Notification
          </Button>
          <Button className="bg-pirates-yellow hover:bg-pirates-yellow/90 text-pirates-black">
            <Brain className="mr-2 h-4 w-4" />
            AI Tactical Recommendations
          </Button>
        </div>
      </div>

      {criticalAlerts.length > 0 && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>{criticalAlerts.length} critical tactical alerts</strong> require immediate attention. 
            Players showing fatigue patterns, consecutive game decline, or injury risk.
          </AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="rest-schedule">Rest Schedule</TabsTrigger>
          <TabsTrigger value="performance-patterns">Performance Patterns</TabsTrigger>
          <TabsTrigger value="upcoming-matchups">Upcoming Series</TabsTrigger>
          <TabsTrigger value="tactical-scenarios">Tactical Scenarios</TabsTrigger>
          <TabsTrigger value="strategic-planning">Strategic Planning</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Season Progress</CardTitle>
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Game {midSeasonStats.totalGames}/162</div>
                <p className="text-xs text-muted-foreground">
                  {Math.round((midSeasonStats.totalGames / 162) * 100)}% complete
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">High Fatigue Risk</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">
                  {restScheduleData.filter(p => p.fatigueLevel === "High" || p.fatigueLevel === "Critical").length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Need tactical rest consideration
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Consecutive Game Risk</CardTitle>
                <TrendingDown className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {restScheduleData.filter(p => p.consecutiveGames >= 3).length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Approaching performance threshold
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Optimal Rest</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {restScheduleData.filter(p => p.fatigueLevel === "Low" && p.performanceTrend === "Improving").length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Ready for tactical deployment
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Next 4 Games Calendar
              </CardTitle>
              <CardDescription>
                Upcoming schedule with travel days, time zones, and rest recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {nextGameCalendarData.map((game) => (
                  <div key={game.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">{game.opponent}</h3>
                          <Badge className={
                            game.location === "Home" ? "bg-green-100 text-green-800 border-green-200" :
                            "bg-blue-100 text-blue-800 border-blue-200"
                          }>
                            {game.location}
                          </Badge>
                          <Badge className={
                            game.gameType === "Day" ? "bg-yellow-100 text-yellow-800 border-yellow-200" :
                            "bg-purple-100 text-purple-800 border-purple-200"
                          }>
                            {game.gameType} Game
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Date:</span>
                            <p className="text-muted-foreground">{game.date} ({game.dayOfWeek})</p>
                          </div>
                          <div>
                            <span className="font-medium">Time:</span>
                            <p className="text-muted-foreground">{game.gameTime} {game.timeZone}</p>
                          </div>
                          <div>
                            <span className="font-medium">Game #:</span>
                            <p className="text-muted-foreground">{game.gameNumber}</p>
                          </div>
                          <div>
                            <span className="font-medium">Travel:</span>
                            <p className="text-muted-foreground">
                              {game.travelDays} days
                              {game.timeZoneChange && ` (${game.timeZoneChange})`}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <h4 className="font-medium text-sm mb-2">Rest Recommendations</h4>
                        <ul className="space-y-1">
                          {game.restRecommendations.map((rec, index) => (
                            <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm mb-2">Key Rest Players</h4>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {game.keyRestPlayers.map((player) => (
                            <Badge key={player} variant="outline" className="text-xs">
                              {player}
                            </Badge>
                          ))}
                        </div>
                        <h4 className="font-medium text-sm mb-1">Strategic Notes</h4>
                        <p className="text-sm text-muted-foreground">{game.strategicNotes}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Performance Factors
                </CardTitle>
                <CardDescription>
                  Multi-dimensional fatigue analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {restScheduleData.slice(0, 3).map((player) => (
                    <div key={player.playerId} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{player.playerName}</span>
                        {getTrendIcon(player.performanceTrend)}
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Physical</span>
                          <span>{player.physicalFatigue}%</span>
                        </div>
                        <Progress value={player.physicalFatigue} className="h-1" />
                        <div className="flex justify-between text-xs">
                          <span>Mental</span>
                          <span>{player.mentalFatigue}%</span>
                        </div>
                        <Progress value={player.mentalFatigue} className="h-1" />
                      </div>
                      <div className="flex gap-1">
                        {player.dayNightPreference === "Day" && <Sun className="h-3 w-3 text-yellow-600" />}
                        {player.dayNightPreference === "Night" && <Moon className="h-3 w-3 text-blue-600" />}
                        {player.travelDays > 0 && <Plane className="h-3 w-3 text-gray-600" />}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Critical Tactical Alerts
                </CardTitle>
                <CardDescription>
                  Players requiring immediate tactical attention
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {criticalAlerts.map((player) => (
                    <div key={player.playerId} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">
                            {player.playerName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{player.playerName}</p>
                          <p className="text-xs text-muted-foreground">
                            {player.position} • {player.consecutiveGames} consecutive games
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getFatigueColor(player.fatigueLevel)}>
                          {player.fatigueLevel}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          {player.recommendedAction}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="rest-schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rest Schedule & Fatigue Management</CardTitle>
              <CardDescription>
                Comprehensive tactical rest scheduling with multi-factor analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Player</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Consecutive</TableHead>
                    <TableHead>Rest Days</TableHead>
                    <TableHead>Fatigue Level</TableHead>
                    <TableHead>Day/Night</TableHead>
                    <TableHead>Off-Day Strategy</TableHead>
                    <TableHead>Travel</TableHead>
                    <TableHead>Recommendation</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {restScheduleData.map((player) => (
                    <TableRow key={player.playerId}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs">
                              {player.playerName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{player.playerName}</span>
                        </div>
                      </TableCell>
                      <TableCell>{player.position}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={
                          player.consecutiveGames >= 4 ? "border-red-200 text-red-700" :
                          player.consecutiveGames >= 3 ? "border-orange-200 text-orange-700" :
                          "border-green-200 text-green-700"
                        }>
                          {player.consecutiveGames}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{player.restDays} days</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getFatigueColor(player.fatigueLevel)}>
                          {player.fatigueLevel}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {player.dayNightPreference === "Day" && <Sun className="h-3 w-3 text-yellow-600" />}
                          {player.dayNightPreference === "Night" && <Moon className="h-3 w-3 text-blue-600" />}
                          {player.dayNightPreference === "Neutral" && <Activity className="h-3 w-3 text-gray-600" />}
                          <span className="text-xs">{player.dayNightPreference}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {player.offDayStrategy}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {player.travelDays > 0 ? (
                          <Badge variant="outline" className="text-xs">
                            <Plane className="h-3 w-3 mr-1" />
                            {player.travelDays}d
                          </Badge>
                        ) : (
                          <span className="text-xs text-muted-foreground">None</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">
                          {player.recommendedAction}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance-patterns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Pattern Analysis</CardTitle>
              <CardDescription>
                Individual player analytics for tactical decision-making
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {performancePatterns.map((pattern) => (
                  <div key={pattern.playerId} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">{pattern.playerName}</h3>
                      <Badge variant="outline">{pattern.pattern}</Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {pattern.dayGames.avg.toFixed(3)}
                        </div>
                        <div className="text-sm text-muted-foreground">Day Games</div>
                        <div className="text-xs text-muted-foreground">
                          {pattern.dayGames.games} games
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {pattern.dayGames.trend}
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {pattern.nightGames.avg.toFixed(3)}
                        </div>
                        <div className="text-sm text-muted-foreground">Night Games</div>
                        <div className="text-xs text-muted-foreground">
                          {pattern.nightGames.games} games
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {pattern.nightGames.trend}
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {pattern.postRest.avg.toFixed(3)}
                        </div>
                        <div className="text-sm text-muted-foreground">Post Rest</div>
                        <div className="text-xs text-muted-foreground">
                          {pattern.postRest.games} games
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {pattern.postRest.trend}
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">
                          {pattern.consecutiveGames.avg.toFixed(3)}
                        </div>
                        <div className="text-sm text-muted-foreground">Consecutive</div>
                        <div className="text-xs text-muted-foreground">
                          {pattern.consecutiveGames.games} games
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {pattern.consecutiveGames.trend}
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="text-2xl font-bold text-indigo-600">
                          {pattern.postOffDay.avg.toFixed(3)}
                        </div>
                        <div className="text-sm text-muted-foreground">Post Off-Day</div>
                        <div className="text-xs text-muted-foreground">
                          {pattern.postOffDay.games} games
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {pattern.postOffDay.trend}
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">
                          {pattern.travelGames.avg.toFixed(3)}
                        </div>
                        <div className="text-sm text-muted-foreground">Travel Games</div>
                        <div className="text-xs text-muted-foreground">
                          {pattern.travelGames.games} games
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {pattern.travelGames.trend}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Optimal Rest Days:</span> {pattern.optimalRestDays}
                        </div>
                        <div>
                          <span className="font-medium">Performance Drop Threshold:</span> {pattern.performanceDropThreshold} games
                        </div>
                        <div>
                          <span className="font-medium">Pattern Type:</span> {pattern.pattern.split(' ')[0]}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upcoming-matchups" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Series & Strategic Planning</CardTitle>
              <CardDescription>
                Strategic preparation for upcoming opponents with travel and rest considerations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {upcomingMatchups.map((matchup) => (
                  <div key={matchup.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{matchup.opponent}</h3>
                          <Badge className={
                            matchup.seriesType === "Home" ? "bg-green-100 text-green-800 border-green-200" :
                            "bg-blue-100 text-blue-800 border-blue-200"
                          }>
                            {matchup.seriesType}
                          </Badge>
                          <Badge className={
                            matchup.opponentStrength === "Strong" ? "bg-red-100 text-red-800 border-red-200" :
                            matchup.opponentStrength === "Average" ? "bg-yellow-100 text-yellow-800 border-yellow-200" :
                            "bg-green-100 text-green-800 border-green-200"
                          }>
                            {matchup.opponentStrength}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {matchup.startDate} - {matchup.endDate} • {matchup.games} games
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge className={
                          matchup.strategicImportance === "High" ? "bg-red-100 text-red-800 border-red-200" :
                          matchup.strategicImportance === "Medium" ? "bg-orange-100 text-orange-800 border-orange-200" :
                          "bg-blue-100 text-blue-800 border-blue-200"
                        }>
                          {matchup.strategicImportance} Priority
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {matchup.dayGames}
                        </div>
                        <div className="text-sm text-muted-foreground">Day Games</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {matchup.nightGames}
                        </div>
                        <div className="text-sm text-muted-foreground">Night Games</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">
                          {matchup.travelDays}
                        </div>
                        <div className="text-sm text-muted-foreground">Travel Days</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {matchup.timeZoneChange || "None"}
                        </div>
                        <div className="text-sm text-muted-foreground">Time Zone</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-sm mb-2">Rest Recommendations</h4>
                        <ul className="space-y-1">
                          {matchup.restRecommendations.map((rec, index) => (
                            <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm mb-2">Key Players</h4>
                        <div className="flex flex-wrap gap-1">
                          {matchup.keyPlayers.map((player) => (
                            <Badge key={player} variant="outline" className="text-xs">
                              {player}
                            </Badge>
                          ))}
                        </div>
                        {matchup.weatherConsiderations && (
                          <div className="mt-3">
                            <h4 className="font-medium text-sm mb-1">Weather Considerations</h4>
                            <p className="text-sm text-muted-foreground">{matchup.weatherConsiderations}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Series Summary
                </CardTitle>
                <CardDescription>
                  Overview of upcoming schedule challenges
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Total Away Games</span>
                    <Badge variant="outline">
                      {upcomingMatchups.filter(m => m.seriesType === "Away").length}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Travel Days</span>
                    <Badge variant="outline">
                      {upcomingMatchups.reduce((sum, m) => sum + m.travelDays, 0)}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Strong Opponents</span>
                    <Badge variant="outline" className="text-red-700 border-red-200">
                      {upcomingMatchups.filter(m => m.opponentStrength === "Strong").length}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">High Priority Series</span>
                    <Badge variant="outline" className="text-red-700 border-red-200">
                      {upcomingMatchups.filter(m => m.strategicImportance === "High").length}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Strategic Focus
                </CardTitle>
                <CardDescription>
                  Key areas requiring attention
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm font-medium text-blue-800">West Coast Trip Preparation</p>
                    <p className="text-xs text-blue-600">Dodgers series requires extended travel planning</p>
                  </div>
                  <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <p className="text-sm font-medium text-orange-800">Holiday Weekend Management</p>
                    <p className="text-xs text-orange-600">Cubs series over July 4th - expect large crowds</p>
                  </div>
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm font-medium text-green-800">Day Game Optimization</p>
                    <p className="text-xs text-green-600">Multiple day games - leverage player preferences</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tactical-scenarios" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tactical Scenarios & Recommendations</CardTitle>
              <CardDescription>
                Real-world tactical situations requiring strategic rest management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tacticalScenarios.map((scenario) => (
                  <div key={scenario.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{scenario.title}</h3>
                        <p className="text-sm text-muted-foreground">{scenario.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={
                          scenario.impact === "High" ? "bg-red-100 text-red-800 border-red-200" :
                          scenario.impact === "Medium" ? "bg-orange-100 text-orange-800 border-orange-200" :
                          "bg-blue-100 text-blue-800 border-blue-200"
                        }>
                          {scenario.impact} Impact
                        </Badge>
                        <Badge className={getUrgencyColor(scenario.urgency)}>
                          {scenario.urgency}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <span className="font-medium text-sm">Recommendation:</span>
                        <p className="text-sm text-muted-foreground">{scenario.recommendation}</p>
                      </div>
                      <div>
                        <span className="font-medium text-sm">Players Affected:</span>
                        <div className="flex gap-1 mt-1">
                          {scenario.players.map((player) => (
                            <Badge key={player} variant="outline" className="text-xs">
                              {player}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="strategic-planning" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Playoff Push Analysis
                </CardTitle>
                <CardDescription>
                  Strategic planning for playoff qualification
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Current Win Probability</span>
                    <Badge className="bg-green-100 text-green-800">68%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">With Optimal Rest</span>
                    <Badge className="bg-blue-100 text-blue-800">72%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Risk of Overuse</span>
                    <Badge className="bg-red-100 text-red-800">High</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Games Remaining</span>
                    <Badge variant="outline">{midSeasonStats.gamesRemaining}</Badge>
                  </div>
                  <Progress value={68} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  AI Tactical Recommendations
                </CardTitle>
                <CardDescription>
                  Data-driven lineup optimization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm font-medium text-blue-800">Rest David Bednar</p>
                    <p className="text-xs text-blue-600">High fatigue detected, 2-day rest recommended before off-day</p>
                  </div>
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm font-medium text-green-800">Start Oneil Cruz in Night Games</p>
                    <p className="text-xs text-green-600">Optimal performance pattern for night games this week</p>
                  </div>
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm font-medium text-yellow-800">Stagger Ke'Bryan Hayes Rest</p>
                    <p className="text-xs text-yellow-600">Consider rest day to prevent consecutive game decline</p>
                  </div>
                  <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                    <p className="text-sm font-medium text-purple-800">Optimize Off-Day Strategy</p>
                    <p className="text-xs text-purple-600">Pre-rest for high fatigue, post-rest for optimal performers</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Strategic Timeline</CardTitle>
              <CardDescription>
                Long-term tactical planning for player health and team success
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 border rounded-lg">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium">Week 1-2: Rest Management</p>
                    <p className="text-sm text-muted-foreground">Focus on high-fatigue players, optimize rest days around off-days</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 border rounded-lg">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium">Week 3-4: Performance Optimization</p>
                    <p className="text-sm text-muted-foreground">Leverage day/night game patterns, strategic matchups, travel considerations</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 border rounded-lg">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium">Week 5-6: Playoff Preparation</p>
                    <p className="text-sm text-muted-foreground">Peak performance timing, injury prevention focus, roster optimization</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 