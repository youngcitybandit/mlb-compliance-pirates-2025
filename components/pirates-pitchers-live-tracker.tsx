"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Target, 
  Zap,
  RotateCcw,
  AlertCircle,
  CheckCircle2,
  PlayCircle,
  Users,
  Pencil
} from "lucide-react"
import { toast } from "sonner"
import { getTodaysGame, getNextScheduledGame, shouldGameBeActive, getPitcherByName } from "@/data/pirates-schedule"

interface PitcherGameData {
  id: string
  name: string
  number: string
  position: "SP" | "RP" | "CP"
  imageUrl: string
  gameStatus: "scheduled" | "active" | "completed" | "not-playing"
  gameTime?: string
  opponent?: string
  inning?: number
  pitchCount?: number
  currentStats: {
    era: string
    whip: string
    so: number
    ip: number
    avgVelocity: string
    maxVelocity: string
    spinRate: string
  }
  liveData?: {
    currentVelocity: string
    currentSpinRate: number
    strikes: number
    balls: number
    outs: number
    lastPitch: {
      type: string
      velocity: string
      result: string
    }
  }
  complianceStatus: "Clear" | "Pending" | "Attention"
  riskLevel: "Low" | "Medium" | "High"
  pitches?: {
    pitchNum: number
    inning: number
    type: string
    velocity: string
    spinRate: number
    result: string
    notified?: boolean
  }[]
}

// Mock data for Pirates pitchers with today's game schedule
const piratesPitchers: PitcherGameData[] = [
  {
    id: "108",
    name: "Paul Skenes",
    number: "30",
    position: "SP",
    imageUrl: "/paul-skenes.png",
    gameStatus: "completed",
    gameTime: "7:05 PM",
    opponent: "vs Cincinnati Reds",
    inning: 4,
    pitchCount: 67,
    currentStats: {
      era: "2.12",
      whip: "0.91",
      so: 110,
      ip: 106,
      avgVelocity: "99.2",
      maxVelocity: "101.3",
      spinRate: "2450"
    },
    liveData: {
      currentVelocity: "99.8",
      currentSpinRate: 2480,
      strikes: 42,
      balls: 25,
      outs: 2,
      lastPitch: {
        type: "4-Seam Fastball",
        velocity: "99.8",
        result: "Strike"
      }
    },
    complianceStatus: "Clear",
    riskLevel: "Low"
  },
  {
    id: "4",
    name: "Mitch Keller",
    number: "23",
    position: "SP",
    imageUrl: "/baseball-pitcher.png",
    gameStatus: "scheduled",
    gameTime: "Tomorrow 1:35 PM",
    opponent: "vs Cincinnati Reds",
    currentStats: {
      era: "3.45",
      whip: "1.25",
      so: 95,
      ip: 120,
      avgVelocity: "94.1",
      maxVelocity: "96.8",
      spinRate: "2200"
    },
    complianceStatus: "Clear",
    riskLevel: "Low"
  },
  {
    id: "5",
    name: "David Bednar",
    number: "51",
    position: "CP",
    imageUrl: "/baseball-pitcher.png",
    gameStatus: "not-playing",
    currentStats: {
      era: "2.10",
      whip: "0.95",
      so: 45,
      ip: 35,
      avgVelocity: "96.2",
      maxVelocity: "98.5",
      spinRate: "2350"
    },
    complianceStatus: "Attention",
    riskLevel: "High"
  },
  {
    id: "109",
    name: "Jared Jones",
    number: "35",
    position: "SP",
    imageUrl: "/baseball-pitcher.png",
    gameStatus: "completed",
    gameTime: "Yesterday",
    opponent: "vs Cincinnati Reds",
    currentStats: {
      era: "3.25",
      whip: "1.15",
      so: 85,
      ip: 95,
      avgVelocity: "95.8",
      maxVelocity: "98.2",
      spinRate: "2280"
    },
    complianceStatus: "Clear",
    riskLevel: "Low"
  },
  {
    id: "110",
    name: "Bailey Falter",
    number: "28",
    position: "SP",
    imageUrl: "/baseball-pitcher.png",
    gameStatus: "not-playing",
    currentStats: {
      era: "4.15",
      whip: "1.35",
      so: 65,
      ip: 85,
      avgVelocity: "92.5",
      maxVelocity: "94.8",
      spinRate: "2100"
    },
    complianceStatus: "Clear",
    riskLevel: "Medium"
  }
]

// Add pitch log simulation to each active pitcher
function generateInitialPitches() {
  // Simulate 4 innings, 15 pitches per inning
  const pitchTypes = ["4-Seam Fastball", "Slider", "Changeup", "Curveball"];
  const results = ["Strike", "Ball", "Foul", "In Play"];
  let pitches = [];
  let pitchNum = 1;
  for (let inning = 1; inning <= 4; inning++) {
    for (let i = 0; i < 15; i++) {
      const type = pitchTypes[Math.floor(Math.random() * pitchTypes.length)];
      const velocity = (98 + Math.random() * 3).toFixed(1);
      const spinRate = Math.floor(2400 + Math.random() * 200);
      const result = results[Math.floor(Math.random() * results.length)];
      pitches.push({
        pitchNum: pitchNum++,
        inning,
        type,
        velocity,
        spinRate,
        result,
      });
    }
  }
  return pitches;
}

export function PiratesPitchersLiveTracker() {
  const [pitchers, setPitchers] = useState<PitcherGameData[]>(() => {
    // Initialize with all pitchers as not playing
    const initialPitchers = piratesPitchers.map(p => ({
      ...p,
      gameStatus: "not-playing" as const,
      gameTime: undefined,
      opponent: undefined,
      inning: undefined,
      pitchCount: undefined,
      liveData: undefined,
      pitches: undefined
    }))
    return initialPitchers
  })
  const [selectedPitcher, setSelectedPitcher] = useState<PitcherGameData | null>(null)
  const [currentGame, setCurrentGame] = useState<any>(null)

  // Check schedule and activate games automatically
  useEffect(() => {
    const checkSchedule = () => {
      const todaysGame = getTodaysGame();
      const nextGame = getNextScheduledGame();
      
      if (todaysGame && shouldGameBeActive(todaysGame)) {
        // Game should be active - activate the probable pitcher
        const pitcherId = getPitcherByName(todaysGame.probablePitcher || "")
        if (pitcherId) {
          setPitchers(prevPitchers =>
            prevPitchers.map(pitcher => {
              if (pitcher.id === pitcherId) {
                return {
                  ...pitcher,
                  gameStatus: "active",
                  gameTime: todaysGame.time,
                  opponent: todaysGame.opponent,
                  inning: 1,
                  pitchCount: 0,
                  liveData: {
                    currentVelocity: "99.2",
                    currentSpinRate: 2450,
                    strikes: 0,
                    balls: 0,
                    outs: 0,
                    lastPitch: {
                      type: "4-Seam Fastball",
                      velocity: "99.2",
                      result: "Ball"
                    }
                  },
                  pitches: []
                }
              }
              return pitcher
            })
          )
          
          setCurrentGame(todaysGame)
          
          // Send game start notification
          const message = `Game started! Tracking ${todaysGame.probablePitcher} vs ${todaysGame.opponent}`
          toast.success(message)
          
          // Send SMS notification
          fetch('/api/notify-sms', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
          }).catch(console.error)
        }
      } else if (todaysGame && todaysGame.status === "completed") {
        // Game is completed
        setPitchers(prevPitchers =>
          prevPitchers.map(pitcher => {
            if (pitcher.gameStatus === "active") {
              return { ...pitcher, gameStatus: "completed" as const }
            }
            return pitcher
          })
        )
        setCurrentGame(null)
      }
    }

    // Check schedule immediately
    checkSchedule()
    
    // Check every minute for game status changes
    const interval = setInterval(checkSchedule, 60000)
    
    // Check for probable pitcher updates every hour
    const checkProbablePitchers = async () => {
      try {
        const response = await fetch('/api/update-probable-pitchers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        })
        const data = await response.json()
        if (data.success && data.updatedGames?.length > 0) {
          console.log('Updated probable pitchers:', data.updatedGames)
        }
      } catch (error) {
        console.error('Error checking probable pitchers:', error)
      }
    }
    
    // Check probable pitchers every hour
    const probablePitcherInterval = setInterval(checkProbablePitchers, 60 * 60 * 1000)
    
    // Initial check for probable pitchers
    checkProbablePitchers()

    return () => {
      clearInterval(interval)
      clearInterval(probablePitcherInterval)
    }
  }, [])

  // Simulate real-time pitch updates for active pitchers
  useEffect(() => {
    const interval = setInterval(() => {
      setPitchers(prevPitchers =>
        prevPitchers.map(pitcher => {
          if (pitcher.gameStatus === "active" && pitcher.liveData) {
            // Add a new pitch to the log
            const lastPitchNum = pitcher.pitches?.length ? pitcher.pitches[pitcher.pitches.length - 1].pitchNum : 0;
            const inning = pitcher.inning || 1;
            const pitchTypes = ["4-Seam Fastball", "Slider", "Changeup", "Curveball"];
            const results = ["Strike", "Ball", "Foul", "In Play"];
            const type = pitchTypes[Math.floor(Math.random() * pitchTypes.length)];
            const velocity = (98 + Math.random() * 3).toFixed(1);
            const spinRate = Math.floor(2400 + Math.random() * 200);
            const result = results[Math.floor(Math.random() * results.length)];
            const newPitch = {
              pitchNum: lastPitchNum + 1,
              inning,
              type,
              velocity,
              spinRate,
              result,
            };
            return {
              ...pitcher,
              liveData: {
                ...pitcher.liveData,
                currentVelocity: velocity,
                currentSpinRate: spinRate,
                strikes: pitcher.liveData.strikes + (result === "Strike" ? 1 : 0),
                balls: pitcher.liveData.balls + (result === "Ball" ? 1 : 0),
                lastPitch: {
                  type,
                  velocity,
                  result,
                },
              },
              pitches: [...(pitcher.pitches || []), newPitch],
            };
          }
          return pitcher;
        })
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    pitchers.forEach((pitcher) => {
      if (!pitcher.pitches || pitcher.pitches.length < 2) return;
      // Find the most recent fastball
      const fastballs = pitcher.pitches.filter(p => p.type.toLowerCase().includes("fastball"));
      if (fastballs.length < 2) return;
      const lastPitch = fastballs[fastballs.length - 1];
      if (lastPitch.notified) return;
      // Calculate rolling averages excluding the last pitch
      const prevFastballs = fastballs.slice(0, -1);
      const avgVelocity = prevFastballs.reduce((sum, p) => sum + parseFloat(p.velocity), 0) / prevFastballs.length;
      const avgSpin = prevFastballs.reduce((sum, p) => sum + (p.spinRate || 0), 0) / prevFastballs.length;
      const velocityDelta = avgVelocity - parseFloat(lastPitch.velocity);
      const spinDelta = avgSpin - lastPitch.spinRate;
      if (velocityDelta >= 2) {
        const msg = `Warning: ${pitcher.name} has thrown a ${lastPitch.type} at ${lastPitch.velocity} mph that is ${velocityDelta.toFixed(1)} below his average.`;
        toast(msg);
        fetch('/api/notify-sms', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: msg })
        });
        lastPitch.notified = true;
      } else if (spinDelta >= 200) {
        toast(
          `${pitcher.name} threw a fastball with ${lastPitch.spinRate} rpm spin, which is ${spinDelta.toFixed(0)} rpm below their rolling average (${avgSpin.toFixed(0)} rpm)`
        );
        fetch('/api/notify-sms', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: `${pitcher.name} threw a fastball with ${lastPitch.spinRate} rpm spin, which is ${spinDelta.toFixed(0)} rpm below their rolling average (${avgSpin.toFixed(0)} rpm)`
          })
        });
        lastPitch.notified = true;
      }
    });
  }, [pitchers]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800 border-green-200"
      case "scheduled": return "bg-blue-100 text-blue-800 border-blue-200"
      case "completed": return "bg-gray-100 text-gray-800 border-gray-200"
      case "not-playing": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getComplianceColor = (status: string) => {
    switch (status) {
      case "Clear": return "bg-green-100 text-green-800 border-green-200"
      case "Pending": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Attention": return "bg-red-100 text-red-800 border-red-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case "Low": return "bg-green-100 text-green-800 border-green-200"
      case "Medium": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "High": return "bg-red-100 text-red-800 border-red-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const activePitchers = pitchers.filter(p => p.gameStatus === "active")
  const scheduledPitchers = pitchers.filter(p => p.gameStatus === "scheduled")
  const otherPitchers = pitchers.filter(p => p.gameStatus === "not-playing" || p.gameStatus === "completed")

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-pirates-yellow" />
              Pirates Pitchers Live Tracker
            </CardTitle>
            <div className="flex items-center gap-2">
              {currentGame ? (
                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                  <Activity className="h-3 w-3 mr-1 animate-pulse" />
                  Live: {currentGame.probablePitcher} vs {currentGame.opponent}
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">
                  <Clock className="h-3 w-3 mr-1" />
                  {getNextScheduledGame() ? `Next: ${getNextScheduledGame()?.probablePitcher} ${getNextScheduledGame()?.date}` : "No games scheduled"}
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active" className="flex items-center gap-2">
            <PlayCircle className="h-4 w-4" />
            Active ({activePitchers.length})
          </TabsTrigger>
          <TabsTrigger value="scheduled" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Scheduled ({scheduledPitchers.length})
          </TabsTrigger>
          <TabsTrigger value="roster" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Full Roster ({otherPitchers.length})
          </TabsTrigger>
        </TabsList>

        {/* Active Pitchers Tab */}
        <TabsContent value="active" className="space-y-8">
          {pitchers.filter(p => p.gameStatus === "active").length === 0 ? (
            <Card>
              <CardContent className="flex items-center justify-center p-8">
                <div className="text-center">
                  <span className="text-lg text-muted-foreground">No active game. Live tracker is off.</span>
                </div>
              </CardContent>
            </Card>
          ) : (
            pitchers.filter(p => p.gameStatus === "active").map((pitcher) => (
              <Card key={pitcher.id} className="border-green-200 bg-green-50/30">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={pitcher.imageUrl} alt={pitcher.name} />
                        <AvatarFallback className="bg-pirates-yellow text-pirates-black">
                          {pitcher.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{pitcher.name} #{pitcher.number}</h3>
                        <p className="text-sm text-muted-foreground">
                          {pitcher.position} • {pitcher.opponent}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={getStatusColor(pitcher.gameStatus)}>
                        <Activity className="h-3 w-3 mr-1 animate-pulse" />
                        Inning {pitcher.inning}
                      </Badge>
                      <Badge variant="outline" className={getComplianceColor(pitcher.complianceStatus)}>
                        {pitcher.complianceStatus}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Rolling Averages for Fastballs */}
                  {(() => {
                    const fastballs = (pitcher.pitches || []).filter(p => p.type.toLowerCase().includes("fastball"));
                    const avgVelocity = fastballs.length ? (fastballs.reduce((sum, p) => sum + parseFloat(p.velocity), 0) / fastballs.length).toFixed(1) : "--";
                    const avgSpin = fastballs.length ? (fastballs.reduce((sum, p) => sum + (p.spinRate || 0), 0) / fastballs.length).toFixed(0) : "--";
                    return (
                      <div className="flex flex-wrap gap-6 mb-4">
                        <div className="flex flex-col items-center">
                          <span className="text-xs text-muted-foreground">Rolling Avg Fastball MPH</span>
                          <span className="text-2xl font-bold text-blue-700">{avgVelocity}</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="text-xs text-muted-foreground">Rolling Avg Fastball Spin Rate</span>
                          <span className="text-2xl font-bold text-green-700">{avgSpin}</span>
                        </div>
                      </div>
                    );
                  })()}
                  {/* Pitch Log Table */}
                  <div className="overflow-x-auto mt-4">
                    <table className="min-w-full text-xs border">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="px-2 py-1 border">#</th>
                          <th className="px-2 py-1 border">Inning</th>
                          <th className="px-2 py-1 border">Type</th>
                          <th className="px-2 py-1 border">Velocity</th>
                          <th className="px-2 py-1 border">Spin Rate</th>
                          <th className="px-2 py-1 border">Result</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pitcher.pitches && [...pitcher.pitches].reverse().map((pitch) => (
                          <tr key={pitch.pitchNum} className="text-center">
                            <td className="border px-2 py-1">{pitch.pitchNum}</td>
                            <td className="border px-2 py-1">{pitch.inning}</td>
                            <td className="border px-2 py-1">{pitch.type}</td>
                            <td className="border px-2 py-1">{pitch.velocity}</td>
                            <td className="border px-2 py-1">{pitch.spinRate}</td>
                            <td className="border px-2 py-1">{pitch.result}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {/* End Pitch Log Table */}
                  {/* Existing live data summary */}
                  {pitcher.liveData && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{pitcher.liveData.currentVelocity}</div>
                        <div className="text-sm text-muted-foreground">Velocity (mph)</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{pitcher.liveData.currentSpinRate}</div>
                        <div className="text-sm text-muted-foreground">Spin Rate (rpm)</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">{pitcher.liveData.strikes}-{pitcher.liveData.balls}</div>
                        <div className="text-sm text-muted-foreground">Strikes-Balls</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">{pitcher.pitchCount}</div>
                        <div className="text-sm text-muted-foreground">Pitches</div>
                      </div>
                    </div>
                  )}
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Last Pitch:</span>
                      <span className="font-medium">
                        {pitcher.liveData?.lastPitch.type} - {pitcher.liveData?.lastPitch.velocity} mph ({pitcher.liveData?.lastPitch.result})
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        {/* Scheduled Pitchers Tab */}
        <TabsContent value="scheduled" className="space-y-4">
          {scheduledPitchers.map((pitcher) => (
            <Card key={pitcher.id} className="border-blue-200 bg-blue-50/30">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={pitcher.imageUrl} alt={pitcher.name} />
                      <AvatarFallback className="bg-pirates-yellow text-pirates-black">
                        {pitcher.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{pitcher.name} #{pitcher.number}</h3>
                      <p className="text-sm text-muted-foreground">
                        {pitcher.position} • {pitcher.opponent} • {pitcher.gameTime}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={getStatusColor(pitcher.gameStatus)}>
                      <Clock className="h-3 w-3 mr-1" />
                      Scheduled
                    </Badge>
                    <Badge variant="outline" className={getComplianceColor(pitcher.complianceStatus)}>
                      {pitcher.complianceStatus}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">{pitcher.currentStats.era}</div>
                    <div className="text-sm text-muted-foreground">ERA</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">{pitcher.currentStats.whip}</div>
                    <div className="text-sm text-muted-foreground">WHIP</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600">{pitcher.currentStats.so}</div>
                    <div className="text-sm text-muted-foreground">SO</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-orange-600">{pitcher.currentStats.avgVelocity}</div>
                    <div className="text-sm text-muted-foreground">Avg Velo</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Full Roster Tab */}
        <TabsContent value="roster" className="space-y-4">
          {otherPitchers.map((pitcher) => (
            <Card key={pitcher.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={pitcher.imageUrl} alt={pitcher.name} />
                      <AvatarFallback className="bg-pirates-yellow text-pirates-black">
                        {pitcher.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{pitcher.name} #{pitcher.number}</h3>
                      <p className="text-sm text-muted-foreground">
                        {pitcher.position} • {pitcher.gameStatus === "completed" ? pitcher.gameTime : "Not in today's lineup"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={getStatusColor(pitcher.gameStatus)}>
                      {pitcher.gameStatus === "completed" ? "Final" : "Not Playing"}
                    </Badge>
                    <Badge variant="outline" className={getComplianceColor(pitcher.complianceStatus)}>
                      {pitcher.complianceStatus}
                    </Badge>
                    <Badge variant="outline" className={getRiskColor(pitcher.riskLevel)}>
                      {pitcher.riskLevel} Risk
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">{pitcher.currentStats.era}</div>
                    <div className="text-sm text-muted-foreground">ERA</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">{pitcher.currentStats.whip}</div>
                    <div className="text-sm text-muted-foreground">WHIP</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600">{pitcher.currentStats.so}</div>
                    <div className="text-sm text-muted-foreground">SO</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-orange-600">{pitcher.currentStats.avgVelocity}</div>
                    <div className="text-sm text-muted-foreground">Avg Velo</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
} 