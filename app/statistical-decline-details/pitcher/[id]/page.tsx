import { notFound } from "next/navigation"
import { players } from "@/data/player-roster"

const INJURY_RATIONALE_MAP: Record<string, string> = {
  "Fastball Velocity": "A significant drop in fastball velocity often indicates shoulder, elbow, or forearm issues that affect arm strength and mechanics.",
  "Strikeout Rate": "Declining strikeout rates with velocity drops suggest diminished stuff quality due to underlying injury.",
  "ERA Increase": "Performance deterioration combined with velocity/command issues often signals injury-related mechanical problems.",
  "Walk Rate": "Increased walk rates can indicate command issues stemming from pain or mechanical compensations for injury.",
  "Innings Decrease": "Reduced workload often indicates injury management or recovery from existing issues.",
}

const INJURY_CORRELATIONS: Record<string, string> = {
  "Fastball Velocity": "Shoulder strain, elbow inflammation, forearm tightness, rotator cuff issues",
  "Strikeout Rate": "Diminished stuff due to shoulder/elbow pain, reduced arm strength",
  "ERA Increase": "Overall performance decline due to injury-related mechanical changes",
  "Walk Rate": "Command issues from pain or injury compensation patterns",
  "Innings Decrease": "Injury management, reduced workload due to existing issues",
}

export default async function PitcherStatisticalDeclineDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const player = players.find((p) => p.id === id && p.positionCategory === "pitcher")
  if (!player) return notFound()

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{player.name} <span className="text-muted-foreground">#{player.number}</span></h1>
      <div className="mb-6 text-muted-foreground">Position: {player.position} | Age: {player.age}</div>
      
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-1">🔍 Injury Detection: Pitcher Performance Decline Patterns</h2>
        <p className="mb-4 text-muted-foreground"><strong>Core Hypothesis:</strong> Statistical declines in pitcher performance, especially in velocity and command metrics, often correlate with existing injuries or indicate potential future injury risk.</p>
        <h3 className="font-semibold mb-2">Common Injury Indicators in Pitchers</h3>
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
              <td className="p-2 border-t font-semibold">Fastball Velocity ↓</td>
              <td className="p-2 border-t">Arm strength/mechanics issues</td>
              <td className="p-2 border-t">Shoulder strain, elbow inflammation, forearm tightness</td>
            </tr>
            <tr>
              <td className="p-2 border-t font-semibold">Strikeout Rate ↓</td>
              <td className="p-2 border-t">Diminished stuff quality</td>
              <td className="p-2 border-t">Shoulder/elbow pain, reduced arm strength</td>
            </tr>
            <tr>
              <td className="p-2 border-t font-semibold">ERA Increase</td>
              <td className="p-2 border-t">Overall performance decline</td>
              <td className="p-2 border-t">Injury-related mechanical changes</td>
            </tr>
            <tr>
              <td className="p-2 border-t font-semibold">Walk Rate ↑</td>
              <td className="p-2 border-t">Command issues</td>
              <td className="p-2 border-t">Pain or injury compensation patterns</td>
            </tr>
            <tr>
              <td className="p-2 border-t font-semibold">Innings Decrease</td>
              <td className="p-2 border-t">Workload management</td>
              <td className="p-2 border-t">Injury management, recovery from existing issues</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-semibold mb-2">Flagged Statistical KPIs & Risk Analysis</h2>
      <p className="mb-4 text-muted-foreground">Statistical patterns at older ages or after injury, often correlate with performance patterns.</p>
      <ul className="mb-6 space-y-4">
        {player.triggers?.map((t, i) => (
          <li key={i} className="border rounded p-4 bg-red-50 relative">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-bold text-lg text-red-800">{t.type.replace('Drop', 'Decline')}</div>
                <div className="text-xs text-muted-foreground mb-2">{t.description}</div>
              </div>
              <span className="bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded absolute top-4 right-4">High Risk</span>
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-1 mt-2 mb-2">
              <div className="font-semibold text-sm">Threshold:</div>
              <div className="font-mono text-sm">{t.threshold}</div>
              <div className="font-semibold text-sm">Current:</div>
              <div className="font-mono text-sm">{t.current}</div>
              <div className="font-semibold text-sm">Previous:</div>
              <div className="font-mono text-sm">{t.previous}</div>
              <div className="font-semibold text-sm">Change:</div>
              <div className="font-mono text-sm">{t.change}</div>
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

      {/* MLB Pitcher Norms & Injury Flags Section */}
      <section className="mt-8 p-6 bg-gray-50 rounded-lg border">
        <h2 className="text-lg font-bold mb-4">Current Normal Pitcher Thresholds (MLB Averages)</h2>
        <ul className="space-y-3 text-sm">
          <li>
            <strong>1. ERA (Earned Run Average)</strong><br />
            <span>Starter: 3.50 – 4.50 | Reliever: 3.00 – 4.00</span><br />
            <span className="text-yellow-700">Injury Concern: ERA increase &gt; +2.00 above career/season avg (especially early in season)</span>
          </li>
          <li>
            <strong>2. Fastball Velocity</strong><br />
            <span>Starters: ~93.5 mph | Relievers: ~95.8 mph</span><br />
            <span>Injury Flag: Sudden drop of ≥1.5–2.0 mph from baseline</span><br />
            <span>Daily Fluctuation: Up to 0.5–1.0 mph is common (weather, fatigue)</span>
          </li>
          <li>
            <strong>3. Spin Rate</strong><br />
            <span>Fastball: 2,200 – 2,400 rpm | Curveball: 2,500 – 2,800+ rpm | Slider: 2,300 – 2,600 rpm</span><br />
            <span>Injury Flag: Drop of ≥150–200 rpm from pitcher's norm, particularly if sudden</span>
          </li>
          <li>
            <strong>4. Strikeout Rate (K%)</strong><br />
            <span>League Avg (Starters): ~22–24% | (Relievers): ~25–30%</span><br />
            <span>Injury Flag: Drop of &gt;10–15% from personal norm</span>
          </li>
          <li>
            <strong>5. Walk Rate (BB%)</strong><br />
            <span>Healthy Pitcher Avg: 6–8%</span><br />
            <span>Injury Flag: Spike to &gt;10–12% without mechanical explanation</span>
          </li>
          <li>
            <strong>6. Extension</strong><br />
            <span>Starters: 6.0 – 6.5 ft | Relievers: 6.5 – 7.0+ ft</span><br />
            <span>Injury Flag: Loss of ≥5 inches from normal extension baseline</span>
          </li>
          <li>
            <strong>7. Release Point Stability</strong><br />
            <span>Horizontal Drift Tolerance: ±1.0 inch | Vertical Drift Tolerance: ±1.5 inch</span><br />
            <span>Injury Flag: Drift &gt;2 inches signals potential mechanical change or compensation</span>
          </li>
        </ul>
      </section>
    </div>
  )
} 