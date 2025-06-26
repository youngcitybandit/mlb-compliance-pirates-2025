"use client"
import { Card, CardContent } from "@/components/ui/card"
import type { Player } from "@/components/player-roster" // Import Player type

export function PlayerStatisticalAnalysis({ player }: { player: Player }) {
  const isPitcher = player.positionCategory === "pitcher"

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h3 className="font-medium">Year-to-Date Performance</h3>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {isPitcher ? (
          <>
            <Card>
              <CardContent className="p-4">
                <div className="text-xs text-muted-foreground">ERA</div>
                <div className="text-xl font-bold">{player.stats.era}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-xs text-muted-foreground">W-L</div>
                <div className="text-xl font-bold">
                  {player.stats.w}-{player.stats.l}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-xs text-muted-foreground">WHIP</div>
                <div className="text-xl font-bold">{player.stats.whip}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-xs text-muted-foreground">SO</div>
                <div className="text-xl font-bold">{player.stats.so}</div>
              </CardContent>
            </Card>
            {player.stats.sv !== undefined && (
              <Card>
                <CardContent className="p-4">
                  <div className="text-xs text-muted-foreground">SV</div>
                  <div className="text-xl font-bold">{player.stats.sv}</div>
                </CardContent>
              </Card>
            )}
          </>
        ) : (
          <>
            <Card>
              <CardContent className="p-4">
                <div className="text-xs text-muted-foreground">AVG</div>
                <div className="text-xl font-bold">{player.stats.avg}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-xs text-muted-foreground">HR</div>
                <div className="text-xl font-bold">{player.stats.hr}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-xs text-muted-foreground">RBI</div>
                <div className="text-xl font-bold">{player.stats.rbi}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-xs text-muted-foreground">OPS</div>
                <div className="text-xl font-bold">{player.stats.ops}</div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      <div className="rounded-md border p-4 text-sm text-muted-foreground">
        <p>
          <span className="font-medium">Note:</span> Detailed statistical anomaly detection and historical
          year-over-year comparisons are available on the{" "}
          <a href="/statistical-analysis" className="text-blue-600 hover:underline">
            Statistical Analysis page
          </a>
          .
        </p>
      </div>
    </div>
  )
}
