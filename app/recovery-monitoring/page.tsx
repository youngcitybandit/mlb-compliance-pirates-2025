"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Activity,
  Heart,
  Moon,
  Zap,
  Brain,
  Target,
  BarChart3,
  Clock,
  Shield,
  Thermometer,
  Gauge,
  LineChart,
  Activity as ActivityIcon,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Bell
} from "lucide-react"
import { players } from "@/data/player-roster"
import {
  LineChart as RechartsLineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts"

interface RecoveryIndex {
  playerId: string
  playerName: string
  position: string
  compositeScore: number
  hrvScore: number
  restingHeartRate: number
  sleepQuality: number
  fatigueSurvey: number
  stressLevel: number
  lastUpdated: string
  trend: "Improving" | "Stable" | "Declining"
  alertLevel: "Critical" | "Warning" | "Good" | "Optimal"
  recoveryRecommendation: string
  sleepDuration: number
  deepSleepTime: number
  sleepConsistency: number
  mentalStressScore: number
  wellnessSurveyScore: number
  readinessScore: number
  fatigueFlag: boolean
  sleepAlert: boolean
  stressIntervention: boolean
}

interface PerformanceConsistency {
  playerId: string
  playerName: string
  position: string
  consistencyScore: number
  rollingOPS?: number
  rollingERA?: number
  velocityBaseline?: number
  currentVelocity?: number
  exitVelocityBaseline?: number
  currentExitVelocity?: number
  sprintSpeedBaseline?: number
  currentSprintSpeed?: number
  performanceVariance: number
  trend: "Improving" | "Stable" | "Declining"
  alertLevel: "Critical" | "Warning" | "Good" | "Optimal"
  consistencyRecommendation: string
  opsDrop7Day?: number
  commandDrift?: number
  velocityDecline?: number
  batSpeedDecline?: number
  sprintSpeedDrop?: number
  opsThresholdBreach: boolean
  commandThresholdBreach: boolean
  velocityThresholdBreach: boolean
  batSpeedThresholdBreach: boolean
  sprintSpeedThresholdBreach: boolean
}

interface WorkloadMetrics {
  playerId: string
  playerName: string
  position: string
  gamesPlayed: number
  consecutiveGames: number
  restDays: number
  cumulativeLoad: number
  redZoneLevel: "Safe" | "Caution" | "Danger" | "Critical"
  workloadRecommendation: string
  optimalRestTiming: string
  gameLoadIndex7Day: number
  gameLoadIndex14Day: number
  pitchCountAccumulation?: number
  highIntensityActivityIndex: number
  backToBackDaysPlayed: number
  cumulativeTravelFatigue: number
  gameLoadThresholdBreach: boolean
  pitchCountThresholdBreach: boolean
  highIntensityThresholdBreach: boolean
  consecutiveGamesThresholdBreach: boolean
  travelFatigueThresholdBreach: boolean
}

interface InjuryRiskMetrics {
  playerId: string
  playerName: string
  position: string
  injuryRiskScore: number
  returnToPlayFatigueSlope: number
  recurringInjuryRisk: number
  trainingLoadVariance: number
  injuryRiskLevel: "Low" | "Medium" | "High" | "Critical"
  injuryRecommendation: string
  injuryRiskThresholdBreach: boolean
  incompleteRehabFlag: boolean
  recurringInjuryFlag: boolean
  trainingLoadSpike: boolean
  previousInjuries: string[]
  currentInjuryStatus?: string
  rehabProgress?: number
}

interface ComplianceMetrics {
  playerId: string
  playerName: string
  position: string
  ilEligibilityStatus: "Eligible" | "Ineligible" | "On IL"
  workloadRuleViolations: number
  mandatoryTrainingCompletion: number
  decisionAuditTrail: number
  complianceScore: number
  complianceLevel: "Compliant" | "Warning" | "Violation"
  complianceRecommendation: string
  ilMinimumDaysRemaining?: number
  ruleViolationDetails: string[]
  trainingModulesCompleted: string[]
  trainingModulesRequired: string[]
  auditTrailCompleteness: number
  lastDecisionDate?: string
  decisionJustification?: string
}

interface WellnessMetrics {
  playerId: string
  playerName: string
  sleepDuration: number
  sleepQuality: number
  stressScore: number
  hydrationLevel: number
  nutritionScore: number
  mentalFatigue: number
  physicalFatigue: number
  overallWellness: number
  wellnessRecommendation: string
}

const recoveryIndexData: RecoveryIndex[] = [
  {
    playerId: "1",
    playerName: "Oneil Cruz",
    position: "SS",
    compositeScore: 78,
    hrvScore: 85,
    restingHeartRate: 52,
    sleepQuality: 82,
    fatigueSurvey: 75,
    stressLevel: 30,
    lastUpdated: "2025-06-24",
    trend: "Improving",
    alertLevel: "Good",
    recoveryRecommendation: "Maintain current recovery routine",
    sleepDuration: 8.2,
    deepSleepTime: 2.1,
    sleepConsistency: 85,
    mentalStressScore: 25,
    wellnessSurveyScore: 82,
    readinessScore: 78,
    fatigueFlag: false,
    sleepAlert: false,
    stressIntervention: false
  },
  {
    playerId: "2",
    playerName: "Ke'Bryan Hayes",
    position: "3B",
    compositeScore: 45,
    hrvScore: 60,
    restingHeartRate: 68,
    sleepQuality: 55,
    fatigueSurvey: 40,
    stressLevel: 65,
    lastUpdated: "2025-06-24",
    trend: "Declining",
    alertLevel: "Warning",
    recoveryRecommendation: "Increase sleep duration, reduce stress",
    sleepDuration: 6.2,
    deepSleepTime: 1.3,
    sleepConsistency: 45,
    mentalStressScore: 70,
    wellnessSurveyScore: 48,
    readinessScore: 42,
    fatigueFlag: true,
    sleepAlert: true,
    stressIntervention: true
  },
  {
    playerId: "4",
    playerName: "Mitch Keller",
    position: "SP",
    compositeScore: 92,
    hrvScore: 90,
    restingHeartRate: 48,
    sleepQuality: 88,
    fatigueSurvey: 85,
    stressLevel: 20,
    lastUpdated: "2025-06-24",
    trend: "Improving",
    alertLevel: "Optimal",
    recoveryRecommendation: "Excellent recovery - ready for next start",
    sleepDuration: 8.8,
    deepSleepTime: 2.4,
    sleepConsistency: 92,
    mentalStressScore: 15,
    wellnessSurveyScore: 90,
    readinessScore: 94,
    fatigueFlag: false,
    sleepAlert: false,
    stressIntervention: false
  },
  {
    playerId: "5",
    playerName: "David Bednar",
    position: "CL",
    compositeScore: 32,
    hrvScore: 45,
    restingHeartRate: 72,
    sleepQuality: 40,
    fatigueSurvey: 35,
    stressLevel: 80,
    lastUpdated: "2025-06-24",
    trend: "Declining",
    alertLevel: "Critical",
    recoveryRecommendation: "Immediate rest day required",
    sleepDuration: 5.8,
    deepSleepTime: 0.9,
    sleepConsistency: 35,
    mentalStressScore: 85,
    wellnessSurveyScore: 30,
    readinessScore: 28,
    fatigueFlag: true,
    sleepAlert: true,
    stressIntervention: true
  }
]

const performanceConsistencyData: PerformanceConsistency[] = [
  {
    playerId: "1",
    playerName: "Oneil Cruz",
    position: "SS",
    consistencyScore: 85,
    rollingOPS: 0.820,
    exitVelocityBaseline: 92.5,
    currentExitVelocity: 91.8,
    sprintSpeedBaseline: 28.5,
    currentSprintSpeed: 28.2,
    performanceVariance: 0.12,
    trend: "Stable",
    alertLevel: "Good",
    consistencyRecommendation: "Maintain current performance level",
    opsDrop7Day: 0.05,
    batSpeedDecline: 2.1,
    sprintSpeedDrop: 1.1,
    opsThresholdBreach: false,
    commandThresholdBreach: false,
    velocityThresholdBreach: false,
    batSpeedThresholdBreach: false,
    sprintSpeedThresholdBreach: false
  },
  {
    playerId: "2",
    playerName: "Ke'Bryan Hayes",
    position: "3B",
    consistencyScore: 62,
    rollingOPS: 0.745,
    exitVelocityBaseline: 88.2,
    currentExitVelocity: 85.1,
    sprintSpeedBaseline: 27.8,
    currentSprintSpeed: 26.9,
    performanceVariance: 0.28,
    trend: "Declining",
    alertLevel: "Warning",
    consistencyRecommendation: "Monitor for fatigue-related decline",
    opsDrop7Day: 0.18,
    batSpeedDecline: 6.2,
    sprintSpeedDrop: 3.2,
    opsThresholdBreach: true,
    commandThresholdBreach: false,
    velocityThresholdBreach: false,
    batSpeedThresholdBreach: true,
    sprintSpeedThresholdBreach: true
  },
  {
    playerId: "4",
    playerName: "Mitch Keller",
    position: "SP",
    consistencyScore: 88,
    rollingERA: 3.15,
    velocityBaseline: 94.2,
    currentVelocity: 94.8,
    performanceVariance: 0.08,
    trend: "Improving",
    alertLevel: "Good",
    consistencyRecommendation: "Excellent command and velocity consistency",
    commandDrift: 0.05,
    velocityDecline: 0.6,
    opsDrop7Day: 0,
    batSpeedDecline: 0,
    sprintSpeedDrop: 0,
    opsThresholdBreach: false,
    commandThresholdBreach: false,
    velocityThresholdBreach: false,
    batSpeedThresholdBreach: false,
    sprintSpeedThresholdBreach: false
  },
  {
    playerId: "5",
    playerName: "David Bednar",
    position: "CL",
    consistencyScore: 38,
    rollingERA: 4.85,
    velocityBaseline: 96.5,
    currentVelocity: 93.2,
    performanceVariance: 0.45,
    trend: "Declining",
    alertLevel: "Critical",
    consistencyRecommendation: "Significant velocity drop - rest recommended",
    commandDrift: 0.25,
    velocityDecline: 3.3,
    opsDrop7Day: 0,
    batSpeedDecline: 0,
    sprintSpeedDrop: 0,
    opsThresholdBreach: false,
    commandThresholdBreach: true,
    velocityThresholdBreach: true,
    batSpeedThresholdBreach: false,
    sprintSpeedThresholdBreach: false
  }
]

const workloadMetricsData: WorkloadMetrics[] = [
  {
    playerId: "1",
    playerName: "Oneil Cruz",
    position: "SS",
    gamesPlayed: 75,
    consecutiveGames: 3,
    restDays: 2,
    cumulativeLoad: 65,
    redZoneLevel: "Safe",
    workloadRecommendation: "Current workload is sustainable",
    optimalRestTiming: "After next 2 games",
    gameLoadIndex7Day: 4,
    gameLoadIndex14Day: 8,
    highIntensityActivityIndex: 45,
    backToBackDaysPlayed: 3,
    cumulativeTravelFatigue: 25,
    gameLoadThresholdBreach: false,
    pitchCountThresholdBreach: false,
    highIntensityThresholdBreach: false,
    consecutiveGamesThresholdBreach: false,
    travelFatigueThresholdBreach: false
  },
  {
    playerId: "2",
    playerName: "Ke'Bryan Hayes",
    position: "3B",
    gamesPlayed: 78,
    consecutiveGames: 4,
    restDays: 1,
    cumulativeLoad: 82,
    redZoneLevel: "Caution",
    workloadRecommendation: "Approaching high workload - consider rest",
    optimalRestTiming: "Next available off-day",
    gameLoadIndex7Day: 6,
    gameLoadIndex14Day: 11,
    highIntensityActivityIndex: 68,
    backToBackDaysPlayed: 4,
    cumulativeTravelFatigue: 45,
    gameLoadThresholdBreach: true,
    pitchCountThresholdBreach: false,
    highIntensityThresholdBreach: false,
    consecutiveGamesThresholdBreach: false,
    travelFatigueThresholdBreach: false
  },
  {
    playerId: "4",
    playerName: "Mitch Keller",
    position: "SP",
    gamesPlayed: 18,
    consecutiveGames: 1,
    restDays: 5,
    cumulativeLoad: 45,
    redZoneLevel: "Safe",
    workloadRecommendation: "Optimal rest schedule for pitcher",
    optimalRestTiming: "Ready for next start",
    gameLoadIndex7Day: 1,
    gameLoadIndex14Day: 2,
    pitchCountAccumulation: 85,
    highIntensityActivityIndex: 25,
    backToBackDaysPlayed: 1,
    cumulativeTravelFatigue: 15,
    gameLoadThresholdBreach: false,
    pitchCountThresholdBreach: false,
    highIntensityThresholdBreach: false,
    consecutiveGamesThresholdBreach: false,
    travelFatigueThresholdBreach: false
  },
  {
    playerId: "5",
    playerName: "David Bednar",
    position: "CL",
    gamesPlayed: 42,
    consecutiveGames: 2,
    restDays: 1,
    cumulativeLoad: 95,
    redZoneLevel: "Critical",
    workloadRecommendation: "Immediate rest required - high injury risk",
    optimalRestTiming: "Minimum 3 days rest",
    gameLoadIndex7Day: 5,
    gameLoadIndex14Day: 9,
    pitchCountAccumulation: 180,
    highIntensityActivityIndex: 85,
    backToBackDaysPlayed: 2,
    cumulativeTravelFatigue: 65,
    gameLoadThresholdBreach: false,
    pitchCountThresholdBreach: true,
    highIntensityThresholdBreach: true,
    consecutiveGamesThresholdBreach: true,
    travelFatigueThresholdBreach: true
  }
]

const wellnessMetricsData: WellnessMetrics[] = [
  {
    playerId: "1",
    playerName: "Oneil Cruz",
    sleepDuration: 8.2,
    sleepQuality: 82,
    stressScore: 30,
    hydrationLevel: 85,
    nutritionScore: 88,
    mentalFatigue: 25,
    physicalFatigue: 30,
    overallWellness: 82,
    wellnessRecommendation: "Excellent wellness metrics"
  },
  {
    playerId: "2",
    playerName: "Ke'Bryan Hayes",
    sleepDuration: 6.5,
    sleepQuality: 55,
    stressScore: 65,
    hydrationLevel: 70,
    nutritionScore: 75,
    mentalFatigue: 60,
    physicalFatigue: 65,
    overallWellness: 58,
    wellnessRecommendation: "Improve sleep quality and stress management"
  },
  {
    playerId: "4",
    playerName: "Mitch Keller",
    sleepDuration: 8.8,
    sleepQuality: 88,
    stressScore: 20,
    hydrationLevel: 90,
    nutritionScore: 92,
    mentalFatigue: 15,
    physicalFatigue: 20,
    overallWellness: 88,
    wellnessRecommendation: "Optimal wellness - maintain current routine"
  },
  {
    playerId: "5",
    playerName: "David Bednar",
    sleepDuration: 5.2,
    sleepQuality: 40,
    stressScore: 80,
    hydrationLevel: 60,
    nutritionScore: 65,
    mentalFatigue: 75,
    physicalFatigue: 80,
    overallWellness: 42,
    wellnessRecommendation: "Critical wellness issues - immediate intervention needed"
  }
]

const injuryRiskMetricsData: InjuryRiskMetrics[] = [
  {
    playerId: "1",
    playerName: "Oneil Cruz",
    position: "SS",
    injuryRiskScore: 25,
    returnToPlayFatigueSlope: 0.85,
    recurringInjuryRisk: 15,
    trainingLoadVariance: 12,
    injuryRiskLevel: "Low",
    injuryRecommendation: "Low injury risk - maintain current training load",
    injuryRiskThresholdBreach: false,
    incompleteRehabFlag: false,
    recurringInjuryFlag: false,
    trainingLoadSpike: false,
    previousInjuries: ["Ankle sprain (2023)"],
    currentInjuryStatus: "Healthy",
    rehabProgress: 100
  },
  {
    playerId: "2",
    playerName: "Ke'Bryan Hayes",
    position: "3B",
    injuryRiskScore: 55,
    returnToPlayFatigueSlope: 0.45,
    recurringInjuryRisk: 35,
    trainingLoadVariance: 28,
    injuryRiskLevel: "Medium",
    injuryRecommendation: "Moderate injury risk - monitor workload closely",
    injuryRiskThresholdBreach: false,
    incompleteRehabFlag: false,
    recurringInjuryFlag: false,
    trainingLoadSpike: true,
    previousInjuries: ["Back strain (2024)"],
    currentInjuryStatus: "Healthy",
    rehabProgress: 100
  },
  {
    playerId: "4",
    playerName: "Mitch Keller",
    position: "SP",
    injuryRiskScore: 15,
    returnToPlayFatigueSlope: 0.92,
    recurringInjuryRisk: 10,
    trainingLoadVariance: 8,
    injuryRiskLevel: "Low",
    injuryRecommendation: "Very low injury risk - optimal recovery",
    injuryRiskThresholdBreach: false,
    incompleteRehabFlag: false,
    recurringInjuryFlag: false,
    trainingLoadSpike: false,
    previousInjuries: [],
    currentInjuryStatus: "Healthy",
    rehabProgress: 100
  },
  {
    playerId: "5",
    playerName: "David Bednar",
    position: "CL",
    injuryRiskScore: 85,
    returnToPlayFatigueSlope: 0.25,
    recurringInjuryRisk: 75,
    trainingLoadVariance: 45,
    injuryRiskLevel: "Critical",
    injuryRecommendation: "Critical injury risk - immediate intervention required",
    injuryRiskThresholdBreach: true,
    incompleteRehabFlag: true,
    recurringInjuryFlag: true,
    trainingLoadSpike: true,
    previousInjuries: ["Shoulder inflammation (2024)", "Elbow strain (2023)"],
    currentInjuryStatus: "At Risk",
    rehabProgress: 60
  }
]

const complianceMetricsData: ComplianceMetrics[] = [
  {
    playerId: "1",
    playerName: "Oneil Cruz",
    position: "SS",
    ilEligibilityStatus: "Eligible",
    workloadRuleViolations: 0,
    mandatoryTrainingCompletion: 100,
    decisionAuditTrail: 100,
    complianceScore: 100,
    complianceLevel: "Compliant",
    complianceRecommendation: "Full compliance - no issues",
    ilMinimumDaysRemaining: 0,
    ruleViolationDetails: [],
    trainingModulesCompleted: ["MLB Safety", "Substance Policy", "Workload Management"],
    trainingModulesRequired: ["MLB Safety", "Substance Policy", "Workload Management"],
    auditTrailCompleteness: 100,
    lastDecisionDate: "2025-06-24",
    decisionJustification: "Player cleared for full activity based on recovery metrics"
  },
  {
    playerId: "2",
    playerName: "Ke'Bryan Hayes",
    position: "3B",
    ilEligibilityStatus: "Eligible",
    workloadRuleViolations: 1,
    mandatoryTrainingCompletion: 85,
    decisionAuditTrail: 90,
    complianceScore: 85,
    complianceLevel: "Warning",
    complianceRecommendation: "Complete missing training modules",
    ilMinimumDaysRemaining: 0,
    ruleViolationDetails: ["Exceeded consecutive games limit (6/15/2025)"],
    trainingModulesCompleted: ["MLB Safety", "Substance Policy"],
    trainingModulesRequired: ["MLB Safety", "Substance Policy", "Workload Management"],
    auditTrailCompleteness: 90,
    lastDecisionDate: "2025-06-23",
    decisionJustification: "Player rested due to workload concerns"
  },
  {
    playerId: "4",
    playerName: "Mitch Keller",
    position: "SP",
    ilEligibilityStatus: "Eligible",
    workloadRuleViolations: 0,
    mandatoryTrainingCompletion: 100,
    decisionAuditTrail: 100,
    complianceScore: 100,
    complianceLevel: "Compliant",
    complianceRecommendation: "Full compliance - no issues",
    ilMinimumDaysRemaining: 0,
    ruleViolationDetails: [],
    trainingModulesCompleted: ["MLB Safety", "Substance Policy", "Workload Management", "Pitcher Protocols"],
    trainingModulesRequired: ["MLB Safety", "Substance Policy", "Workload Management", "Pitcher Protocols"],
    auditTrailCompleteness: 100,
    lastDecisionDate: "2025-06-24",
    decisionJustification: "Pitcher cleared for next start based on recovery metrics"
  },
  {
    playerId: "5",
    playerName: "David Bednar",
    position: "CL",
    ilEligibilityStatus: "Ineligible",
    workloadRuleViolations: 3,
    mandatoryTrainingCompletion: 60,
    decisionAuditTrail: 75,
    complianceScore: 65,
    complianceLevel: "Violation",
    complianceRecommendation: "Immediate compliance intervention required",
    ilMinimumDaysRemaining: 5,
    ruleViolationDetails: [
      "Used 3 consecutive days (6/20-6/22/2025)",
      "Insufficient rest between appearances (6/18/2025)",
      "Exceeded pitch count limit (6/22/2025)"
    ],
    trainingModulesCompleted: ["MLB Safety"],
    trainingModulesRequired: ["MLB Safety", "Substance Policy", "Workload Management", "Reliever Protocols"],
    auditTrailCompleteness: 75,
    lastDecisionDate: "2025-06-22",
    decisionJustification: "Player placed on IL due to workload violations and injury risk"
  }
]

// Chart data for trends
const recoveryTrendData = [
  { day: "Mon", Cruz: 75, Hayes: 60, Keller: 88, Bednar: 45 },
  { day: "Tue", Cruz: 78, Hayes: 58, Keller: 90, Bednar: 42 },
  { day: "Wed", Cruz: 82, Hayes: 52, Keller: 92, Bednar: 38 },
  { day: "Thu", Cruz: 80, Hayes: 48, Keller: 91, Bednar: 35 },
  { day: "Fri", Cruz: 78, Hayes: 45, Keller: 92, Bednar: 32 },
  { day: "Sat", Cruz: 76, Hayes: 43, Keller: 93, Bednar: 30 },
  { day: "Sun", Cruz: 78, Hayes: 45, Keller: 92, Bednar: 32 }
]

const performanceVarianceData = [
  { player: "Cruz", variance: 0.12, baseline: 0.820, current: 0.815 },
  { player: "Hayes", variance: 0.28, baseline: 0.780, current: 0.745 },
  { player: "Keller", variance: 0.08, baseline: 3.20, current: 3.15 },
  { player: "Bednar", variance: 0.45, baseline: 2.85, current: 4.85 }
]

const alertLevelColors = {
  Critical: "bg-red-100 text-red-800 border-red-200",
  Warning: "bg-orange-100 text-orange-800 border-orange-200",
  Good: "bg-green-100 text-green-800 border-green-200",
  Optimal: "bg-blue-100 text-blue-800 border-blue-200",
  Low: "bg-green-100 text-green-800 border-green-200",
  Medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  High: "bg-orange-100 text-orange-800 border-orange-200"
}

const complianceLevelColors = {
  Compliant: "bg-green-100 text-green-800 border-green-200",
  Warning: "bg-orange-100 text-orange-800 border-orange-200",
  Violation: "bg-red-100 text-red-800 border-red-200"
}

const redZoneColors = {
  Safe: "bg-green-100 text-green-800 border-green-200",
  Caution: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Danger: "bg-orange-100 text-orange-800 border-orange-200",
  Critical: "bg-red-100 text-red-800 border-red-200"
}

export default function RecoveryMonitoringPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const criticalAlerts = useMemo(() => {
    return recoveryIndexData.filter(player => 
      player.alertLevel === "Critical" || 
      performanceConsistencyData.find(p => p.playerId === player.playerId)?.alertLevel === "Critical" ||
      workloadMetricsData.find(w => w.playerId === player.playerId)?.redZoneLevel === "Critical" ||
      injuryRiskMetricsData.find(i => i.playerId === player.playerId)?.injuryRiskLevel === "Critical" ||
      complianceMetricsData.find(c => c.playerId === player.playerId)?.complianceLevel === "Violation"
    )
  }, [])

  const warningAlerts = useMemo(() => {
    return recoveryIndexData.filter(player => 
      player.alertLevel === "Warning" || 
      performanceConsistencyData.find(p => p.playerId === player.playerId)?.alertLevel === "Warning" ||
      workloadMetricsData.find(w => w.playerId === player.playerId)?.redZoneLevel === "Danger" ||
      injuryRiskMetricsData.find(i => i.playerId === player.playerId)?.injuryRiskLevel === "High" ||
      complianceMetricsData.find(c => c.playerId === player.playerId)?.complianceLevel === "Warning"
    )
  }, [])

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "Improving": return <TrendingUp className="h-4 w-4 text-green-600" />
      case "Stable": return <Activity className="h-4 w-4 text-blue-600" />
      case "Declining": return <TrendingDown className="h-4 w-4 text-red-600" />
      default: return <Activity className="h-4 w-4 text-gray-600" />
    }
  }

  const getAlertIcon = (level: string) => {
    switch (level) {
      case "Critical": return <XCircle className="h-4 w-4 text-red-600" />
      case "Warning": return <AlertTriangle className="h-4 w-4 text-orange-600" />
      case "Good": return <CheckCircle2 className="h-4 w-4 text-green-600" />
      case "Optimal": return <Shield className="h-4 w-4 text-blue-600" />
      default: return <Activity className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Recovery Index & Performance Consistency</h1>
          <p className="text-muted-foreground">
            Real-time KPI tracking with personalized thresholds and predictive alerts
          </p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-pirates-yellow hover:bg-pirates-yellow/90 text-pirates-black">
            <Brain className="mr-2 h-4 w-4" />
            AI Insights
          </Button>
        </div>
      </div>

      {(criticalAlerts.length > 0 || warningAlerts.length > 0) && (
        <div className="space-y-3">
          {criticalAlerts.length > 0 && (
            <Alert className="border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                <strong>{criticalAlerts.length} critical alerts</strong> require immediate attention. 
                Players showing critical recovery, performance, or workload issues.
              </AlertDescription>
            </Alert>
          )}
          {warningAlerts.length > 0 && (
            <Alert className="border-orange-200 bg-orange-50">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <AlertDescription className="text-orange-800">
                <strong>{warningAlerts.length} warning alerts</strong> need monitoring. 
                Players approaching critical thresholds.
              </AlertDescription>
            </Alert>
          )}
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="recovery-index">Recovery Index</TabsTrigger>
          <TabsTrigger value="performance-consistency">Performance</TabsTrigger>
          <TabsTrigger value="workload-management">Workload</TabsTrigger>
          <TabsTrigger value="injury-risk">Injury Risk</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="wellness">Wellness</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Recovery Index</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(recoveryIndexData.reduce((sum, p) => sum + p.compositeScore, 0) / recoveryIndexData.length)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Average composite score
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Performance Consistency</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(performanceConsistencyData.reduce((sum, p) => sum + p.consistencyScore, 0) / performanceConsistencyData.length)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Average consistency score
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{criticalAlerts.length}</div>
                <p className="text-xs text-muted-foreground">
                  Require immediate attention
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Optimal Recovery</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {recoveryIndexData.filter(p => p.alertLevel === "Optimal" || p.alertLevel === "Good").length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Players in optimal condition
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5" />
                  Recovery Index Trends
                </CardTitle>
                <CardDescription>
                  7-day recovery index trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsLineChart data={recoveryTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="Cruz" stroke="#3b82f6" strokeWidth={2} />
                    <Line type="monotone" dataKey="Hayes" stroke="#f59e0b" strokeWidth={2} />
                    <Line type="monotone" dataKey="Keller" stroke="#10b981" strokeWidth={2} />
                    <Line type="monotone" dataKey="Bednar" stroke="#ef4444" strokeWidth={2} />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Performance Variance
                </CardTitle>
                <CardDescription>
                  Current vs baseline performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={performanceVarianceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="player" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="variance" fill="#ef4444" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Critical Alerts Dashboard</CardTitle>
              <CardDescription>
                Players requiring immediate attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {criticalAlerts.map((player) => {
                  const performance = performanceConsistencyData.find(p => p.playerId === player.playerId)
                  const workload = workloadMetricsData.find(w => w.playerId === player.playerId)
                  const wellness = wellnessMetricsData.find(w => w.playerId === player.playerId)
                  const injuryRisk = injuryRiskMetricsData.find(i => i.playerId === player.playerId)
                  const compliance = complianceMetricsData.find(c => c.playerId === player.playerId)
                  
                  return (
                    <div key={player.playerId} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">
                            {player.playerName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{player.playerName}</p>
                          <p className="text-xs text-muted-foreground">{player.position}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex gap-2 flex-wrap justify-end">
                          <Badge className={alertLevelColors[player.alertLevel]}>
                            Recovery: {player.alertLevel}
                          </Badge>
                          {performance && (
                            <Badge className={alertLevelColors[performance.alertLevel]}>
                              Performance: {performance.alertLevel}
                            </Badge>
                          )}
                          {workload && (
                            <Badge className={redZoneColors[workload.redZoneLevel]}>
                              Workload: {workload.redZoneLevel}
                            </Badge>
                          )}
                          {injuryRisk && (
                            <Badge className={alertLevelColors[injuryRisk.injuryRiskLevel]}>
                              Injury Risk: {injuryRisk.injuryRiskLevel}
                            </Badge>
                          )}
                          {compliance && (
                            <Badge className={complianceLevelColors[compliance.complianceLevel]}>
                              Compliance: {compliance.complianceLevel}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {player.recoveryRecommendation}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recovery-index" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recovery Index Monitoring</CardTitle>
              <CardDescription>
                Real-time recovery tracking with composite scoring
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Player</TableHead>
                    <TableHead>Composite Score</TableHead>
                    <TableHead>HRV</TableHead>
                    <TableHead>Sleep Quality</TableHead>
                    <TableHead>Stress Level</TableHead>
                    <TableHead>Trend</TableHead>
                    <TableHead>Alert Level</TableHead>
                    <TableHead>Recommendation</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recoveryIndexData.map((player) => (
                    <TableRow key={player.playerId}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs">
                              {player.playerName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{player.playerName}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={player.compositeScore} className="w-16 h-2" />
                          <span className="text-sm font-medium">{player.compositeScore}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Heart className="h-3 w-3 text-red-500" />
                          <span className="text-sm">{player.hrvScore}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Moon className="h-3 w-3 text-blue-500" />
                          <span className="text-sm">{player.sleepQuality}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Thermometer className="h-3 w-3 text-orange-500" />
                          <span className="text-sm">{player.stressLevel}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {getTrendIcon(player.trend)}
                          <span className="text-sm">{player.trend}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={alertLevelColors[player.alertLevel]}>
                          {getAlertIcon(player.alertLevel)}
                          {player.alertLevel}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">
                          {player.recoveryRecommendation}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance-consistency" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Consistency Analysis</CardTitle>
              <CardDescription>
                Rolling performance metrics with variance detection
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Player</TableHead>
                    <TableHead>Consistency Score</TableHead>
                    <TableHead>Performance Metric</TableHead>
                    <TableHead>Baseline</TableHead>
                    <TableHead>Current</TableHead>
                    <TableHead>Variance</TableHead>
                    <TableHead>Trend</TableHead>
                    <TableHead>Alert Level</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {performanceConsistencyData.map((player) => (
                    <TableRow key={player.playerId}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs">
                              {player.playerName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{player.playerName}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={player.consistencyScore} className="w-16 h-2" />
                          <span className="text-sm font-medium">{player.consistencyScore}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">
                          {player.rollingOPS ? `OPS: ${player.rollingOPS}` : 
                           player.rollingERA ? `ERA: ${player.rollingERA}` : 'N/A'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">
                          {player.velocityBaseline ? `${player.velocityBaseline} mph` :
                           player.exitVelocityBaseline ? `${player.exitVelocityBaseline} mph` :
                           player.sprintSpeedBaseline ? `${player.sprintSpeedBaseline} ft/s` : 'N/A'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">
                          {player.currentVelocity ? `${player.currentVelocity} mph` :
                           player.currentExitVelocity ? `${player.currentExitVelocity} mph` :
                           player.currentSprintSpeed ? `${player.currentSprintSpeed} ft/s` : 'N/A'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={
                          player.performanceVariance > 0.3 ? "border-red-200 text-red-700" :
                          player.performanceVariance > 0.15 ? "border-orange-200 text-orange-700" :
                          "border-green-200 text-green-700"
                        }>
                          {player.performanceVariance.toFixed(2)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {getTrendIcon(player.trend)}
                          <span className="text-sm">{player.trend}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={alertLevelColors[player.alertLevel]}>
                          {getAlertIcon(player.alertLevel)}
                          {player.alertLevel}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workload-management" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Workload Management & Red Zone Detection</CardTitle>
              <CardDescription>
                Cumulative load tracking with injury risk assessment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Player</TableHead>
                    <TableHead>Games Played</TableHead>
                    <TableHead>Consecutive</TableHead>
                    <TableHead>Rest Days</TableHead>
                    <TableHead>Cumulative Load</TableHead>
                    <TableHead>Red Zone Level</TableHead>
                    <TableHead>Optimal Rest Timing</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {workloadMetricsData.map((player) => (
                    <TableRow key={player.playerId}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs">
                              {player.playerName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{player.playerName}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-medium">{player.gamesPlayed}</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={
                          player.consecutiveGames >= 4 ? "border-red-200 text-red-700" :
                          player.consecutiveGames >= 3 ? "border-orange-200 text-orange-700" :
                          "border-green-200 text-green-700"
                        }>
                          {player.consecutiveGames}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{player.restDays} days</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={player.cumulativeLoad} className="w-16 h-2" />
                          <span className="text-sm font-medium">{player.cumulativeLoad}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={redZoneColors[player.redZoneLevel]}>
                          {player.redZoneLevel}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">
                          {player.optimalRestTiming}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="injury-risk" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Injury Risk Analysis</CardTitle>
              <CardDescription>
                Risk assessment based on injury history and workload
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Player</TableHead>
                    <TableHead>Injury Risk Score</TableHead>
                    <TableHead>Return to Play Fatigue Slope</TableHead>
                    <TableHead>Recurring Injury Risk</TableHead>
                    <TableHead>Training Load Variance</TableHead>
                    <TableHead>Injury Risk Level</TableHead>
                    <TableHead>Recommendation</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {injuryRiskMetricsData.map((player) => (
                    <TableRow key={player.playerId}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs">
                              {player.playerName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{player.playerName}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={player.injuryRiskScore} className="w-16 h-2" />
                          <span className="text-sm font-medium">{player.injuryRiskScore}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{player.returnToPlayFatigueSlope.toFixed(2)}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{player.recurringInjuryRisk.toFixed(2)}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{player.trainingLoadVariance.toFixed(2)}</span>
                      </TableCell>
                      <TableCell>
                        <Badge className={alertLevelColors[player.injuryRiskLevel]}>
                          {player.injuryRiskLevel}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">
                          {player.injuryRecommendation}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Analysis</CardTitle>
              <CardDescription>
                Training completion and decision audit trail
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Player</TableHead>
                    <TableHead>Eligibility Status</TableHead>
                    <TableHead>Workload Rule Violations</TableHead>
                    <TableHead>Mandatory Training Completion</TableHead>
                    <TableHead>Decision Audit Trail</TableHead>
                    <TableHead>Compliance Score</TableHead>
                    <TableHead>Compliance Level</TableHead>
                    <TableHead>Recommendation</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {complianceMetricsData.map((player) => (
                    <TableRow key={player.playerId}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs">
                              {player.playerName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{player.playerName}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-medium">{player.ilEligibilityStatus}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{player.workloadRuleViolations}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{player.mandatoryTrainingCompletion}%</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{player.decisionAuditTrail}%</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={player.complianceScore} className="w-16 h-2" />
                          <span className="text-sm font-medium">{player.complianceScore}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={complianceLevelColors[player.complianceLevel]}>
                          {player.complianceLevel}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">
                          {player.complianceRecommendation}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wellness" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Wellness Integration & Monitoring</CardTitle>
              <CardDescription>
                Sleep quality, stress levels, and fatigue assessment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  {wellnessMetricsData.map((player) => (
                    <div key={player.playerId} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold">{player.playerName}</h3>
                        <Badge className={
                          player.overallWellness >= 80 ? "bg-green-100 text-green-800 border-green-200" :
                          player.overallWellness >= 60 ? "bg-yellow-100 text-yellow-800 border-yellow-200" :
                          "bg-red-100 text-red-800 border-red-200"
                        }>
                          {player.overallWellness}% Wellness
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Sleep Quality</span>
                          <span>{player.sleepQuality}%</span>
                        </div>
                        <Progress value={player.sleepQuality} className="h-2" />
                        
                        <div className="flex justify-between text-sm">
                          <span>Stress Level</span>
                          <span>{player.stressScore}%</span>
                        </div>
                        <Progress value={player.stressScore} className="h-2" />
                        
                        <div className="flex justify-between text-sm">
                          <span>Mental Fatigue</span>
                          <span>{player.mentalFatigue}%</span>
                        </div>
                        <Progress value={player.mentalFatigue} className="h-2" />
                        
                        <div className="flex justify-between text-sm">
                          <span>Physical Fatigue</span>
                          <span>{player.physicalFatigue}%</span>
                        </div>
                        <Progress value={player.physicalFatigue} className="h-2" />
                      </div>
                      
                      <p className="text-xs text-muted-foreground mt-3">
                        {player.wellnessRecommendation}
                      </p>
                    </div>
                  ))}
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Wellness Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={[
                            { name: "Optimal", value: wellnessMetricsData.filter(w => w.overallWellness >= 80).length, color: "#10b981" },
                            { name: "Good", value: wellnessMetricsData.filter(w => w.overallWellness >= 60 && w.overallWellness < 80).length, color: "#f59e0b" },
                            { name: "Poor", value: wellnessMetricsData.filter(w => w.overallWellness < 60).length, color: "#ef4444" }
                          ]}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                        >
                          {[
                            { name: "Optimal", value: wellnessMetricsData.filter(w => w.overallWellness >= 80).length, color: "#10b981" },
                            { name: "Good", value: wellnessMetricsData.filter(w => w.overallWellness >= 60 && w.overallWellness < 80).length, color: "#f59e0b" },
                            { name: "Poor", value: wellnessMetricsData.filter(w => w.overallWellness < 60).length, color: "#ef4444" }
                          ].map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}