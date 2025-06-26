import { notFound } from "next/navigation"
import { players } from "@/data/player-roster"

const INJURY_RATIONALE_MAP: Record<string, string> = {
  "Exit Velocity": "A significant drop in exit velocity often indicates wrist, hand, or shoulder issues that affect bat speed and contact quality.",
  "Home Run Rate": "Declining home run rates with exit velocity drops suggest diminished power due to underlying injury.",
  "OPS Decline": "Overall performance deterioration combined with power/contact issues often signals injury-related mechanical problems.",
  "Strikeout Rate": "Increased strikeout rates can indicate timing issues stemming from injury or mechanical compensations.",
  "Games Played": "Reduced playing time often indicates injury management or recovery from existing issues.",
}

const INJURY_CORRELATIONS: Record<string, string> = {
  "Exit Velocity": "Wrist strain, hand injury, shoulder issues, core/oblique problems",
  "Home Run Rate": "Diminished power due to injury-related strength loss",
  "OPS Decline": "Overall performance decline due to injury-related mechanical changes",
  "Strikeout Rate": "Timing issues from injury or compensation patterns",
  "Games Played": "Injury management, reduced workload due to existing issues",
}

export default async function HitterStatisticalDeclineDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const player = players.find((p) => p.id === id && p.positionCategory !== "pitcher")
  if (!player) return notFound()

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{player.name} <span className="text-muted-foreground">#{player.number}</span></h1>
      <div className="mb-6 text-muted-foreground">Position: {player.position} | Age: {player.age || "N/A"}</div>
      
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-1">🔍 Injury Detection: Hitter Performance Decline Patterns</h2>
        <p className="mb-4 text-muted-foreground"><strong>Core Hypothesis:</strong> Statistical declines in hitter performance, especially in power and contact metrics, often correlate with existing injuries or indicate potential future injury risk.</p>
        <h3 className="font-semibold mb-2">Common Injury Indicators in Hitters</h3>
        <table className="w-full text-sm border mb-8">
          <thead>
            <tr className="bg-orange-50">
              <th className="p-2 text-left">Statistic</th>
              <th className="p-2 text-left">Injury Correlation</th>
              <th className="p-2 text-left">Common Injuries</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border-t font-semibold">Exit Velocity ↓</td>
              <td className="p-2 border-t">Bat speed/strength issues</td>
              <td className="p-2 border-t">Wrist strain, hand injury, shoulder issues</td>
            </tr>
            <tr>
              <td className="p-2 border-t font-semibold">Home Run Rate ↓</td>
              <td className="p-2 border-t">Diminished power output</td>
              <td className="p-2 border-t">Core/oblique problems, shoulder weakness</td>
            </tr>
            <tr>
              <td className="p-2 border-t font-semibold">OPS Decline</td>
              <td className="p-2 border-t">Overall performance decline</td>
              <td className="p-2 border-t">Injury-related mechanical changes</td>
            </tr>
            <tr>
              <td className="p-2 border-t font-semibold">Strikeout Rate ↑</td>
              <td className="p-2 border-t">Timing/contact issues</td>
              <td className="p-2 border-t">Vision problems, back/oblique discomfort</td>
            </tr>
            <tr>
              <td className="p-2 border-t font-semibold">Games Played ↓</td>
              <td className="p-2 border-t">Availability issues</td>
              <td className="p-2 border-t">Injury management, recovery from existing issues</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-semibold mb-2">Flagged Statistical KPIs & Injury Risk Analysis</h2>
      <ul className="mb-6 space-y-4">
        {player.triggers?.map((t: any, i: number) => (
          <li key={i} className="border rounded p-4 bg-orange-50">
            <div className="font-bold text-lg text-orange-800">{t.type}</div>
            <div className="text-sm mb-1">Threshold: <span className="font-mono">{t.threshold}</span></div>
            <div className="text-sm mb-1">Change: <span className="font-mono text-orange-600">{t.change}</span></div>
            <div className="text-xs text-muted-foreground mb-2">{t.description}</div>
            <div className="text-sm font-semibold text-orange-700 mb-1">Why is this concerning?</div>
            <div className="text-xs mb-2">{INJURY_RATIONALE_MAP[t.type] || "This type of statistical decline is often associated with injury-related performance issues in hitters."}</div>
            <div className="text-xs mt-2">
              <span className="font-semibold text-orange-700">Potential Injuries:</span>
              <div className="mt-1 ml-4">
                {INJURY_CORRELATIONS[t.type] || "General injury-related performance decline"}
              </div>
            </div>
          </li>
        )) || (
          <li className="border rounded p-4 bg-gray-50">
            <div className="text-center text-muted-foreground">No specific decline triggers identified for this player</div>
          </li>
        )}
      </ul>

      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded">
        <h3 className="font-semibold text-blue-800 mb-2">Recommendations</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Schedule comprehensive medical evaluation</li>
          <li>• Review recent workload and recovery patterns</li>
          <li>• Consider mechanical analysis for compensation patterns</li>
          <li>• Monitor for additional decline indicators</li>
        </ul>
      </div>
    </div>
  )
} 