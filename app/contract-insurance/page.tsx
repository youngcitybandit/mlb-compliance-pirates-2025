"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  AlertTriangle,
  DollarSign,
  TrendingUp,
  Shield,
  Users,
  FileText,
  Calculator,
  BarChart3,
  Clock,
} from "lucide-react"
import { InjuryMonitoring } from "@/components/injury-monitoring"

// Sample player data
const playersData = [
  {
    id: 1,
    name: "Paul Skenes",
    position: "SP",
    contractValue: 85000000,
    contractYears: 5,
    remainingValue: 68000000,
    riskScore: 87,
    injuryHistory: ["Tommy John Surgery (2022)", "Shoulder Strain (2023)"],
    availability: 72,
    warPerGame: 0.008,
    recommendInsurance: true,
    insuranceValue: 45000000,
    premiumEstimate: 2100000,
  },
  {
    id: 2,
    name: "Ke'Bryan Hayes",
    position: "3B",
    contractValue: 70000000,
    contractYears: 8,
    remainingValue: 52500000,
    riskScore: 65,
    injuryHistory: ["Back Strain (2023)", "Wrist Injury (2022)"],
    availability: 85,
    warPerGame: 0.006,
    recommendInsurance: false,
    insuranceValue: 0,
    premiumEstimate: 0,
  },
  {
    id: 3,
    name: "Bryan Reynolds",
    position: "OF",
    contractValue: 106500000,
    contractYears: 8,
    remainingValue: 79875000,
    riskScore: 45,
    injuryHistory: ["Minor Hamstring (2023)"],
    availability: 92,
    warPerGame: 0.007,
    recommendInsurance: false,
    insuranceValue: 0,
    premiumEstimate: 0,
  },
  {
    id: 4,
    name: "Mitch Keller",
    position: "SP",
    contractValue: 77500000,
    contractYears: 5,
    remainingValue: 62000000,
    riskScore: 78,
    injuryHistory: ["Shoulder Surgery (2021)", "Elbow Inflammation (2023)"],
    availability: 78,
    warPerGame: 0.009,
    recommendInsurance: true,
    insuranceValue: 35000000,
    premiumEstimate: 1750000,
  },
]

export default function InsuranceRiskModule() {
  const [selectedPlayer, setSelectedPlayer] = useState(playersData[0])
  const [realTimeRiskScores, setRealTimeRiskScores] = useState<{ [key: number]: number }>({})

  const totalExposure = playersData.reduce((sum, player) => sum + player.remainingValue, 0)
  const recommendedCoverage = playersData
    .filter((p) => p.recommendInsurance)
    .reduce((sum, player) => sum + player.insuranceValue, 0)
  const totalPremiums = playersData
    .filter((p) => p.recommendInsurance)
    .reduce((sum, player) => sum + player.premiumEstimate, 0)
  const highRiskPlayers = playersData.filter((p) => p.riskScore >= 70).length

  const getRiskColor = (score: number) => {
    if (score >= 80) return "text-red-600 bg-red-50"
    if (score >= 60) return "text-yellow-600 bg-yellow-50"
    return "text-green-600 bg-green-50"
  }

  const getRiskLevel = (score: number) => {
    if (score >= 80) return "HIGH"
    if (score >= 60) return "MEDIUM"
    return "LOW"
  }

  const handleRiskUpdate = (playerId: number, newRiskScore: number) => {
    setRealTimeRiskScores((prev) => ({
      ...prev,
      [playerId]: newRiskScore,
    }))
  }

  const updatedPlayersData = playersData.map((player) => ({
    ...player,
    riskScore: realTimeRiskScores[player.id] || player.riskScore,
  }))

  const currentSelectedPlayer = {
    ...selectedPlayer,
    riskScore: realTimeRiskScores[selectedPlayer.id] || selectedPlayer.riskScore,
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Insurance Risk Intelligence</h1>
            <p className="text-gray-600">Pittsburgh Pirates Contract Underwriting & Coverage Evaluation</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              2024 Season
            </Badge>
            <Badge variant="outline" className="bg-green-50 text-green-700">
              Active Monitoring
            </Badge>
          </div>
        </div>

        {/* Key Metrics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Contract Exposure</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${(totalExposure / 1000000).toFixed(1)}M</div>
              <p className="text-xs text-muted-foreground">Remaining contract value</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recommended Coverage</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${(recommendedCoverage / 1000000).toFixed(1)}M</div>
              <p className="text-xs text-muted-foreground">Insurance value needed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Annual Premiums</CardTitle>
              <Calculator className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${(totalPremiums / 1000000).toFixed(1)}M</div>
              <p className="text-xs text-muted-foreground">Estimated cost per year</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Risk Players</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{highRiskPlayers}</div>
              <p className="text-xs text-muted-foreground">Risk score ≥ 70</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="portfolio" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="portfolio">Portfolio Overview</TabsTrigger>
            <TabsTrigger value="live-monitoring">Live Monitoring</TabsTrigger>
            <TabsTrigger value="risk-analysis">Risk Analysis</TabsTrigger>
            <TabsTrigger value="calculator">Exposure Calculator</TabsTrigger>
            <TabsTrigger value="policies">Policy Generator</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
          </TabsList>

          {/* Portfolio Overview */}
          <TabsContent value="portfolio" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Player Risk Cards */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Player Risk Assessment
                  </CardTitle>
                  <CardDescription>Current roster injury risk evaluation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {updatedPlayersData.map((player) => (
                    <div
                      key={player.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedPlayer.id === player.id ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"
                      }`}
                      onClick={() => setSelectedPlayer(player)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="font-semibold">{player.name}</h3>
                          <p className="text-sm text-gray-600">{player.position}</p>
                        </div>
                        <Badge className={getRiskColor(player.riskScore)}>{getRiskLevel(player.riskScore)} RISK</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Risk Score: {player.riskScore}/100</span>
                        <span>Availability: {player.availability}%</span>
                      </div>
                      <Progress value={player.riskScore} className="mt-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Selected Player Details */}
              <Card>
                <CardHeader>
                  <CardTitle>{currentSelectedPlayer.name} - Detailed Analysis</CardTitle>
                  <CardDescription>Contract exposure and insurance recommendations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Contract Value</p>
                      <p className="text-lg font-semibold">
                        ${(currentSelectedPlayer.contractValue / 1000000).toFixed(1)}M
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Remaining Value</p>
                      <p className="text-lg font-semibold">
                        ${(currentSelectedPlayer.remainingValue / 1000000).toFixed(1)}M
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-2">Injury History</p>
                    <div className="space-y-1">
                      {currentSelectedPlayer.injuryHistory.map((injury, index) => (
                        <Badge key={index} variant="outline" className="mr-2">
                          {injury}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {currentSelectedPlayer.recommendInsurance && (
                    <Alert>
                      <Shield className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Insurance Recommended:</strong> $
                        {(currentSelectedPlayer.insuranceValue / 1000000).toFixed(1)}M coverage at estimated $
                        {(currentSelectedPlayer.premiumEstimate / 1000000).toFixed(1)}M annual premium
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="pt-4 border-t">
                    <Button
                      className="w-full"
                      variant={currentSelectedPlayer.recommendInsurance ? "default" : "outline"}
                    >
                      {currentSelectedPlayer.recommendInsurance ? "Generate Policy Quote" : "Monitor Risk Level"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Live Monitoring */}
          <TabsContent value="live-monitoring" className="space-y-6">
            <InjuryMonitoring playersData={updatedPlayersData} onRiskUpdate={handleRiskUpdate} />
          </TabsContent>

          {/* Risk Analysis */}
          <TabsContent value="risk-analysis" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Risk Distribution Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">High Risk (80-100)</span>
                      <span className="text-sm text-gray-600">2 players</span>
                    </div>
                    <Progress value={50} className="h-2" />

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Medium Risk (60-79)</span>
                      <span className="text-sm text-gray-600">1 player</span>
                    </div>
                    <Progress value={25} className="h-2" />

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Low Risk (0-59)</span>
                      <span className="text-sm text-gray-600">1 player</span>
                    </div>
                    <Progress value={25} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Risk Triggers
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-sm">Tommy John Surgery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm">Multiple IL Stints</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm">Shoulder Surgery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span className="text-sm">Low Availability</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Exposure Calculator */}
          <TabsContent value="calculator" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Contract Exposure Calculator
                </CardTitle>
                <CardDescription>
                  Calculate financial risk based on projected missed games and performance impact
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Calculation Formula</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <code className="text-sm">Projected Missed Games × WAR-per-game × $ per WAR × Contract Cost</code>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>Example (Paul Skenes):</strong>
                      </p>
                      <p>45 missed games × 0.008 WAR/game × $8M/WAR = $2.88M exposure</p>
                      <p>Plus contract guarantee risk = $45M total exposure</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold">Risk Scenarios</h3>
                    <div className="space-y-3">
                      <div className="p-3 border rounded">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Minor Injury (15 games)</span>
                          <span className="text-green-600">$0.96M</span>
                        </div>
                      </div>
                      <div className="p-3 border rounded">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Major Injury (60 games)</span>
                          <span className="text-yellow-600">$3.84M</span>
                        </div>
                      </div>
                      <div className="p-3 border rounded">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Season-Ending (162 games)</span>
                          <span className="text-red-600">$10.37M</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Policy Generator */}
          <TabsContent value="policies" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Insurance Policy Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {playersData
                    .filter((p) => p.recommendInsurance)
                    .map((player) => (
                      <div key={player.id} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold">{player.name}</h3>
                            <p className="text-sm text-gray-600">{player.position}</p>
                          </div>
                          <Badge className="bg-blue-50 text-blue-700">Eligible</Badge>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Coverage Amount:</span>
                            <span className="font-medium">${(player.insuranceValue / 1000000).toFixed(1)}M</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Annual Premium:</span>
                            <span className="font-medium">${(player.premiumEstimate / 1000000).toFixed(1)}M</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Premium Rate:</span>
                            <span className="font-medium">
                              {((player.premiumEstimate / player.insuranceValue) * 100).toFixed(1)}%
                            </span>
                          </div>
                        </div>
                        <Button size="sm" className="w-full mt-3">
                          Generate Quote Package
                        </Button>
                      </div>
                    ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Policy Terms & Conditions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Standard Coverage Includes:</h4>
                    <ul className="text-sm space-y-1 text-gray-600">
                      <li>• Career-ending injuries</li>
                      <li>• Season-ending injuries (60+ days IL)</li>
                      <li>• Permanent total disability</li>
                      <li>• Performance degradation coverage</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Common Exclusions:</h4>
                    <ul className="text-sm space-y-1 text-gray-600">
                      <li>• Pre-existing conditions (first 12 months)</li>
                      <li>• Substance abuse related injuries</li>
                      <li>• Off-field recreational activities</li>
                      <li>• Mental health conditions</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Deductible Options:</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>10% deductible:</span>
                        <span>Standard premium</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>20% deductible:</span>
                        <span>15% premium reduction</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>30% deductible:</span>
                        <span>25% premium reduction</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Compliance */}
          <TabsContent value="compliance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Compliance Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-sm font-medium">CBA Compliance</span>
                    <Badge className="bg-green-100 text-green-800">✓ Compliant</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-sm font-medium">PHI Protection</span>
                    <Badge className="bg-green-100 text-green-800">✓ Secured</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-sm font-medium">Audit Trail</span>
                    <Badge className="bg-green-100 text-green-800">✓ Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <span className="text-sm font-medium">Insurance Carrier Approval</span>
                    <Badge className="bg-yellow-100 text-yellow-800">⏳ Pending</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Recent Activity Log
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span>Risk assessment updated - P. Skenes</span>
                      <span className="text-gray-500">2h ago</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span>Policy quote generated - M. Keller</span>
                      <span className="text-gray-500">1d ago</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span>Compliance audit completed</span>
                      <span className="text-gray-500">3d ago</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span>New injury trigger activated</span>
                      <span className="text-gray-500">1w ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 