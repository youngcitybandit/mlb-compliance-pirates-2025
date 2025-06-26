import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { AlertTriangle, Info, TrendingDown, Clock, MessageSquare, ShieldOff } from "lucide-react"

export function BatterInjurySignals() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Info className="h-5 w-5 text-blue-500" />
          <div>
            <CardTitle>MLB-Specific Batter Injury Signals</CardTitle>
            <CardDescription>
              Critical insights from the MLB batter injury audit for early detection and compliance.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-red-500" />
            1. High-Value Data Signals to Exploit (Performance Deterioration)
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>
              <strong>Exit Velo Drop:</strong> Average exit velocity down &gt; 3 mph over 10 games. Strong indicator of
              hand, wrist, or shoulder injury (e.g., Freeman, Carlson).
              <br />
              <span className="text-xs text-muted-foreground">
                Reflex Hook: Auto-trigger injury risk alert from real-time Statcast deltas.
              </span>
            </li>
            <li>
              <strong>Sprint Speed Decline:</strong> Drop &gt; 1 ft/sec within same season. Likely leg, knee, or
              hamstring issue even if not on IL.
            </li>
            <li>
              <strong>Launch Angle Collapse + Opposite Field Spray:</strong> Potential core/oblique injury compensation
              (swing mechanics altered).
            </li>
            <li>
              <strong>Spike in BB% + Drop in ISO:</strong> Batter "protecting" an injury, not taking power swings.
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
            <Clock className="h-5 w-5 text-amber-500" />
            2. IL Timing & Usage Patterns
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>
              <strong>Backdated IL with 3-day max:</strong> Team intentionally delayed decision. Often used to exploit
              off-days.
            </li>
            <li>
              <strong>10-day IL return exactly on Day 11 (repeated):</strong> Likely roster cycling tactic.
            </li>
            <li>
              <strong>Pre-All-Star IL with vague injury:</strong> Exploiting break to minimize actual missed games.
              <br />
              <span className="text-xs text-muted-foreground">
                Reflex Hook: Flag suspicious IL timings + return patterns for policy manipulation.
              </span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-blue-500" />
            3. Media & Language Evasion Patterns
          </h3>
          <p className="text-sm text-muted-foreground mb-3">Phrases to Flag in Public Communication:</p>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>
              Terms like: "soreness," "tightness," "fatigue," "a [body part] thing" &rarr; vague placeholders used to
              delay IL designation.
            </li>
            <li>Day-to-day players with &gt;2 missed games and no IL &rarr; system gap (undeclared injuries).</li>
            <li>
              Quotes like: "we’re just being cautious" or "he’ll be fine tomorrow" often precede delayed IL.
              <br />
              <span className="text-xs text-muted-foreground">
                Reflex Hook: NLP scan of media + beat reports &rarr; injury detection without official logs.
              </span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
            <ShieldOff className="h-5 w-5 text-red-500" />
            4. Patterns of Non-Compliance / Roster Abuse
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>
              <strong>Anthony Rizzo (2023):</strong> Concussion symptoms ignored &rarr; played 2 months while
              cognitively impaired. Performance dropped &gt;100 wRC+ points.
            </li>
            <li>
              <strong>Dylan Carlson (2022):</strong> Played full month with thumb sprain &rarr; power vanished. IL
              delayed until performance collapsed.
            </li>
            <li>
              <strong>Byron Buxton (2023):</strong> Chronic knee issue managed by hiding him at DH all season — only
              IL’d late for a different injury. Surgery needed but not disclosed.
              <br />
              <span className="text-xs text-muted-foreground">
                Audit Insight: These show systemic underreporting + misalignment between medical reality and IL action.
              </span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            5. Critical Audit Levers for Reflex Deployment
          </h3>
          <div className="rounded-md border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="p-3 text-left font-medium">Trigger Type</th>
                  <th className="p-3 text-left font-medium">Signal Condition</th>
                  <th className="p-3 text-left font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3">Statcast_ExitVelo_Drop</td>
                  <td className="p-3">Avg EV down &gt; 3.5 mph over 7–10 games</td>
                  <td className="p-3">Flag wrist/shoulder injury risk</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">SprintSpeed_Anomaly</td>
                  <td className="p-3">Drop &gt; 1 ft/sec within same season</td>
                  <td className="p-3">Flag leg/hip injury (unreported)</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">Language_Vagueness</td>
                  <td className="p-3">Repeated use of "sore"/"tight"/"day-to-day" in media with DNPs</td>
                  <td className="p-3">Audit team injury transparency</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">Backdated_IL_3Days</td>
                  <td className="p-3">Multiple players retro-IL'd full 3 days post scratch</td>
                  <td className="p-3">Flag IL timing manipulation</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">Return_At_Min_Stint</td>
                  <td className="p-3">Player returns exactly on Day 10/15, multiple times</td>
                  <td className="p-3">Flag for “phantom IL” / roster cycling</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">Slump_Before_IL</td>
                  <td className="p-3">wRC+ drops &gt;30% for 2 weeks, IL comes after</td>
                  <td className="p-3">Flag delayed response / risk to player</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">Repeat_Vague_DIAG</td>
                  <td className="p-3">Same player, same vague IL reason twice (e.g. “tightness”)</td>
                  <td className="p-3">Flag for chronic mislabeling</td>
                </tr>
                <tr>
                  <td className="p-3">PreBreak_IL_Use</td>
                  <td className="p-3">IL placement within 5 days of All-Star break or extended team off-days</td>
                  <td className="p-3">Flag for rest-driven IL usage</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
