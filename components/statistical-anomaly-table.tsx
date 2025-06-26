"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertTriangle, ArrowUpRight, Bell, CheckCircle2, TrendingUp } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { players, Player, RiskLevel } from "@/data/statistical-anomaly-players"

export function StatisticalAnomalyTable({ filter = "all" }: { filter?: string }) {
  const [anomalyData, setAnomalyData] = useState<Player[]>(() => {
    if (filter === "all") return players.slice(0, 5)
    if (filter === "hitters") return players.filter((p) => p.playerType === "hitter").slice(0, 5)
    if (filter === "pitchers") return players.filter((p) => p.playerType === "pitcher").slice(0, 5)
    if (filter === "high-risk") return players.filter((p) => p.riskLevel === "High").slice(0, 5)
    return players.slice(0, 5)
  })

  const getRiskLevelBadge = (level: RiskLevel) => {
    switch (level) {
      case "High":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <AlertTriangle className="h-3 w-3 mr-1" />
            High
          </Badge>
        )
      case "Medium":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            <AlertTriangle className="h-3 w-3 mr-1" />
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
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            None
          </Badge>
        )
    }
  }

  const getRiskScoreColor = (score: number) => {
    if (score >= 75) return "bg-red-500"
    if (score >= 50) return "bg-amber-500"
    if (score >= 25) return "bg-yellow-500"
    return "bg-green-500"
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Player</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Risk Level</TableHead>
            <TableHead>Risk Score</TableHead>
            <TableHead>Statistical Triggers</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {anomalyData.map((player) => (
            <TableRow key={player.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 rounded-md">
                    <AvatarImage src={player.imageUrl || "/placeholder.svg"} alt={player.name} />
                    <AvatarFallback className="rounded-md bg-pirates-yellow text-pirates-black">
                      {" "}
                      {player.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{player.name}</span>
                      <span className="text-xs text-muted-foreground">#{player.number}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Last tested: {player.lastTested}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>{player.position}</TableCell>
              <TableCell>{player.age}</TableCell>
              <TableCell>{getRiskLevelBadge(player.riskLevel)}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Progress
                    value={player.riskScore}
                    className="h-2 w-14"
                    indicatorClassName={getRiskScoreColor(player.riskScore)}
                  />
                  <span className="text-sm">{player.riskScore}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {player.triggers.map((trigger, index) => (
                    <TooltipProvider key={index}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Badge
                            variant="outline"
                            className={
                              trigger.significant
                                ? "bg-red-50 text-red-700 border-red-200 cursor-help"
                                : "bg-amber-50 text-amber-700 border-amber-200 cursor-help"
                            }
                          >
                            <TrendingUp className="h-3 w-3 mr-1" />
                            {trigger.type}
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent className="w-80">
                          <div className="space-y-2">
                            <p className="font-medium">{trigger.description}</p>
                            <div className="grid grid-cols-3 gap-1 text-sm">
                              <div>
                                <p className="text-muted-foreground">Threshold:</p>
                                <p>{trigger.threshold}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Current:</p>
                                <p>{trigger.current}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Previous:</p>
                                <p>{trigger.previous}</p>
                              </div>
                            </div>
                            <div className="font-medium text-sm">
                              Change: <span className="text-red-600">{trigger.change}</span>
                            </div>
                            {trigger.substanceCorrelation && (
                              <div className="mt-2 pt-2 border-t border-gray-200">
                                <p className="text-xs font-medium text-muted-foreground mb-1">
                                  Potential Substance Correlation:
                                </p>
                                <div className="flex flex-wrap gap-1">
                                  {trigger.substanceCorrelation.map((substance, i) => (
                                    <Badge key={i} variant="outline" className="text-xs">
                                      {substance}
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
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm">
                    <Bell className="h-4 w-4 mr-1" />
                    Schedule Test
                  </Button>
                  <Link
                    href={
                      player.id === "107"
                        ? "/statistical-decline-details/pitcher/107"
                        : `/statistical-details/${player.playerType === "pitcher" ? "pitcher" : "hitter"}/${player.id}`
                    }
                  >
                    <Button size="sm">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      View
                    </Button>
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
