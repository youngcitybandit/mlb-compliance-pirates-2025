"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertCircle, ArrowUpRight, Bell, TrendingDown } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

type Position = "C" | "1B" | "2B" | "3B" | "SS" | "OF" | "SP" | "RP" | "CL"
type PlayerType = "hitter" | "pitcher"
type DeclineSeverity = "Severe" | "Moderate" | "Mild"

interface UnderperformanceTrigger {
  type: string
  description: string
  change: string
  severity: DeclineSeverity
  potentialCauses: string[]
}

export interface Player {
  // Export Player interface
  id: string
  name: string
  number: string
  position: Position
  playerType: PlayerType
  age: number
  declineSeverity: DeclineSeverity
  declineScore: number
  lastTested: string
  triggers: UnderperformanceTrigger[]
  imageUrl: string
}

export const players: Player[] = [
  {
    id: "103",
    name: "Chris Davis",
    number: "2",
    position: "SS",
    playerType: "hitter",
    age: 26,
    declineSeverity: "Mild",
    declineScore: 45,
    lastTested: "May 15, 2025",
    triggers: [
      {
        type: "OBP Drop",
        description: "On-base percentage decline",
        change: "-.030",
        severity: "Mild",
        potentialCauses: ["Plate Discipline", "Slump"],
      },
    ],
    imageUrl: "/baseball-shortstop.png",
  },
  {
    id: "104",
    name: "Daniel Green",
    number: "47",
    position: "1B",
    playerType: "hitter",
    age: 35,
    declineSeverity: "Severe",
    declineScore: 85,
    lastTested: "May 18, 2025",
    triggers: [
      {
        type: "SLG Drop",
        description: "Slugging percentage significantly lower",
        change: "-.090",
        severity: "Severe",
        potentialCauses: ["Age-related Decline", "Injury", "Loss of Bat Speed"],
      },
      {
        type: "Exit Velocity Drop",
        description: "Average exit velocity decrease",
        change: "-2.5 mph",
        severity: "Severe",
        potentialCauses: ["Injury", "Fatigue", "Age"],
      },
      {
        type: "K% Increase",
        description: "Strikeout rate increased significantly",
        change: "+5.0%",
        severity: "Severe",
        potentialCauses: ["Timing Issues", "Injury", "Declining Bat Speed"],
      },
      {
        type: "OPS Decline",
        description: "On-base plus slugging percentage dropped",
        change: "-.060",
        severity: "Severe",
        potentialCauses: ["Overall Decline", "Injury", "Plate Discipline"],
      }
    ],
    imageUrl: "/baseball-player-first-base.png",
  },
  {
    id: "105",
    name: "Ethan White",
    number: "27",
    position: "C",
    playerType: "hitter",
    age: 29,
    declineSeverity: "Moderate",
    declineScore: 60,
    lastTested: "May 20, 2025",
    triggers: [
      {
        type: "RBI Drop",
        description: "Runs batted in production significantly down",
        change: "-15 RBI pace",
        severity: "Moderate",
        potentialCauses: ["Team Performance", "Slump"],
      },
    ],
    imageUrl: "/baseball-catcher.png",
  },
  {
    id: "107", // Spencer Strider
    name: "Spencer Strider",
    number: "99",
    position: "SP",
    playerType: "pitcher",
    age: 26,
    declineSeverity: "Severe",
    declineScore: 92,
    lastTested: "May 4, 2025",
    triggers: [
      {
        type: "ERA Increase",
        description: "Earned run average significantly higher than prior year",
        change: "+5.40",
        severity: "Severe",
        potentialCauses: ["Injury", "Fatigue", "Loss of Stuff"],
      },
      {
        type: "Velocity Drop",
        description: "Fastball velocity decrease",
        change: "-3.0 mph",
        severity: "Severe",
        potentialCauses: ["Injury", "Fatigue"],
      },
      {
        type: "K% Drop",
        description: "Strikeout rate decrease",
        change: "-15.0%",
        severity: "Severe",
        potentialCauses: ["Velocity Drop", "Pitch Mix Changes", "Injury"],
      },
      {
        type: "Spin Rate Decline",
        description: "Spin rate decrease on breaking ball",
        change: "-300 rpm",
        severity: "Severe",
        potentialCauses: ["Injury", "Weakened Rotator Cuff"],
      },
    ],
    imageUrl: "/spencer-strider.png",
  },
]

export function UnderperformingPlayersTable({ filter = "all" }: { filter?: string }) {
  const [underperformanceData, setUnderperformanceData] = useState<Player[]>(() => {
    if (filter === "all") return players
    if (filter === "hitters") return players.filter((p) => p.playerType === "hitter")
    if (filter === "pitchers") return players.filter((p) => p.playerType === "pitcher")
    if (filter === "significant-decline") return players.filter((p) => p.declineSeverity === "Severe")
    return players
  })

  const getDeclineSeverityBadge = (severity: DeclineSeverity) => {
    switch (severity) {
      case "Severe":
        return (
          <div className="flex flex-col items-start gap-1">
            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
              <AlertCircle className="h-3 w-3 mr-1" />
              Severe
            </Badge>
            <span className="font-bold text-red-600">Injury Risk</span>
          </div>
        )
      case "Moderate":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            <AlertCircle className="h-3 w-3 mr-1" />
            Moderate
          </Badge>
        )
      case "Mild":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Mild
          </Badge>
        )
      default:
        return <Badge variant="outline">{severity}</Badge>
    }
  }

  const getDeclineScoreColor = (score: number) => {
    if (score >= 75) return "bg-red-500"
    if (score >= 50) return "bg-amber-500"
    if (score >= 25) return "bg-yellow-500"
    return "bg-green-500" // For very low decline scores
  }

  const getPitcherMetric = (player: Player, type: string) => {
    if (player.playerType !== "pitcher") return "N/A"
    const trigger = player.triggers.find((t) => t.type === type)
    return trigger ? trigger.change : "-"
  }

  function cls(player: Player, t: string) {
    return player.playerType === "pitcher" && getPitcherMetric(player, t).startsWith("-") ? "text-red-600" : ""
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {[
              <TableHead key="player" className="w-[250px]">
                Player
              </TableHead>,
              <TableHead key="pos">Position</TableHead>,
              <TableHead key="age">Age</TableHead>,
              <TableHead key="severity">Decline Severity</TableHead>,
              <TableHead key="score">Decline Score</TableHead>,
              <TableHead key="trig">Underperformance Triggers</TableHead>,
              <TableHead key="actions" className="text-right">
                Actions
              </TableHead>,
            ]}
          </TableRow>
        </TableHeader>
        <TableBody>
          {underperformanceData.map((p) => (
            <TableRow key={p.id}>
              {[
                /* Player cell (avatar block) */
                <TableCell key="pl">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 rounded-md">
                      <AvatarImage src={p.imageUrl || "/placeholder.svg"} alt={p.name} />
                      <AvatarFallback className="rounded-md bg-pirates-yellow text-pirates-black">
                        {p.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{p.name}</span>
                        <span className="text-xs text-muted-foreground">#{p.number}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">Last tested: {p.lastTested}</span>
                    </div>
                  </div>
                </TableCell>,

                <TableCell key="pos">{p.position}</TableCell>,
                <TableCell key="age">{p.age}</TableCell>,
                <TableCell key="sev">{getDeclineSeverityBadge(p.declineSeverity)}</TableCell>,
                <TableCell key="score">
                  <div className="flex items-center gap-2">
                    <Progress
                      value={p.declineScore}
                      className="h-2 w-14"
                      indicatorClassName={getDeclineScoreColor(p.declineScore)}
                    />
                    <span className="text-sm">{p.declineScore}</span>
                  </div>
                </TableCell>,
                <TableCell key="trig">
                  <div className="flex flex-wrap gap-1">
                    {p.triggers.map((trigger, index) => (
                      <TooltipProvider key={index}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Badge
                              variant="outline"
                              className={
                                trigger.severity === "Severe"
                                  ? "bg-red-50 text-red-700 border-red-200 cursor-help"
                                  : "bg-amber-50 text-amber-700 border-amber-200 cursor-help"
                              }
                            >
                              {trigger.type === "K% Increase" ? (
                                <>
                                  <TrendingDown className="h-3 w-3 mr-1 rotate-180" />
                                  {trigger.type}
                                </>
                              ) : (
                                <>
                                  <TrendingDown className="h-3 w-3 mr-1" />
                                  {trigger.type}
                                </>
                              )}
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent className="w-80">
                            <div className="space-y-2">
                              <p className="font-medium">{trigger.description}</p>
                              <div className="font-medium text-sm">
                                Change: <span className="text-red-600">{trigger.change}</span>
                              </div>
                              {trigger.potentialCauses && (
                                <div className="mt-2 pt-2 border-t border-gray-200">
                                  <p className="text-xs font-medium text-muted-foreground mb-1">Potential Causes:</p>
                                  <div className="flex flex-wrap gap-1">
                                    {trigger.potentialCauses.map((cause, i) => (
                                      <Badge key={i} variant="outline" className="text-xs">
                                        {cause}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>
                </TableCell>,
                <TableCell key="act" className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                      <Bell className="h-4 w-4 mr-1" />
                      Send Notification
                    </Button>
                    <Link
                      href={`/statistical-decline-details/${p.playerType === "pitcher" ? "pitcher" : "hitter"}/${p.id}`}
                    >
                      <Button size="sm">
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </Link>
                  </div>
                </TableCell>,
              ]}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
