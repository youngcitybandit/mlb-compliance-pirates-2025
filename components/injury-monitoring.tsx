"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Activity,
  Heart,
  Zap,
  Clock,
  Shield,
} from "lucide-react"

interface Player {
  id: number
  name: string
  position: string
  riskScore: number
  availability: number
  injuryHistory: string[]
  contractValue: number
  remainingValue: number
}

interface InjuryMonitoringProps {
  playersData: Player[]
  onRiskUpdate: (playerId: number, newRiskScore: number) => void
}

export function InjuryMonitoring({ playersData, onRiskUpdate }: InjuryMonitoringProps) {
  const [monitoringData, setMonitoringData] = useState<{ [key: number]: any }>({})
  const [activeAlerts, setActiveAlerts] = useState<any[]>([])

  // Simulate real-time monitoring data
  useEffect(() => {
    const interval = setInterval(() => {
      const newData: { [key: number]: any } = {}
      const newAlerts: any[] = []

      playersData.forEach((player) => {
        // Simulate fluctuating risk scores
        const baseRisk = player.riskScore
        const fluctuation = Math.random() * 10 - 5 // -5 to +5
        const newRiskScore = Math.max(0, Math.min(100, baseRisk + fluctuation))
        
        newData[player.id] = {
          currentRisk: newRiskScore,
          trend: newRiskScore > baseRisk ? "increasing" : "decreasing",
          lastUpdated: new Date().toLocaleTimeString(),
          alerts: [],
          vitals: {
            heartRate: Math.floor(Math.random() * 20) + 60, // 60-80
            sleepQuality: Math.floor(Math.random() * 30) + 70, // 70-100
            stressLevel: Math.floor(Math.random() * 40) + 20, // 20-60
            fatigueIndex: Math.floor(Math.random() * 50) + 30, // 30-80
          }
        }

        // Generate alerts for high-risk situations
        if (newRiskScore > 80) {
          newAlerts.push({
            playerId: player.id,
            playerName: player.name,
            type: "critical",
            message: `${player.name} risk score critical: ${newRiskScore.toFixed(1)}`,
            timestamp: new Date().toLocaleTimeString()
          })
        } else if (newRiskScore > 70) {
          newAlerts.push({
            playerId: player.id,
            playerName: player.name,
            type: "warning",
            message: `${player.name} risk score elevated: ${newRiskScore.toFixed(1)}`,
            timestamp: new Date().toLocaleTimeString()
          })
        }

        // Update parent component
        onRiskUpdate(player.id, newRiskScore)
      })

      setMonitoringData(newData)
      setActiveAlerts(newAlerts)
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [playersData, onRiskUpdate])

  const getRiskColor = (score: number) => {
    if (score >= 80) return "text-red-600 bg-red-50 border-red-200"
    if (score >= 60) return "text-yellow-600 bg-yellow-50 border-yellow-200"
    return "text-green-600 bg-green-50 border-green-200"
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "increasing":
        return <TrendingUp className="h-4 w-4 text-red-500" />
      case "decreasing":
        return <TrendingDown className="h-4 w-4 text-green-500" />
      default:
        return <Activity className="h-4 w-4 text-blue-500" />
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      default:
        return <Activity className="h-4 w-4 text-blue-500" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Active Alerts */}
      {activeAlerts.length > 0 && (
        <Alert className={activeAlerts.some(a => a.type === "critical") ? "border-red-200 bg-red-50" : "border-yellow-200 bg-yellow-50"}>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>{activeAlerts.length} active alerts</strong> - 
            {activeAlerts.map((alert, index) => (
              <span key={index} className="block text-sm">
                {alert.message} ({alert.timestamp})
              </span>
            ))}
          </AlertDescription>
        </Alert>
      )}

      {/* Real-time Monitoring Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {playersData.map((player) => {
          const data = monitoringData[player.id]
          if (!data) return null

          return (
            <Card key={player.id} className="relative">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{player.name}</CardTitle>
                    <CardDescription>{player.position}</CardDescription>
                  </div>
                  <Badge className={getRiskColor(data.currentRisk)}>
                    {data.currentRisk.toFixed(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Risk Trend */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Risk Trend</span>
                  <div className="flex items-center gap-1">
                    {getTrendIcon(data.trend)}
                    <span className="text-sm capitalize">{data.trend}</span>
                  </div>
                </div>

                {/* Risk Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Current Risk</span>
                    <span>{data.currentRisk.toFixed(1)}/100</span>
                  </div>
                  <Progress value={data.currentRisk} className="h-2" />
                </div>

                {/* Vitals Monitoring */}
                <div className="grid grid-cols-2 gap-3 pt-2 border-t">
                  <div className="text-center">
                    <Heart className="h-4 w-4 mx-auto text-red-500 mb-1" />
                    <div className="text-xs font-medium">{data.vitals.heartRate} bpm</div>
                    <div className="text-xs text-gray-500">Heart Rate</div>
                  </div>
                  <div className="text-center">
                    <Zap className="h-4 w-4 mx-auto text-blue-500 mb-1" />
                    <div className="text-xs font-medium">{data.vitals.fatigueIndex}%</div>
                    <div className="text-xs text-gray-500">Fatigue</div>
                  </div>
                  <div className="text-center">
                    <Shield className="h-4 w-4 mx-auto text-green-500 mb-1" />
                    <div className="text-xs font-medium">{data.vitals.sleepQuality}%</div>
                    <div className="text-xs text-gray-500">Sleep</div>
                  </div>
                  <div className="text-center">
                    <Activity className="h-4 w-4 mx-auto text-orange-500 mb-1" />
                    <div className="text-xs font-medium">{data.vitals.stressLevel}%</div>
                    <div className="text-xs text-gray-500">Stress</div>
                  </div>
                </div>

                {/* Last Updated */}
                <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t">
                  <span>Last Updated</span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{data.lastUpdated}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    View Details
                  </Button>
                  <Button size="sm" className="flex-1">
                    Adjust Risk
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Monitoring Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Monitoring Summary
          </CardTitle>
          <CardDescription>Real-time risk assessment overview</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {playersData.filter(p => (monitoringData[p.id]?.currentRisk || p.riskScore) < 60).length}
              </div>
              <div className="text-sm text-green-700">Low Risk</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {playersData.filter(p => {
                  const risk = monitoringData[p.id]?.currentRisk || p.riskScore
                  return risk >= 60 && risk < 80
                }).length}
              </div>
              <div className="text-sm text-yellow-700">Medium Risk</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {playersData.filter(p => (monitoringData[p.id]?.currentRisk || p.riskScore) >= 80).length}
              </div>
              <div className="text-sm text-red-700">High Risk</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {activeAlerts.length}
              </div>
              <div className="text-sm text-blue-700">Active Alerts</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 