"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Info, TrendingDown } from "lucide-react"

export function ShoulderInjurySignals() {
  return (
    <Card className="border-red-200 bg-red-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Info className="h-5 w-5 text-blue-500" />
          MLB-Specific Shoulder Injury Signals
        </CardTitle>
        <CardDescription>
          Deeper dive into biomechanical indicators and data-driven patterns for early detection.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-red-500" />
            Reduced External Rotation in Cocking Phase
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>Signals internal impingement or labral stress.</li>
            <li>Often precedes serious shoulder injuries like SLAP tears or rotator cuff damage.</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-red-500" />
            Velocity Drop &gt;1.5 mph Over 3 Starts
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>Strong statistical indicator of shoulder fatigue or strain.</li>
            <li>Common precursor to IL stints or long-term shoulder issues.</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-red-500" />
            Pitch Abandonment (e.g., Sudden Slider Drop-Off)
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>Suggests pain or instability during forearm pronation/supination.</li>
            <li>Frequently linked to UCL strain or early-stage elbow injuries.</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
