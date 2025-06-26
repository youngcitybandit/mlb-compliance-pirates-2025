"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  DollarSign,
  FileText,
  CheckCircle,
  Award,
  Brain
} from "lucide-react"

const players = [
  {
    id: "hayes",
    name: "Ke'Bryan Hayes",
    position: "3B",
    age: 27,
    riskScore: 75,
    riskLevel: "Medium",
    war: 4.2,
    salary: 8500000,
    contractYears: 3,
    suggestedValue: 25111968,
    marketValue: 33600000,
    performanceStability: 75,
    ageCurve: 85,
    injuryHistory: 30,
    surgeryRisk: 15,
    recoveryStability: 90,
    violationCount: 0,
    mentalHealth: 90,
    contractStability: 95,
    contractEfficiency: 4.9,
    marketStability: 80,
    insuranceThreshold: false
  },
  {
    id: "skenes",
    name: "Paul Skenes",
    position: "SP",
    age: 22,
    riskScore: 100,
    riskLevel: "Low",
    war: 2.1,
    salary: 740000,
    contractYears: 5,
    suggestedValue: 17640000,
    marketValue: 20000000,
    performanceStability: 92,
    ageCurve: 95,
    injuryHistory: 10,
    surgeryRisk: 0,
    recoveryStability: 98,
    violationCount: 0,
    mentalHealth: 95,
    contractStability: 99,
    contractEfficiency: 28.4,
    marketStability: 90,
    insuranceThreshold: false
  },
  {
    id: "reynolds",
    name: "Bryan Reynolds",
    position: "OF",
    age: 29,
    riskScore: 63,
    riskLevel: "Medium",
    war: 3.1,
    salary: 6500000,
    contractYears: 4,
    suggestedValue: 18000000,
    marketValue: 22000000,
    performanceStability: 70,
    ageCurve: 80,
    injuryHistory: 25,
    surgeryRisk: 10,
    recoveryStability: 88,
    violationCount: 1,
    mentalHealth: 85,
    contractStability: 90,
    contractEfficiency: 6.2,
    marketStability: 75,
    insuranceThreshold: false
  },
  {
    id: "keller",
    name: "Mitch Keller",
    position: "SP",
    age: 28,
    riskScore: 54,
    riskLevel: "High",
    war: 1.8,
    salary: 4200000,
    contractYears: 2,
    suggestedValue: 9000000,
    marketValue: 12000000,
    performanceStability: 60,
    ageCurve: 70,
    injuryHistory: 40,
    surgeryRisk: 25,
    recoveryStability: 80,
    violationCount: 0,
    mentalHealth: 80,
    contractStability: 85,
    contractEfficiency: 3.2,
    marketStability: 60,
    insuranceThreshold: true
  }
]

const riskLevelColor = {
  "Low": "bg-green-100 text-green-800 border-green-300",
  "Medium": "bg-yellow-100 text-yellow-800 border-yellow-400",
  "High": "bg-orange-100 text-orange-800 border-orange-400"
}

const riskLevelBadge = {
  "Low": "bg-green-50 text-green-700 border border-green-200",
  "Medium": "bg-yellow-200 text-yellow-900 border border-yellow-400",
  "High": "bg-orange-100 text-orange-800 border border-orange-400"
}

const progressBarColor = "bg-[#FFD600]"

export default function ContractAssessmentsPage() {
  const [selectedPlayerId, setSelectedPlayerId] = useState("hayes")
  const [compareId, setCompareId] = useState(players[1].id)
  const [activeTab, setActiveTab] = useState("risk-overview")
  const selectedPlayer = players.find(p => p.id === selectedPlayerId)!
  const player1 = selectedPlayer
  const player2 = players.find(p => p.id === compareId)!

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <header className="flex items-center px-6 py-3 border-b bg-white">
        <div className="flex items-center gap-3">
          <div className="bg-[#FFD600] rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg text-pirates-black">P</div>
          <div>
            <h1 className="font-bold text-xl">Pittsburgh Pirates</h1>
            <p className="text-xs text-gray-500">Contract Risk Assessment & Valuation Engine</p>
          </div>
        </div>
        <div className="ml-auto">
          <input className="rounded-md border px-3 py-1 text-sm bg-[#FAFAFA] border-gray-300" placeholder="Search players..." />
        </div>
      </header>
      <main className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r min-h-screen p-6">
          <h2 className="font-semibold text-base mb-2">Active Roster</h2>
          <p className="text-xs text-gray-500 mb-4">Click to view detailed risk assessment</p>
          <div className="space-y-2">
            {players.map(player => (
              <div
                key={player.id}
                className={`flex items-center justify-between rounded-lg px-3 py-2 cursor-pointer border transition-all ${selectedPlayerId === player.id ? 'bg-yellow-50 border-yellow-400 shadow-sm' : 'hover:bg-gray-100 border-transparent'}`}
                onClick={() => setSelectedPlayerId(player.id)}
              >
                <div>
                  <div className="font-semibold text-sm leading-tight">{player.name}</div>
                  <div className="text-xs text-gray-500">{player.position} • Age {player.age}</div>
                  <div className="text-xs text-gray-400">Risk Score: {player.riskScore}</div>
                </div>
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold ${riskLevelBadge[player.riskLevel as keyof typeof riskLevelBadge]}`}>{player.riskLevel}</span>
              </div>
            ))}
          </div>
        </aside>
        {/* Main Content */}
        <section className="flex-1 p-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="flex gap-2 bg-[#F5F5F5] rounded-lg p-1 mb-6 border border-gray-200">
              <TabsTrigger value="risk-overview" className="font-semibold text-base px-4 py-2">Risk Overview</TabsTrigger>
              <TabsTrigger value="player-profile" className="font-semibold text-base px-4 py-2">Player Profile</TabsTrigger>
              <TabsTrigger value="compare-players" className="font-semibold text-base px-4 py-2">Compare Players</TabsTrigger>
              <TabsTrigger value="performance-trends" className="font-semibold text-base px-4 py-2">Performance Trends</TabsTrigger>
              <TabsTrigger value="market-analysis" className="font-semibold text-base px-4 py-2">Market Analysis</TabsTrigger>
              <TabsTrigger value="advanced-features" className="font-semibold text-base px-4 py-2">Advanced Features</TabsTrigger>
            </TabsList>
            {/* Risk Overview Tab */}
            <TabsContent value="risk-overview">
              <div className="flex items-end gap-8 mb-2">
                <div>
                  <div className="font-bold text-2xl leading-tight mb-1">{selectedPlayer.name}</div>
                  <div className="text-gray-600 text-base font-medium mb-1">{selectedPlayer.position} • Age {selectedPlayer.age}</div>
                  <div className="text-gray-500 text-sm">Current: ${selectedPlayer.salary?.toLocaleString()} ({selectedPlayer.contractYears} years)</div>
                </div>
                <div className="flex-1 flex flex-wrap items-end gap-x-8 gap-y-2 ml-8">
                  <div className="flex flex-col items-center min-w-[70px]">
                    <span className="text-[#1A237E] text-3xl font-bold leading-none">{selectedPlayer.riskScore}</span>
                    <span className="text-xs text-gray-500 font-medium">Overall Risk Score</span>
                  </div>
                  <div className="flex flex-col items-center min-w-[60px]">
                    <span className="text-green-700 text-2xl font-bold leading-none">{selectedPlayer.war ?? '-'}</span>
                    <span className="text-xs text-gray-500 font-medium">WAR</span>
                  </div>
                  <div className="flex flex-col items-center min-w-[120px]">
                    <span className="text-[#7C3AED] text-2xl font-bold leading-none">{selectedPlayer.suggestedValue ? `$${selectedPlayer.suggestedValue.toLocaleString()}` : '-'}</span>
                    <span className="text-xs text-gray-500 font-medium">Suggested Value</span>
                  </div>
                  <div className="flex flex-col items-center min-w-[120px]">
                    <span className="text-[#FF6D00] text-2xl font-bold leading-none">{selectedPlayer.marketValue ? `$${selectedPlayer.marketValue.toLocaleString()}` : '-'}</span>
                    <span className="text-xs text-gray-500 font-medium">WAR Market Value</span>
                  </div>
                  <span className="ml-4 px-4 py-1 rounded-full text-base font-semibold bg-yellow-200 text-yellow-900 border border-yellow-400">{selectedPlayer.riskLevel} Risk</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                {/* Performance Metrics */}
                <Card className="col-span-1 border border-gray-200 shadow-none">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-lg font-bold">↗ Performance Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 pt-0">
                    <div className="flex justify-between text-sm font-medium"><span>WAR (Wins Above Replacement)</span><span>{selectedPlayer.war ?? '-'}</span></div>
                    <div className="w-full h-2 rounded bg-gray-200 mb-1"><div className="h-2 rounded" style={{width: `${selectedPlayer.war ? selectedPlayer.war * 20 : 0}%`, background: '#FFD600'}}></div></div>
                    <div className="flex justify-between text-sm font-medium"><span>Performance Stability</span><span>{selectedPlayer.performanceStability ? `${selectedPlayer.performanceStability}%` : '-'}</span></div>
                    <div className="w-full h-2 rounded bg-gray-200 mb-1"><div className="h-2 rounded" style={{width: `${selectedPlayer.performanceStability ?? 0}%`, background: '#FFD600'}}></div></div>
                    <div className="flex justify-between text-sm font-medium"><span>Age Curve Projection</span><span>{selectedPlayer.ageCurve ? `${selectedPlayer.ageCurve}%` : '-'}</span></div>
                    <div className="w-full h-2 rounded bg-gray-200"><div className="h-2 rounded" style={{width: `${selectedPlayer.ageCurve ?? 0}%`, background: '#FFD600'}}></div></div>
                  </CardContent>
                </Card>
                {/* Medical Risk Factors */}
                <Card className="col-span-1 border border-gray-200 shadow-none">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-lg font-bold text-red-600">⚠ Medical Risk Factors</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 pt-0">
                    <div className="flex justify-between text-sm font-medium"><span>Injury History (Lower is Better)</span><span>{selectedPlayer.injuryHistory ?? '-'}</span></div>
                    <div className="w-full h-2 rounded bg-gray-200 mb-1"><div className="h-2 rounded" style={{width: `${selectedPlayer.injuryHistory ?? 0}%`, background: '#FFD600'}}></div></div>
                    <div className="flex justify-between text-sm font-medium"><span>Surgery Risk (Lower is 15)</span><span>{selectedPlayer.surgeryRisk ?? '-'}</span></div>
                    <div className="w-full h-2 rounded bg-gray-200 mb-1"><div className="h-2 rounded" style={{width: `${selectedPlayer.surgeryRisk ?? 0}%`, background: '#FFD600'}}></div></div>
                    <div className="flex justify-between text-sm font-medium"><span>Recovery Stability</span><span>{selectedPlayer.recoveryStability ? `${selectedPlayer.recoveryStability}%` : '-'}</span></div>
                    <div className="w-full h-2 rounded bg-gray-200"><div className="h-2 rounded" style={{width: `${selectedPlayer.recoveryStability ?? 0}%`, background: '#FFD600'}}></div></div>
                  </CardContent>
                </Card>
                {/* Compliance & Behavioral */}
                <Card className="col-span-1 border border-gray-200 shadow-none">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-lg font-bold text-green-700">✓ Compliance & Behavioral</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 pt-0">
                    <div className="flex justify-between text-sm font-medium"><span>Violation Count</span><span>{selectedPlayer.violationCount ?? '-'}</span></div>
                    <div className="w-full h-2 rounded bg-gray-200 mb-1"><div className="h-2 rounded" style={{width: `${selectedPlayer.violationCount === 0 ? 100 : 0}%`, background: '#FFD600'}}></div></div>
                    <div className="flex justify-between text-sm font-medium"><span>Mental Health Stability</span><span>{selectedPlayer.mentalHealth ? `${selectedPlayer.mentalHealth}%` : '-'}</span></div>
                    <div className="w-full h-2 rounded bg-gray-200 mb-1"><div className="h-2 rounded" style={{width: `${selectedPlayer.mentalHealth ?? 0}%`, background: '#FFD600'}}></div></div>
                    <div className="flex justify-between text-sm font-medium"><span>Contract Stability</span><span>{selectedPlayer.contractStability ? `${selectedPlayer.contractStability}%` : '-'}</span></div>
                    <div className="w-full h-2 rounded bg-gray-200"><div className="h-2 rounded" style={{width: `${selectedPlayer.contractStability ?? 0}%`, background: '#FFD600'}}></div></div>
                  </CardContent>
                </Card>
                {/* Financial Efficiency */}
                <Card className="col-span-1 border border-gray-200 shadow-none">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-lg font-bold text-green-800">$ Financial Efficiency</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 pt-0">
                    <div className="flex justify-between text-sm font-medium"><span>Contract Efficiency Ratio</span><span>{selectedPlayer.contractEfficiency ?? '-'}</span></div>
                    <div className="w-full h-2 rounded bg-gray-200 mb-1"><div className="h-2 rounded" style={{width: `${selectedPlayer.contractEfficiency ? selectedPlayer.contractEfficiency * 20 : 0}%`, background: '#FFD600'}}></div></div>
                    <div className="flex justify-between text-sm font-medium"><span>Market Stability</span><span>{selectedPlayer.marketStability ? `${selectedPlayer.marketStability}%` : '-'}</span></div>
                    <div className="w-full h-2 rounded bg-gray-200 mb-1"><div className="h-2 rounded" style={{width: `${selectedPlayer.marketStability ?? 0}%`, background: '#FFD600'}}></div></div>
                    <div className="flex justify-between text-sm font-medium"><span>Insurance Threshold</span><span>{selectedPlayer.insuranceThreshold !== undefined ? (selectedPlayer.insuranceThreshold ? "Met" : "Not Met") : '-'}</span></div>
                    <div className="w-full h-2 rounded bg-gray-200"><div className="h-2 rounded" style={{width: `${selectedPlayer.insuranceThreshold ? 100 : 0}%`, background: '#FFD600'}}></div></div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            {/* Player Profile Tab */}
            <TabsContent value="player-profile">
              <div className="flex items-center gap-6 mb-6">
                <div>
                  <div className="font-bold text-2xl leading-tight mb-1">{selectedPlayer.name}</div>
                  <div className="text-gray-600 text-base font-medium mb-1">{selectedPlayer.position} • {selectedPlayer.age} years old</div>
                </div>
                <div className="ml-auto flex items-center gap-4">
                  <Button variant="outline">Generate Report</Button>
                  <Button variant="outline">Export Data</Button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Card className="col-span-1 border border-gray-200 shadow-none">
                  <CardContent className="pt-6">
                    <div className="text-xs text-gray-500 mb-1">Current Contract</div>
                    <div className="text-lg font-bold">${selectedPlayer.salary?.toLocaleString() ?? '-'} </div>
                    <div className="text-xs text-gray-500 mb-2">{selectedPlayer.contractYears ?? '-'} years remaining</div>
                    <div className="text-xs text-gray-500 mb-1">WAR</div>
                    <div className="text-lg font-bold">{selectedPlayer.war ?? '-'}</div>
                    <div className="text-xs text-gray-500 mb-1">Risk Score</div>
                    <div className="text-lg font-bold">{selectedPlayer.riskScore ?? '-'}<span className="ml-2 text-xs text-gray-500">/100</span></div>
                    <div className="text-xs text-gray-500 mb-1">Market Value</div>
                    <div className="text-lg font-bold">{selectedPlayer.marketValue ? `$${selectedPlayer.marketValue.toLocaleString()}` : '-'}</div>
                    <div className="text-xs text-gray-500">WAR-based</div>
                  </CardContent>
                </Card>
              </div>
              <Card className="mb-6 border border-gray-200 shadow-none">
                <CardHeader>
                  <CardTitle>Performance Trend Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Overall Trend</div>
                      <div className="font-bold">{selectedPlayer.performanceStability >= 90 ? 'Stable' : selectedPlayer.performanceStability >= 75 ? 'Improving' : selectedPlayer.performanceStability >= 60 ? 'Volatile' : 'Declining'}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Career Phase</div>
                      <div className="font-bold">{selectedPlayer.age <= 24 ? 'Rising' : selectedPlayer.age <= 29 ? 'Prime' : 'Veteran'}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">WAR Trend</div>
                      <div className="font-bold">{selectedPlayer.war ? `+${(selectedPlayer.war / selectedPlayer.contractYears).toFixed(2)}/year` : '-'}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Sustainability</div>
                      <div className="font-bold">{selectedPlayer.recoveryStability ? `${selectedPlayer.recoveryStability}%` : '-'}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border border-gray-200 shadow-none">
                <CardHeader>
                  <CardTitle>Contract Scenarios</CardTitle>
                  <CardDescription>Projected contract options based on risk assessment and market analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <div className="font-semibold">Conservative Extension (Trend-Based)</div>
                        <div className="text-xs text-gray-500 mb-2">Based on declining performance projections and injury risk</div>
                        <div className="flex gap-4 text-sm">
                          <div>Duration <span className="font-bold">{Math.max(1, Math.floor(selectedPlayer.contractYears / 2))} years</span></div>
                          <div>Total Value <span className="font-bold">${(selectedPlayer.salary * 1.1 * Math.max(1, Math.floor(selectedPlayer.contractYears / 2))).toLocaleString()}</span></div>
                          <div>Average Annual <span className="font-bold">${(selectedPlayer.salary * 1.1).toLocaleString()}</span></div>
                        </div>
                      </div>
                      <span className="bg-green-100 text-green-800 border border-green-200 rounded-full px-4 py-1 mt-2 md:mt-0 font-semibold">Low Risk</span>
                    </div>
                    <div className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <div className="font-semibold">Market Value Deal (Trend-Adjusted)</div>
                        <div className="text-xs text-gray-500 mb-2">Fair market value adjusted for performance trends</div>
                        <div className="flex gap-4 text-sm">
                          <div>Duration <span className="font-bold">{selectedPlayer.contractYears} years</span></div>
                          <div>Total Value <span className="font-bold">${(selectedPlayer.suggestedValue ?? selectedPlayer.salary * selectedPlayer.contractYears).toLocaleString()}</span></div>
                          <div>Average Annual <span className="font-bold">${((selectedPlayer.suggestedValue ?? selectedPlayer.salary * selectedPlayer.contractYears) / selectedPlayer.contractYears).toLocaleString()}</span></div>
                        </div>
                      </div>
                      <span className="bg-yellow-100 text-yellow-800 border border-yellow-400 rounded-full px-4 py-1 mt-2 md:mt-0 font-semibold">Medium Risk</span>
                    </div>
                    <div className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <div className="font-semibold">Optimistic Extension (Upside Bet)</div>
                        <div className="text-xs text-gray-500 mb-2">Based on upside projections and market inflation</div>
                        <div className="flex gap-4 text-sm">
                          <div>Duration <span className="font-bold">{selectedPlayer.contractYears + 2} years</span></div>
                          <div>Total Value <span className="font-bold">${(selectedPlayer.salary * 1.5 * (selectedPlayer.contractYears + 2)).toLocaleString()}</span></div>
                          <div>Average Annual <span className="font-bold">${(selectedPlayer.salary * 1.5).toLocaleString()}</span></div>
                        </div>
                      </div>
                      <span className="bg-orange-100 text-orange-800 border border-orange-400 rounded-full px-4 py-1 mt-2 md:mt-0 font-semibold">High Risk</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            {/* Compare Players Tab */}
            <TabsContent value="compare-players">
              <div className="mb-6">
                <div className="font-semibold text-xl mb-2">Player Comparison Tool</div>
                <div className="text-gray-500 text-sm mb-4">Compare risk assessments and contract valuations side-by-side</div>
                <div className="flex gap-4 mb-6">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Player 1</label>
                    <select
                      className="border rounded-md px-3 py-2 text-sm"
                      value={selectedPlayerId}
                      onChange={e => setSelectedPlayerId(e.target.value)}
                    >
                      {players.map(p => (
                        <option key={p.id} value={p.id}>{p.name} ({p.position})</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Player 2</label>
                    <select
                      className="border rounded-md px-3 py-2 text-sm"
                      value={compareId}
                      onChange={e => setCompareId(e.target.value)}
                    >
                      {players.map(p => (
                        <option key={p.id} value={p.id}>{p.name} ({p.position})</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Player 1 Card */}
                  <Card>
                    <CardContent className="pt-6">
                      <div className="font-semibold text-lg mb-1">{player1.name}</div>
                      <div className="text-xs text-gray-500 mb-2">{player1.position} • Age {player1.age}</div>
                      <Badge className={`mb-2 ${riskLevelColor[player1.riskLevel as keyof typeof riskLevelColor]}`}>{player1.riskLevel} Risk</Badge>
                      <div className="mb-2"><span className="text-xs text-gray-500">Overall Risk Score</span> <span className="font-bold text-xl ml-2">{player1.riskScore}</span></div>
                      <div className="mb-2"><span className="text-xs text-gray-500">WAR</span> <span className="font-bold ml-2">{player1.war ?? '-'}</span></div>
                      <div className="mb-2"><span className="text-xs text-gray-500">Current Salary</span> <span className="font-bold ml-2">{player1.salary ? `$${player1.salary.toLocaleString()}` : '-'}</span></div>
                      <div className="mb-2"><span className="text-xs text-gray-500">Suggested Contract Value</span> <span className="font-bold ml-2">{player1.suggestedValue ? `$${player1.suggestedValue.toLocaleString()}` : '-'}</span></div>
                      <div className="mb-2"><span className="text-xs text-gray-500">Contract Efficiency Ratio</span> <span className="font-bold ml-2">{player1.contractEfficiency ?? '-'}</span></div>
                    </CardContent>
                  </Card>
                  {/* Player 2 Card */}
                  <Card>
                    <CardContent className="pt-6">
                      <div className="font-semibold text-lg mb-1">{player2.name}</div>
                      <div className="text-xs text-gray-500 mb-2">{player2.position} • Age {player2.age}</div>
                      <Badge className={`mb-2 ${riskLevelColor[player2.riskLevel as keyof typeof riskLevelColor]}`}>{player2.riskLevel} Risk</Badge>
                      <div className="mb-2"><span className="text-xs text-gray-500">Overall Risk Score</span> <span className="font-bold text-xl ml-2">{player2.riskScore}</span></div>
                      <div className="mb-2"><span className="text-xs text-gray-500">WAR</span> <span className="font-bold ml-2">{player2.war ?? '-'}</span></div>
                      <div className="mb-2"><span className="text-xs text-gray-500">Current Salary</span> <span className="font-bold ml-2">{player2.salary ? `$${player2.salary.toLocaleString()}` : '-'}</span></div>
                      <div className="mb-2"><span className="text-xs text-gray-500">Suggested Contract Value</span> <span className="font-bold ml-2">{player2.suggestedValue ? `$${player2.suggestedValue.toLocaleString()}` : '-'}</span></div>
                      <div className="mb-2"><span className="text-xs text-gray-500">Contract Efficiency Ratio</span> <span className="font-bold ml-2">{player2.contractEfficiency ?? '-'}</span></div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            {/* Performance Trends Tab */}
            <TabsContent value="performance-trends">
              <div className="flex items-center gap-6 mb-6">
                <div>
                  <div className="font-bold text-2xl leading-tight mb-1">{selectedPlayer.name}</div>
                  <div className="text-gray-600 text-base font-medium mb-1">{selectedPlayer.position} • Age {selectedPlayer.age}</div>
                </div>
                <div className="ml-auto flex items-center gap-4">
                  <Button variant="outline">Export Trends</Button>
                  <Button variant="outline">Generate Report</Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card className="border border-gray-200 shadow-none">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-bold">Performance Trend</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-2xl font-bold mb-2">{selectedPlayer.performanceStability >= 90 ? '↗' : selectedPlayer.performanceStability >= 75 ? '→' : selectedPlayer.performanceStability >= 60 ? '↘' : '↓'} {selectedPlayer.performanceStability}%</div>
                    <div className="text-sm text-gray-500 mb-3">Stability Score</div>
                    <div className="w-full h-2 rounded bg-gray-200">
                      <div className="h-2 rounded" style={{width: `${selectedPlayer.performanceStability ?? 0}%`, background: '#FFD600'}}></div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border border-gray-200 shadow-none">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-bold">WAR Projection</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-2xl font-bold mb-2">{selectedPlayer.war ? (selectedPlayer.war * 1.1).toFixed(1) : '-'}</div>
                    <div className="text-sm text-gray-500 mb-3">Next Season Projection</div>
                    <div className="w-full h-2 rounded bg-gray-200">
                      <div className="h-2 rounded" style={{width: `${selectedPlayer.war ? Math.min(100, selectedPlayer.war * 20) : 0}%`, background: '#FFD600'}}></div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border border-gray-200 shadow-none">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-bold">Age Curve Impact</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-2xl font-bold mb-2">{selectedPlayer.ageCurve}%</div>
                    <div className="text-sm text-gray-500 mb-3">Positive Projection</div>
                    <div className="w-full h-2 rounded bg-gray-200">
                      <div className="h-2 rounded" style={{width: `${selectedPlayer.ageCurve ?? 0}%`, background: '#FFD600'}}></div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <Card className="border border-gray-200 shadow-none">
                  <CardHeader>
                    <CardTitle>Performance Metrics Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm font-medium mb-1">
                          <span>Current WAR</span>
                          <span>{selectedPlayer.war ?? '-'}</span>
                        </div>
                        <div className="w-full h-2 rounded bg-gray-200">
                          <div className="h-2 rounded" style={{width: `${selectedPlayer.war ? Math.min(100, selectedPlayer.war * 20) : 0}%`, background: '#FFD600'}}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm font-medium mb-1">
                          <span>Performance Stability</span>
                          <span>{selectedPlayer.performanceStability ? `${selectedPlayer.performanceStability}%` : '-'}</span>
                        </div>
                        <div className="w-full h-2 rounded bg-gray-200">
                          <div className="h-2 rounded" style={{width: `${selectedPlayer.performanceStability ?? 0}%`, background: '#FFD600'}}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm font-medium mb-1">
                          <span>Age Curve Projection</span>
                          <span>{selectedPlayer.ageCurve ? `${selectedPlayer.ageCurve}%` : '-'}</span>
                        </div>
                        <div className="w-full h-2 rounded bg-gray-200">
                          <div className="h-2 rounded" style={{width: `${selectedPlayer.ageCurve ?? 0}%`, background: '#FFD600'}}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm font-medium mb-1">
                          <span>Contract Efficiency</span>
                          <span>{selectedPlayer.contractEfficiency ?? '-'}</span>
                        </div>
                        <div className="w-full h-2 rounded bg-gray-200">
                          <div className="h-2 rounded" style={{width: `${selectedPlayer.contractEfficiency ? Math.min(100, selectedPlayer.contractEfficiency * 10) : 0}%`, background: '#FFD600'}}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border border-gray-200 shadow-none">
                  <CardHeader>
                    <CardTitle>Trend Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-semibold">Performance Trend</div>
                          <div className="text-sm text-gray-500">{selectedPlayer.performanceStability >= 90 ? 'Stable & Improving' : selectedPlayer.performanceStability >= 75 ? 'Consistent' : selectedPlayer.performanceStability >= 60 ? 'Volatile' : 'Declining'}</div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${selectedPlayer.performanceStability >= 90 ? 'bg-green-100 text-green-800' : selectedPlayer.performanceStability >= 75 ? 'bg-blue-100 text-blue-800' : selectedPlayer.performanceStability >= 60 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                          {selectedPlayer.performanceStability >= 90 ? 'Excellent' : selectedPlayer.performanceStability >= 75 ? 'Good' : selectedPlayer.performanceStability >= 60 ? 'Fair' : 'Poor'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-semibold">Career Phase</div>
                          <div className="text-sm text-gray-500">{selectedPlayer.age <= 24 ? 'Rising Star' : selectedPlayer.age <= 29 ? 'Prime Years' : 'Veteran Experience'}</div>
                        </div>
                        <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                          {selectedPlayer.age <= 24 ? 'Rising' : selectedPlayer.age <= 29 ? 'Prime' : 'Veteran'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-semibold">WAR Sustainability</div>
                          <div className="text-sm text-gray-500">{selectedPlayer.war ? `${(selectedPlayer.war / selectedPlayer.contractYears).toFixed(2)} WAR/year projected` : 'No data available'}</div>
                        </div>
                        <span className="px-2 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800">
                          {selectedPlayer.war ? (selectedPlayer.war >= 3 ? 'Elite' : selectedPlayer.war >= 2 ? 'Above Avg' : selectedPlayer.war >= 1 ? 'Average' : 'Below Avg') : 'N/A'}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="border border-gray-200 shadow-none">
                <CardHeader>
                  <CardTitle>Performance Projections</CardTitle>
                  <CardDescription>3-year performance outlook based on current trends and age curve analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4">
                      <div className="text-sm text-gray-500 mb-1">Year 1</div>
                      <div className="font-bold text-lg mb-2">{selectedPlayer.war ? (selectedPlayer.war * 1.05).toFixed(1) : '-'} WAR</div>
                      <div className="text-xs text-gray-500">Conservative projection</div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="text-sm text-gray-500 mb-1">Year 2</div>
                      <div className="font-bold text-lg mb-2">{selectedPlayer.war ? (selectedPlayer.war * 1.1).toFixed(1) : '-'} WAR</div>
                      <div className="text-xs text-gray-500">Expected growth</div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="text-sm text-gray-500 mb-1">Year 3</div>
                      <div className="font-bold text-lg mb-2">{selectedPlayer.war ? (selectedPlayer.war * 1.15).toFixed(1) : '-'} WAR</div>
                      <div className="text-xs text-gray-500">Peak projection</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            {/* Market Analysis Tab */}
            <TabsContent value="market-analysis">
              <div className="flex items-center gap-6 mb-6">
                <div>
                  <div className="font-bold text-2xl leading-tight mb-1">{selectedPlayer.name}</div>
                  <div className="text-gray-600 text-base font-medium mb-1">{selectedPlayer.position} • Age {selectedPlayer.age}</div>
                </div>
                <div className="ml-auto flex items-center gap-4">
                  <Button variant="outline">Market Report</Button>
                  <Button variant="outline">Export Analysis</Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card className="border border-gray-200 shadow-none">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-bold">Current Market Value</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-2xl font-bold mb-2">${selectedPlayer.marketValue?.toLocaleString() ?? '-'}</div>
                    <div className="text-sm text-gray-500 mb-3">WAR-based valuation</div>
                    <div className="w-full h-2 rounded bg-gray-200">
                      <div className="h-2 rounded" style={{width: `${selectedPlayer.marketValue ? Math.min(100, (selectedPlayer.marketValue / 50000000) * 100) : 0}%`, background: '#FFD600'}}></div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border border-gray-200 shadow-none">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-bold">Suggested Value</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-2xl font-bold mb-2">${selectedPlayer.suggestedValue?.toLocaleString() ?? '-'}</div>
                    <div className="text-sm text-gray-500 mb-3">Risk-adjusted value</div>
                    <div className="w-full h-2 rounded bg-gray-200">
                      <div className="h-2 rounded" style={{width: `${selectedPlayer.suggestedValue ? Math.min(100, (selectedPlayer.suggestedValue / 50000000) * 100) : 0}%`, background: '#FFD600'}}></div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border border-gray-200 shadow-none">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-bold">Market Stability</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-2xl font-bold mb-2">{selectedPlayer.marketStability}%</div>
                    <div className="text-sm text-gray-500 mb-3">Price volatility</div>
                    <div className="w-full h-2 rounded bg-gray-200">
                      <div className="h-2 rounded" style={{width: `${selectedPlayer.marketStability ?? 0}%`, background: '#FFD600'}}></div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border border-gray-200 shadow-none">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-bold">Value Gap</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-2xl font-bold mb-2">{selectedPlayer.marketValue && selectedPlayer.suggestedValue ? ((selectedPlayer.marketValue - selectedPlayer.suggestedValue) / selectedPlayer.marketValue * 100).toFixed(1) : '-'}%</div>
                    <div className="text-sm text-gray-500 mb-3">Market vs Suggested</div>
                    <div className="w-full h-2 rounded bg-gray-200">
                      <div className="h-2 rounded" style={{width: `${selectedPlayer.marketValue && selectedPlayer.suggestedValue ? Math.abs((selectedPlayer.marketValue - selectedPlayer.suggestedValue) / selectedPlayer.marketValue * 100) : 0}%`, background: '#FFD600'}}></div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <Card className="border border-gray-200 shadow-none">
                  <CardHeader>
                    <CardTitle>Market Position Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-semibold">Market Position</div>
                          <div className="text-sm text-gray-500">{selectedPlayer.marketValue && selectedPlayer.suggestedValue ? (selectedPlayer.marketValue > selectedPlayer.suggestedValue ? 'Overvalued' : 'Undervalued') : 'Fair Value'}</div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${selectedPlayer.marketValue && selectedPlayer.suggestedValue ? (selectedPlayer.marketValue > selectedPlayer.suggestedValue ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800') : 'bg-blue-100 text-blue-800'}`}>
                          {selectedPlayer.marketValue && selectedPlayer.suggestedValue ? (selectedPlayer.marketValue > selectedPlayer.suggestedValue ? 'Overvalued' : 'Undervalued') : 'Fair Value'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-semibold">Contract Efficiency</div>
                          <div className="text-sm text-gray-500">{selectedPlayer.contractEfficiency ? `${selectedPlayer.contractEfficiency}x value` : 'No data'}</div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${selectedPlayer.contractEfficiency ? (selectedPlayer.contractEfficiency >= 5 ? 'bg-green-100 text-green-800' : selectedPlayer.contractEfficiency >= 3 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800') : 'bg-gray-100 text-gray-800'}`}>
                          {selectedPlayer.contractEfficiency ? (selectedPlayer.contractEfficiency >= 5 ? 'Excellent' : selectedPlayer.contractEfficiency >= 3 ? 'Good' : 'Poor') : 'N/A'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-semibold">Market Stability</div>
                          <div className="text-sm text-gray-500">{selectedPlayer.marketStability ? `${selectedPlayer.marketStability}% stable` : 'No data'}</div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${selectedPlayer.marketStability ? (selectedPlayer.marketStability >= 80 ? 'bg-green-100 text-green-800' : selectedPlayer.marketStability >= 60 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800') : 'bg-gray-100 text-gray-800'}`}>
                          {selectedPlayer.marketStability ? (selectedPlayer.marketStability >= 80 ? 'Stable' : selectedPlayer.marketStability >= 60 ? 'Moderate' : 'Volatile') : 'N/A'}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border border-gray-200 shadow-none">
                  <CardHeader>
                    <CardTitle>Comparable Players</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-semibold">Similar Position</div>
                          <div className="text-sm text-gray-500">{selectedPlayer.position} market average</div>
                        </div>
                        <span className="text-sm font-semibold">${selectedPlayer.marketValue ? (selectedPlayer.marketValue * 0.9).toLocaleString() : '-'}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-semibold">Similar Age</div>
                          <div className="text-sm text-gray-500">Age {selectedPlayer.age} average</div>
                        </div>
                        <span className="text-sm font-semibold">${selectedPlayer.marketValue ? (selectedPlayer.marketValue * 1.1).toLocaleString() : '-'}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-semibold">Similar WAR</div>
                          <div className="text-sm text-gray-500">{selectedPlayer.war ? `${selectedPlayer.war} WAR players` : 'No data'}</div>
                        </div>
                        <span className="text-sm font-semibold">${selectedPlayer.marketValue ? (selectedPlayer.marketValue * 0.95).toLocaleString() : '-'}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="border border-gray-200 shadow-none">
                <CardHeader>
                  <CardTitle>Market Trends & Projections</CardTitle>
                  <CardDescription>Market value projections based on current trends and comparable player analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4">
                      <div className="text-sm text-gray-500 mb-1">Conservative Market</div>
                      <div className="font-bold text-lg mb-2">${selectedPlayer.marketValue ? (selectedPlayer.marketValue * 0.85).toLocaleString() : '-'}</div>
                      <div className="text-xs text-gray-500">Based on declining market</div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="text-sm text-gray-500 mb-1">Current Market</div>
                      <div className="font-bold text-lg mb-2">${selectedPlayer.marketValue?.toLocaleString() ?? '-'}</div>
                      <div className="text-xs text-gray-500">WAR-based valuation</div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="text-sm text-gray-500 mb-1">Optimistic Market</div>
                      <div className="font-bold text-lg mb-2">${selectedPlayer.marketValue ? (selectedPlayer.marketValue * 1.25).toLocaleString() : '-'}</div>
                      <div className="text-xs text-gray-500">Based on market growth</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            {/* Advanced Features Tab */}
            <TabsContent value="advanced-features">
              <div className="flex items-center gap-6 mb-6">
                <div>
                  <div className="font-bold text-2xl leading-tight mb-1">{selectedPlayer.name}</div>
                  <div className="text-gray-600 text-base font-medium mb-1">{selectedPlayer.position} • Age {selectedPlayer.age}</div>
                </div>
                <div className="ml-auto flex items-center gap-4">
                  <Button variant="outline">AI Analysis</Button>
                  <Button variant="outline">Generate Scenarios</Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card className="border border-gray-200 shadow-none">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-lg font-bold">
                      <Brain className="w-5 h-5" />
                      AI Risk Score
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-2xl font-bold mb-2">{selectedPlayer.riskScore}/100</div>
                    <div className="text-sm text-gray-500 mb-3">Machine learning assessment</div>
                    <div className="w-full h-2 rounded bg-gray-200">
                      <div className="h-2 rounded" style={{width: `${selectedPlayer.riskScore ?? 0}%`, background: '#FFD600'}}></div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border border-gray-200 shadow-none">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-lg font-bold">
                      <Award className="w-5 h-5" />
                      Optimal Contract
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-2xl font-bold mb-2">${selectedPlayer.suggestedValue?.toLocaleString() ?? '-'}</div>
                    <div className="text-sm text-gray-500 mb-3">AI-recommended value</div>
                    <div className="w-full h-2 rounded bg-gray-200">
                      <div className="h-2 rounded" style={{width: `${selectedPlayer.suggestedValue ? Math.min(100, (selectedPlayer.suggestedValue / 50000000) * 100) : 0}%`, background: '#FFD600'}}></div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border border-gray-200 shadow-none">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-lg font-bold">
                      <CheckCircle className="w-5 h-5" />
                      Insurance Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-2xl font-bold mb-2">{selectedPlayer.insuranceThreshold ? 'Eligible' : 'Not Eligible'}</div>
                    <div className="text-sm text-gray-500 mb-3">Risk threshold met</div>
                    <div className="w-full h-2 rounded bg-gray-200">
                      <div className="h-2 rounded" style={{width: `${selectedPlayer.insuranceThreshold ? 100 : 0}%`, background: '#FFD600'}}></div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <Card className="border border-gray-200 shadow-none">
                  <CardHeader>
                    <CardTitle>AI Contract Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-semibold">Contract Structure</div>
                          <div className="text-sm text-gray-500">{selectedPlayer.riskScore <= 50 ? 'Long-term extension' : selectedPlayer.riskScore <= 75 ? 'Medium-term deal' : 'Short-term contract'}</div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${selectedPlayer.riskScore <= 50 ? 'bg-green-100 text-green-800' : selectedPlayer.riskScore <= 75 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                          {selectedPlayer.riskScore <= 50 ? 'Recommended' : selectedPlayer.riskScore <= 75 ? 'Consider' : 'Avoid'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-semibold">Performance Incentives</div>
                          <div className="text-sm text-gray-500">{selectedPlayer.performanceStability >= 80 ? 'Include WAR bonuses' : 'Base salary focus'}</div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${selectedPlayer.performanceStability >= 80 ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                          {selectedPlayer.performanceStability >= 80 ? 'Recommended' : 'Optional'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-semibold">Injury Protection</div>
                          <div className="text-sm text-gray-500">{selectedPlayer.injuryHistory >= 30 ? 'Include injury clauses' : 'Standard terms'}</div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${selectedPlayer.injuryHistory >= 30 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                          {selectedPlayer.injuryHistory >= 30 ? 'Required' : 'Standard'}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border border-gray-200 shadow-none">
                  <CardHeader>
                    <CardTitle>Risk Mitigation Strategies</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-semibold">Performance Monitoring</div>
                          <div className="text-sm text-gray-500">{selectedPlayer.performanceStability < 70 ? 'Enhanced tracking' : 'Standard monitoring'}</div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${selectedPlayer.performanceStability < 70 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                          {selectedPlayer.performanceStability < 70 ? 'Enhanced' : 'Standard'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-semibold">Medical Oversight</div>
                          <div className="text-sm text-gray-500">{selectedPlayer.injuryHistory >= 25 ? 'Regular assessments' : 'Annual checkups'}</div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${selectedPlayer.injuryHistory >= 25 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                          {selectedPlayer.injuryHistory >= 25 ? 'Enhanced' : 'Standard'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-semibold">Behavioral Support</div>
                          <div className="text-sm text-gray-500">{selectedPlayer.mentalHealth < 85 ? 'Wellness program' : 'Available resources'}</div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${selectedPlayer.mentalHealth < 85 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                          {selectedPlayer.mentalHealth < 85 ? 'Recommended' : 'Optional'}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <Card className="border border-gray-200 shadow-none">
                  <CardHeader>
                    <CardTitle>Scenario Analysis</CardTitle>
                    <CardDescription>AI-generated contract scenarios based on risk assessment</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <div className="font-semibold mb-2">Best Case Scenario</div>
                        <div className="text-sm text-gray-500 mb-2">Optimal performance and health outcomes</div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>Contract Value: <span className="font-bold">${selectedPlayer.suggestedValue ? (selectedPlayer.suggestedValue * 1.3).toLocaleString() : '-'}</span></div>
                          <div>Duration: <span className="font-bold">{selectedPlayer.contractYears + 2} years</span></div>
                          <div>WAR Projection: <span className="font-bold">{selectedPlayer.war ? (selectedPlayer.war * 1.2).toFixed(1) : '-'}</span></div>
                          <div>Risk Score: <span className="font-bold">{Math.max(0, selectedPlayer.riskScore - 20)}</span></div>
                        </div>
                      </div>
                      <div className="border rounded-lg p-4">
                        <div className="font-semibold mb-2">Worst Case Scenario</div>
                        <div className="text-sm text-gray-500 mb-2">Performance decline and injury risk</div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>Contract Value: <span className="font-bold">${selectedPlayer.suggestedValue ? (selectedPlayer.suggestedValue * 0.7).toLocaleString() : '-'}</span></div>
                          <div>Duration: <span className="font-bold">{Math.max(1, selectedPlayer.contractYears - 1)} years</span></div>
                          <div>WAR Projection: <span className="font-bold">{selectedPlayer.war ? (selectedPlayer.war * 0.8).toFixed(1) : '-'}</span></div>
                          <div>Risk Score: <span className="font-bold">{Math.min(100, selectedPlayer.riskScore + 30)}</span></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border border-gray-200 shadow-none">
                  <CardHeader>
                    <CardTitle>Advanced Contract Structuring</CardTitle>
                    <CardDescription>AI-optimized contract terms and conditions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <div className="font-semibold mb-2">Base Structure</div>
                        <div className="text-sm space-y-1">
                          <div>• Base Salary: ${selectedPlayer.salary?.toLocaleString() ?? '-'}</div>
                          <div>• Performance Bonuses: ${selectedPlayer.war ? (selectedPlayer.war * 500000).toLocaleString() : '-'}/year</div>
                          <div>• Injury Protection: {selectedPlayer.injuryHistory >= 25 ? 'Enhanced' : 'Standard'}</div>
                          <div>• Behavioral Clauses: {selectedPlayer.mentalHealth < 85 ? 'Required' : 'Standard'}</div>
                        </div>
                      </div>
                      <div className="border rounded-lg p-4">
                        <div className="font-semibold mb-2">Incentive Structure</div>
                        <div className="text-sm space-y-1">
                          <div>• WAR Thresholds: {selectedPlayer.war ? `${(selectedPlayer.war * 0.8).toFixed(1)} - ${(selectedPlayer.war * 1.2).toFixed(1)}` : 'N/A'}</div>
                          <div>• Health Bonuses: {selectedPlayer.recoveryStability >= 90 ? 'Available' : 'Not recommended'}</div>
                          <div>• Team Performance: {selectedPlayer.contractStability >= 90 ? 'Included' : 'Optional'}</div>
                          <div>• Market Adjustments: {selectedPlayer.marketStability >= 80 ? 'Annual review' : 'Bi-annual review'}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="border border-gray-200 shadow-none">
                <CardHeader>
                  <CardTitle>AI Insights & Recommendations</CardTitle>
                  <CardDescription>Machine learning analysis and strategic recommendations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4">
                      <div className="text-sm text-gray-500 mb-1">Primary Recommendation</div>
                      <div className="font-bold text-lg mb-2">{selectedPlayer.riskScore <= 50 ? 'Extend Contract' : selectedPlayer.riskScore <= 75 ? 'Evaluate Options' : 'Monitor Closely'}</div>
                      <div className="text-xs text-gray-500">{selectedPlayer.riskScore <= 50 ? 'Low risk, high value player' : selectedPlayer.riskScore <= 75 ? 'Moderate risk, evaluate carefully' : 'High risk, proceed with caution'}</div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="text-sm text-gray-500 mb-1">Timeline</div>
                      <div className="font-bold text-lg mb-2">{selectedPlayer.contractYears <= 2 ? 'Immediate Action' : selectedPlayer.contractYears <= 4 ? 'Plan Ahead' : 'Long-term Planning'}</div>
                      <div className="text-xs text-gray-500">{selectedPlayer.contractYears <= 2 ? 'Contract expiring soon' : selectedPlayer.contractYears <= 4 ? 'Mid-term planning needed' : 'Long-term strategic planning'}</div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="text-sm text-gray-500 mb-1">Market Position</div>
                      <div className="font-bold text-lg mb-2">{selectedPlayer.marketValue && selectedPlayer.suggestedValue ? (selectedPlayer.marketValue > selectedPlayer.suggestedValue ? 'Overvalued' : 'Undervalued') : 'Fair Value'}</div>
                      <div className="text-xs text-gray-500">{selectedPlayer.marketValue && selectedPlayer.suggestedValue ? (selectedPlayer.marketValue > selectedPlayer.suggestedValue ? 'Consider waiting for market correction' : 'Good time to negotiate') : 'Market value aligns with assessment'}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </div>
  )
} 