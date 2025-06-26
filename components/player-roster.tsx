"use client"

import { useState, useMemo } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MoreHorizontal, Bell, AlertCircle, CheckCircle2, Stethoscope } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { players, Player, Position } from "@/data/player-roster"

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

export function PlayerRoster({ filter = "all" }: { filter?: PositionCategory }) {
  const [roster] = useState<Player[]>(() => {
    if (filter === "all") {
      return players.filter((player) => !player.injuryStatus) // Exclude injured from 'all'
    }
    if (filter === "injured") {
      return players.filter((player) => player.injuryStatus) // Only show injured
    }
    return players.filter((player) => player.positionCategory === filter && !player.injuryStatus) // Filter by position and exclude injured
  })

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

  // Add helper function inside PlayerRoster component
  const calculateDaysBetweenDates = (date1Str: string, date2Str: string) => {
    const date1 = new Date(date1Str)
    const date2 = new Date(date2Str)
    const diffTime = Math.abs(date2.getTime() - date1.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const getRiskLevelBadge = (player: Player, currentFilter: PositionCategory) => {
    if (currentFilter === "injured" && player.injuryStartDate && player.expectedReturn) {
      // For injured players, prioritize the static riskLevel if it's "High"
      if (player.riskLevel === "High") {
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <AlertCircle className="h-3 w-3 mr-1" />
            High
          </Badge>
        )
      }
      
      // Otherwise, calculate dynamically
      const today = new Date()
      const injuryStartDate = new Date(player.injuryStartDate)
      const expectedReturnDate = new Date(player.expectedReturn)

      const totalDays = calculateDaysBetweenDates(injuryStartDate.toDateString(), expectedReturnDate.toDateString())
      const daysPassed = calculateDaysBetweenDates(injuryStartDate.toDateString(), today.toDateString())
      const daysRemaining = calculateDaysBetweenDates(today.toDateString(), expectedReturnDate.toDateString())
      const progress = totalDays > 0 ? Math.min(100, Math.max(0, Math.round((daysPassed / totalDays) * 100))) : 0

      let calculatedRiskLevel: RiskLevel = "None"

      if (today >= expectedReturnDate) {
        calculatedRiskLevel = "None" // Player should be off IL or fully recovered
      } else if (daysRemaining <= 7 && progress >= 80) {
        calculatedRiskLevel = "High" // Close to return, high progress, potentially rushing
      } else if (daysRemaining <= 14 && progress >= 50) {
        calculatedRiskLevel = "Medium" // Moderate progress, nearing return
      } else {
        calculatedRiskLevel = "Low" // Early in recovery or steady progress
      }

      // Now use calculatedRiskLevel to return the badge
      switch (calculatedRiskLevel) {
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
          return (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              None
            </Badge>
          )
      }
    } else {
      // Existing logic for non-injured players or if injury dates are missing
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
          return null // Or a default "No Risk" badge if desired
      }
    }
  }

  const getInjuryStatusBadge = (status?: string) => {
    if (!status) return null
    const displayStatus = status.replace("Injured List ", "") // Remove "Injured List "
    return (
      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 whitespace-nowrap">
        <Stethoscope className="h-3 w-3 mr-1" />
        {displayStatus}
      </Badge>
    )
  }

  // Inside the PlayerRoster component, before the `return` statement:

  const averageRecoveryDaysMap = useMemo<Record<string, number>>(() => {
    return {
      "Forearm Tightness": 25,
      "Ankle Sprain": 18,
      "Hamstring Strain": 18,
      "Shoulder Inflammation": 25,
    }
  }, [])

  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Player</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Risk Level</TableHead>
            {filter === "injured" ? (
              <>
                <TableHead>Injury Type</TableHead>
                <TableHead>Avg. Recovery Days</TableHead>
                <TableHead>Expected Return</TableHead>
                <TableHead>Days on IL</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Days Remaining</TableHead>
              </>
            ) : (
              <>
                <TableHead>Last Tested</TableHead>
                <TableHead>Next Test</TableHead>
                <TableHead>Contract Expiration</TableHead>
                <TableHead>Contract Value</TableHead>
                <TableHead>YTD Stats</TableHead>
              </>
            )}
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roster.map((player) => (
            <TableRow key={player.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 rounded-md">
                    <AvatarImage src={player.imageUrl || "/placeholder.svg"} alt={player.name} />
                    <AvatarFallback className="rounded-md bg-pirates-yellow text-pirates-black">
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
                    <span className="text-xs text-muted-foreground">
                      {player.height}, {player.weight} lbs | B/T: {player.batsThrows}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>{player.position}</TableCell>
              <TableCell>
                {player.injuryStatus
                  ? getInjuryStatusBadge(player.injuryStatus)
                  : getComplianceStatusBadge(player.complianceStatus as ComplianceStatus)}
              </TableCell>
              <TableCell>{getRiskLevelBadge(player, filter)}</TableCell>
              {filter === "injured" ? (
                <>
                  <TableCell>{player.injuryType}</TableCell>
                  <TableCell>
                    {player.avgRecoveryDays !== undefined
                      ? `${player.avgRecoveryDays} days`
                      : (player.injuryType && averageRecoveryDaysMap[player.injuryType] !== undefined
                        ? `${averageRecoveryDaysMap[player.injuryType]} days`
                        : "N/A")}
                  </TableCell>
                  <TableCell>{player.expectedReturn}</TableCell>
                  <TableCell>
                    {player.injuryStartDate && player.expectedReturn
                      ? (() => {
                          const today = new Date()
                          const injuryStartDate = new Date(player.injuryStartDate)
                          return calculateDaysBetweenDates(injuryStartDate.toDateString(), today.toDateString())
                        })()
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    {player.injuryStartDate && player.expectedReturn
                      ? (() => {
                          const today = new Date()
                          const injuryStartDate = new Date(player.injuryStartDate)
                          const expectedReturnDate = new Date(player.expectedReturn)
                          const totalDays = calculateDaysBetweenDates(
                            injuryStartDate.toDateString(),
                            expectedReturnDate.toDateString(),
                          )
                          const daysPassed = calculateDaysBetweenDates(
                            injuryStartDate.toDateString(),
                            today.toDateString(),
                          )
                          const progress =
                            totalDays > 0 ? Math.min(100, Math.max(0, Math.round((daysPassed / totalDays) * 100))) : 0
                          return `${progress}%`
                        })()
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    {player.expectedReturn
                      ? (() => {
                          const today = new Date()
                          const expectedReturnDate = new Date(player.expectedReturn)
                          const daysRemaining = calculateDaysBetweenDates(
                            today.toDateString(),
                            expectedReturnDate.toDateString(),
                          )
                          return today < expectedReturnDate ? daysRemaining : 0
                        })()
                      : "N/A"}
                  </TableCell>
                </>
              ) : (
                <>
                  <TableCell>{player.lastTested}</TableCell>
                  <TableCell>{player.nextTest}</TableCell>
                  <TableCell>{player.contractExpiration}</TableCell>
                  <TableCell>{player.contractValue}</TableCell>
                  <TableCell>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex flex-wrap gap-2">
                            {player.positionCategory === "pitcher" ? (
                              <>
                                <Badge variant="secondary" className="whitespace-nowrap">
                                  ERA: {player.stats.era}
                                </Badge>
                                <Badge variant="secondary" className="whitespace-nowrap">
                                  W-L: {player.stats.w}-{player.stats.l}
                                </Badge>
                                {player.position === "CL" && (
                                  <Badge variant="secondary" className="whitespace-nowrap">
                                    SV: {player.stats.sv}
                                  </Badge>
                                )}
                              </>
                            ) : (
                              <>
                                <Badge variant="secondary" className="whitespace-nowrap">
                                  AVG: {player.stats.avg}
                                </Badge>
                                <Badge variant="secondary" className="whitespace-nowrap">
                                  HR: {player.stats.hr}
                                </Badge>
                                <Badge variant="secondary" className="whitespace-nowrap">
                                  RBI: {player.stats.rbi}
                                </Badge>
                              </>
                            )}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="space-y-1">
                            <p className="font-medium">{player.name} - Full Stats</p>
                            {player.positionCategory === "pitcher" ? (
                              <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                                <div>ERA: {player.stats.era}</div>
                                <div>
                                  W-L: {player.stats.w}-{player.stats.l}
                                </div>
                                <div>WHIP: {player.stats.whip}</div>
                                <div>SO: {player.stats.so}</div>
                                {player.position === "CL" && <div>SV: {player.stats.sv}</div>}
                              </div>
                            ) : (
                              <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                                <div>AVG: {player.stats.avg}</div>
                                <div>HR: {player.stats.hr}</div>
                                <div>RBI: {player.stats.rbi}</div>
                                <div>OPS: {player.stats.ops}</div>
                              </div>
                            )}
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                </>
              )}
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>View compliance history</DropdownMenuItem>
                    <DropdownMenuItem>Schedule test</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Send notification</DropdownMenuItem>
                    <DropdownMenuItem>View medical exemptions</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
