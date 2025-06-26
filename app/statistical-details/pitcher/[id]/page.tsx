import { notFound } from "next/navigation"
import { players } from "@/data/statistical-anomaly-players"
import { Badge } from "@/components/ui/badge"

const RISK_RATIONALE_MAP: Record<string, string> = {
  "Velocity Spike": "A sudden increase in velocity at this age is unusual and may warrant additional monitoring.",
  "K% Increase": "A sudden spike in strikeout rate, especially with a velocity jump, may indicate spikes in performance that requires attention.",
  "WHIP Drop": "Significant improvement in control and efficiency may suggest improved physical capabilities.",
  "ERA Drop": "Dramatic improvement in earned run average may indicate spikes in performance that requires review."
}

const SUBSTANCE_CATEGORIES: Record<string, string> = {
  "Anabolic Agents": "Substances that may improve muscle growth and recovery",
  "Peptide Hormones": "Substances that may affect growth and recovery processes",
  "Beta-2 Agonists": "Substances that may improve breathing and endurance",
  "Hormone Modulators": "Substances that may affect hormone levels",
  "Metabolic Modulators": "Substances that may affect energy metabolism",
  "Diuretics": "Substances that may affect fluid balance",
  "Stimulants": "Substances that may improve alertness and energy",
  "Masking Agents": "Substances that may interfere with testing procedures"
}

export default async function PitcherStatisticalDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const player = players.find((p) => p.id === id && p.playerType === "pitcher")
  if (!player) return notFound()

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{player.name} <span className="text-muted-foreground">#{player.number}</span></h1>
      <div className="mb-6 text-muted-foreground">Position: {player.position} | Age: {player.age}</div>
      
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-bold mb-1">🔍 Performance Analysis: Pitcher Performance Spikes</h2>
          <p className="text-gray-600 mb-4">Analysis of statistical patterns that may indicate spikes in performance requiring attention.</p>
          
          <h3 className="font-semibold mb-2">Common Performance Indicators in Pitchers</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-2 text-left">Metric</th>
                  <th className="p-2 text-left">Normal Range</th>
                  <th className="p-2 text-left">Risk Level</th>
                  <th className="p-2 text-left">Attention Required</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2">Velocity Increase</td>
                  <td className="p-2">0-2 mph/year</td>
                  <td className="p-2">High</td>
                  <td className="p-2">Immediate</td>
                </tr>
                <tr>
                  <td className="p-2">Strikeout Rate</td>
                  <td className="p-2">+5-10%</td>
                  <td className="p-2">Medium</td>
                  <td className="p-2">Within 30 days</td>
                </tr>
                <tr>
                  <td className="p-2">Control Improvement</td>
                  <td className="p-2">Gradual</td>
                  <td className="p-2">Low</td>
                  <td className="p-2">Routine</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-2">Flagged Statistical KPIs & Risk Analysis</h2>
          <p className="text-gray-600 mb-4">Statistical patterns at older ages or after injury, often correlate with enhanced performance patterns.</p>
          
          {player.triggers?.map((t, index) => (
            <div key={index} className="border rounded-lg p-4 mb-4 bg-red-50">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-red-800">{t.type}</h3>
                <Badge variant="destructive">High Risk</Badge>
              </div>
              <div className="text-xs mb-2">{RISK_RATIONALE_MAP[t.type] || "This type of statistical spike is rare without external enhancement and may require attention."}</div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><strong>Threshold:</strong> {t.threshold}</div>
                <div><strong>Current:</strong> {t.current}</div>
                <div><strong>Previous:</strong> {t.previous}</div>
                <div><strong>Change:</strong> {t.change}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 