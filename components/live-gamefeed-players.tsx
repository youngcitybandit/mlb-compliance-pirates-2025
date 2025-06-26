"use client"

import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react" // Import useEffect
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { TrendingUp, TrendingDown } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input" // Import Input
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

interface LiveGameTrigger {
  type: string
  description: string
  change?: string // For underperformance
  severity?: "Severe" | "Moderate" | "Mild" // For underperformance
  significant?: boolean // For anomaly
  substanceCorrelation?: string[] // For anomaly
  potentialCauses?: string[] // For underperformance
  threshold?: string // For anomaly (descriptive)
  current?: string // For anomaly
  previous?: string // For anomaly
  editableThresholdValue?: string // New property for user-settable threshold
  unit?: string // e.g., "mph", "rpm", "inches"
}

interface LiveGamePlayer {
  id: string
  name: string
  number: string
  position: string
  imageUrl: string
  type: "underperforming" | "anomaly" | "Today's SP" | "Active P" | "Game Injury" | "Other"
  triggers: LiveGameTrigger[]
}

const liveGamePlayers: LiveGamePlayer[] = [
  {
    id: "104",
    name: "Daniel Green",
    number: "47",
    position: "1B",
    imageUrl: "/baseball-player-first-base.png",
    type: "underperforming",
    triggers: [
      {
        type: "SLG Drop",
        description: "Slugging percentage significantly lower",
        change: "-.090",
        severity: "Severe",
        potentialCauses: ["Age-related Decline", "Injury", "Loss of Bat Speed"],
      },
      {
        type: "Exit Velocity Drop",
        description: "Average exit velocity decrease",
        change: "-2.5 mph",
        severity: "Severe",
        potentialCauses: ["Injury", "Fatigue", "Age"],
      },
    ],
  },
  {
    id: "107",
    name: "Spencer Strider",
    number: "99",
    position: "SP",
    imageUrl: "/spencer-strider.png",
    type: "underperforming",
    triggers: [
      {
        type: "ERA Increase",
        description: "Earned run average significantly higher than prior year",
        change: "+5.40",
        severity: "Severe",
        potentialCauses: ["Injury", "Fatigue", "Loss of Stuff"],
      },
      {
        type: "Velocity Drop",
        description: "Fastball velocity decrease",
        change: "-3.0 mph",
        severity: "Severe",
        potentialCauses: ["Injury", "Fatigue"],
      },
      {
        type: "K% Drop",
        description: "Strikeout rate decrease",
        change: "-15.0%",
        severity: "Severe",
        potentialCauses: ["Velocity Drop", "Pitch Mix Changes", "Injury"],
      },
      {
        type: "Spin Rate Decline",
        description: "Spin rate decrease on breaking ball",
        change: "-300 rpm",
        severity: "Severe",
        potentialCauses: ["Injury", "Weakened Rotator Cuff"],
      },
    ],
  },
  {
    id: "3",
    name: "Jason Thompson",
    number: "41",
    position: "OF",
    imageUrl: "/baseball-outfielder.png",
    type: "anomaly",
    triggers: [
      {
        type: "ISO Increase",
        description: "Isolated power spike",
        threshold: "+.050 or more",
        current: ".242",
        previous: ".168",
        change: "+.074",
        significant: true,
        substanceCorrelation: ["Dehydrochlormethyltestosterone", "Stanozolol"],
      },
      {
        type: "SLG Increase",
        description: "Slugging percentage spike",
        threshold: "+.100 or more",
        current: ".512",
        previous: ".398",
        change: "+.114",
        significant: true,
        substanceCorrelation: ["Testosterone", "Nandrolone"],
      },
      {
        type: "K% Drop",
        description: "Strikeout rate decrease with power increase",
        threshold: "-5% or more",
        current: "16.2%",
        previous: "22.5%",
        change: "-6.3%",
        significant: true,
        substanceCorrelation: ["Selective Androgen Receptor Modulator S-23", "Ostarine"],
      },
      {
        type: "Exit Velocity",
        description: "Average exit velocity increase",
        threshold: "+2.1+ mph avg gain",
        current: "95.1 mph",
        previous: "92.5 mph",
        change: "+2.6 mph",
        significant: true,
        substanceCorrelation: ["Stanozolol", "Testosterone", "Selective Androgen Receptor Modulators"],
      },
    ],
  },
  {
    id: "6",
    name: "Tyler Wilson",
    number: "56",
    position: "CL",
    imageUrl: "/baseball-closer.png",
    type: "anomaly",
    triggers: [
      {
        type: "Fastball Velocity",
        description: "Fastball velocity increase at age 31",
        threshold: "+2 mph or more",
        current: "101.2 mph",
        previous: "98.8 mph",
        change: "+2.4 mph",
        significant: true,
        substanceCorrelation: ["Boldenone", "Ibutamoren (MK-677)"],
      },
      {
        type: "K% Increase",
        description: "Strikeout percentage spike",
        threshold: "+5% or more",
        current: "42.5%",
        previous: "34.8%",
        change: "+7.7%",
        significant: true,
        substanceCorrelation: ["Selective Androgen Receptor Modulator S-23", "Ostarine"],
      },
      {
        type: "Recovery",
        description: "Unusual recovery pattern between appearances",
        threshold: "N/A",
        current: "3 back-to-back-to-back games",
        previous: "Max 2 consecutive games",
        change: "+1 consecutive game",
        significant: true,
        substanceCorrelation: ["Cardarine (GW501516)", "Ibutamoren (MK-677)"],
      },
      {
        type: "Spin Rate Increase",
        description: "Spin rate increase on breaking ball",
        threshold: "+150 rpm or more",
        current: "2500 rpm",
        previous: "2300 rpm",
        change: "+200 rpm",
        significant: true,
        substanceCorrelation: ["Growth Hormone", "Insulin-like Growth Factor 1"],
      },
    ],
  },
  {
    id: "108",
    name: "Paul Skenes",
    number: "30",
    position: "SP",
    imageUrl: "/paul-skenes.png",
    type: "Today's SP",
    triggers: [
      {
        type: "Fastball Velocity",
        description: "Fastball velocity monitoring - elite level maintenance",
        threshold: "↓ ≥1.5–2.0 mph from 99.2 avg",
        editableThresholdValue: "1.5",
        unit: "mph",
        change: "N/A",
        severity: "Severe",
        significant: true,
        potentialCauses: ["Fatigue", "Injury", "Mechanical Issue"],
        substanceCorrelation: [],
      },
      {
        type: "Spin Rate",
        description: "Spin rate consistency monitoring",
        threshold: "↓ ≥150–200 rpm from 2450 avg",
        editableThresholdValue: "150",
        unit: "rpm",
        change: "N/A",
        severity: "Severe",
        significant: true,
        potentialCauses: ["Fatigue", "Injury (e.g., forearm, elbow)", "Grip Issues"],
        substanceCorrelation: [],
      },
      {
        type: "Extension",
        description: "Release extension monitoring",
        threshold: "↓ ≥5 inches from 7.2 ft avg",
        editableThresholdValue: "5",
        unit: "inches",
        change: "N/A",
        severity: "Severe",
        significant: true,
        potentialCauses: ["Mechanical Issue", "Fatigue", "Injury"],
        substanceCorrelation: [],
      },
      {
        type: "Release Point",
        description: "Release point consistency",
        threshold: "Drift ≥2 inches",
        editableThresholdValue: "2",
        unit: "inches",
        change: "N/A",
        severity: "Severe",
        significant: true,
        potentialCauses: ["Mechanical Issue", "Injury", "Loss of Feel"],
        substanceCorrelation: [],
      },
      {
        type: "Movement",
        description: "Pitch movement consistency",
        threshold: "↓ ≥3 inches on breaking balls",
        editableThresholdValue: "3",
        unit: "inches",
        change: "N/A",
        severity: "Severe",
        significant: true,
        potentialCauses: ["Fatigue", "Injury", "Mechanical Issue"],
        substanceCorrelation: [],
      },
      {
        type: "Zone % / BB%",
        description: "Command and control monitoring",
        threshold: "10%+ drop in zone% / 5%+ rise in BB%",
        editableThresholdValue: "10% drop / 5% rise",
        unit: "",
        change: "N/A",
        severity: "Severe",
        significant: true,
        potentialCauses: ["Command Issues", "Fatigue", "Injury"],
        substanceCorrelation: [],
      },
      {
        type: "Pitch Mix",
        description: "Pitch arsenal usage monitoring",
        threshold: "Sudden change in pitch mix",
        editableThresholdValue: "N/A",
        unit: "",
        change: "N/A",
        severity: "Severe",
        significant: true,
        potentialCauses: ["Injury (e.g., specific pitch causes pain)", "Strategic Change", "Loss of Confidence"],
        substanceCorrelation: [],
      },
      {
        type: "Active Spin",
        description: "Active spin rate monitoring",
        threshold: "↓ ≥5% from 95.2% avg",
        editableThresholdValue: "5",
        unit: "%",
        change: "N/A",
        severity: "Moderate",
        significant: true,
        potentialCauses: ["Fatigue", "Mechanical Issue", "Grip Changes"],
        substanceCorrelation: [],
      },
      {
        type: "Strikeout Rate",
        description: "Strikeout rate consistency",
        threshold: "↓ ≥10% from 32.1% avg",
        editableThresholdValue: "10",
        unit: "%",
        change: "N/A",
        severity: "Moderate",
        significant: true,
        potentialCauses: ["Velocity Drop", "Command Issues", "Fatigue"],
        substanceCorrelation: [],
      },
      {
        type: "WHIP",
        description: "Walks and hits per inning monitoring",
        threshold: "↑ ≥0.20 from 0.91 avg",
        editableThresholdValue: "0.20",
        unit: "",
        change: "N/A",
        severity: "Moderate",
        significant: true,
        potentialCauses: ["Command Issues", "Fatigue", "Injury"],
        substanceCorrelation: [],
      },
    ],
  },
  {
    id: "45",
    name: "Andrew Heaney",
    number: "45",
    position: "SP",
    imageUrl: "/andrew-heaney-pitcher.png",
    type: "Today's SP",
    triggers: [
      {
        type: "Fastball Velocity",
        description: "Fastball velocity decrease",
        threshold: "↓ ≥1.5–2.0 mph",
        editableThresholdValue: "1.5",
        unit: "mph",
        change: "N/A",
        severity: "Severe",
        significant: true,
        potentialCauses: ["Fatigue", "Injury", "Mechanical Issue"],
        substanceCorrelation: [],
      },
      {
        type: "Spin Rate",
        description: "Spin rate decrease",
        threshold: "↓ ≥150–200 rpm",
        editableThresholdValue: "150",
        unit: "rpm",
        change: "N/A",
        severity: "Severe",
        significant: true,
        potentialCauses: ["Fatigue", "Injury (e.g., forearm, elbow)", "Grip Issues"],
        substanceCorrelation: [],
      },
      {
        type: "Extension",
        description: "Release extension decrease",
        threshold: "↓ ≥5 inches",
        editableThresholdValue: "5",
        unit: "inches",
        change: "N/A",
        severity: "Severe",
        significant: true,
        potentialCauses: ["Mechanical Issue", "Fatigue", "Injury"],
        substanceCorrelation: [],
      },
      {
        type: "Release Point",
        description: "Release point drift",
        threshold: "Drift ≥2 inches",
        editableThresholdValue: "2",
        unit: "inches",
        change: "N/A",
        severity: "Severe",
        significant: true,
        potentialCauses: ["Mechanical Issue", "Injury", "Loss of Feel"],
        substanceCorrelation: [],
      },
      {
        type: "Movement",
        description: "Pitch movement decrease",
        threshold: "↓ ≥3 inches",
        editableThresholdValue: "3",
        unit: "inches",
        change: "N/A",
        severity: "Severe",
        significant: true,
        potentialCauses: ["Fatigue", "Injury", "Mechanical Issue"],
        substanceCorrelation: [],
      },
      {
        type: "Zone % / BB%",
        description: "Zone percentage drop or walk rate rise",
        threshold: "10%+ drop / 5%+ rise",
        editableThresholdValue: "10% drop / 5% rise",
        unit: "",
        change: "N/A",
        severity: "Severe",
        significant: true,
        potentialCauses: ["Command Issues", "Fatigue", "Injury"],
        substanceCorrelation: [],
      },
      {
        type: "Pitch Mix",
        description: "Sudden disappearance of a pitch type",
        threshold: "Sudden disappearance",
        editableThresholdValue: "N/A",
        unit: "",
        change: "N/A",
        severity: "Severe",
        significant: true,
        potentialCauses: ["Injury (e.g., specific pitch causes pain)", "Strategic Change", "Loss of Confidence"],
        substanceCorrelation: [],
      },
    ],
  },
  {
    id: "tbd-rp",
    name: "TBD",
    number: "—",
    position: "RP",
    imageUrl: "/andrew-heaney-pitcher.png",
    type: "Active P",
    triggers: [
      {
        type: "Fastball Velocity",
        description: "Fastball velocity decrease",
        threshold: "↓ ≥1.5–2.0 mph",
        editableThresholdValue: "1.5",
        unit: "mph",
        change: "N/A",
        severity: "Severe",
        significant: true,
        potentialCauses: ["Fatigue", "Injury", "Mechanical Issue"],
        substanceCorrelation: [],
      },
      {
        type: "Spin Rate",
        description: "Spin rate decrease",
        threshold: "↓ ≥150–200 rpm",
        editableThresholdValue: "150",
        unit: "rpm",
        change: "N/A",
        severity: "Severe",
        significant: true,
        potentialCauses: ["Fatigue", "Injury (e.g., forearm, elbow)", "Grip Issues"],
        substanceCorrelation: [],
      },
      {
        type: "Extension",
        description: "Release extension decrease",
        threshold: "↓ ≥5 inches",
        editableThresholdValue: "5",
        unit: "inches",
        change: "N/A",
        severity: "Severe",
        significant: true,
        potentialCauses: ["Mechanical Issue", "Fatigue", "Injury"],
        substanceCorrelation: [],
      },
      {
        type: "Release Point",
        description: "Release point drift",
        threshold: "Drift ≥2 inches",
        editableThresholdValue: "2",
        unit: "inches",
        change: "N/A",
        severity: "Severe",
        significant: true,
        potentialCauses: ["Mechanical Issue", "Injury", "Loss of Feel"],
        substanceCorrelation: [],
      },
      {
        type: "Movement",
        description: "Pitch movement decrease",
        threshold: "↓ ≥3 inches",
        editableThresholdValue: "3",
        unit: "inches",
        change: "N/A",
        severity: "Severe",
        significant: true,
        potentialCauses: ["Fatigue", "Injury", "Mechanical Issue"],
        substanceCorrelation: [],
      },
      {
        type: "Zone % / BB%",
        description: "Zone percentage drop or walk rate rise",
        threshold: "10%+ drop / 5%+ rise",
        editableThresholdValue: "10% drop / 5% rise",
        unit: "",
        change: "N/A",
        severity: "Severe",
        significant: true,
        potentialCauses: ["Command Issues", "Fatigue", "Injury"],
        substanceCorrelation: [],
      },
      {
        type: "Pitch Mix",
        description: "Sudden disappearance of a pitch type",
        threshold: "Sudden disappearance",
        editableThresholdValue: "N/A",
        unit: "",
        change: "N/A",
        severity: "Severe",
        significant: true,
        potentialCauses: ["Injury (e.g., specific pitch causes pain)", "Strategic Change", "Loss of Confidence"],
        substanceCorrelation: [],
      },
    ],
  },
]

// Exclude all pitchers (SP, RP, CP) from the 'Players to Track' list
const filteredLiveGamePlayers = liveGamePlayers.filter(
  (player) => {
    // Keep underperforming pitchers
    if (["SP", "RP", "CP"].includes(player.position) && player.type === "underperforming") {
      return true;
    }
    // Exclude all other pitchers
    if (["SP", "RP", "CP"].includes(player.position)) {
      return false;
    }
    // Keep all non-pitchers
    return true;
  }
);

export function LiveGamefeedPlayers() {
  const [trackedPlayerIds, setTrackedPlayerIds] = useState<string[]>([])
  const [showTrackedOnly, setShowTrackedOnly] = useState(false)
  const [editableThresholds, setEditableThresholds] = useState<Map<string, Map<string, string>>>(new Map())
  const [editingTrigger, setEditingTrigger] = useState<{
    playerId: string
    triggerType: string
    currentValue: string
    unit?: string
  } | null>(null)
  const [newThresholdValue, setNewThresholdValue] = useState("")
  const [addPlayerOpen, setAddPlayerOpen] = useState(false)
  const [newPlayer, setNewPlayer] = useState({
    name: '',
    number: '',
    position: '',
    type: 'underperforming',
    triggers: [''],
    imageUrl: '',
  })
  const [players, setPlayers] = useState(filteredLiveGamePlayers)

  // Initialize editableThresholds from liveGamePlayers data on mount
  useEffect(() => {
    const initialThresholds = new Map<string, Map<string, string>>()
    liveGamePlayers.forEach((player) => {
      const playerMap = new Map<string, string>()
      player.triggers.forEach((trigger) => {
        playerMap.set(trigger.type, trigger.editableThresholdValue || "")
      })
      initialThresholds.set(player.id, playerMap)
    })
    setEditableThresholds(initialThresholds)
  }, [])

  const handleTrackPlayer = (playerId: string, isChecked: boolean) => {
    setTrackedPlayerIds((prev) => (isChecked ? [...prev, playerId] : prev.filter((id) => id !== playerId)))
  }

  const handleThresholdInputChange = (playerId: string, triggerType: string, value: string) => {
    setEditableThresholds((prev) => {
      const newMap = new Map(prev)
      const playerMap = new Map(newMap.get(playerId) || [])
      playerMap.set(triggerType, value)
      newMap.set(playerId, playerMap)
      return newMap
    })
  }

  const handleSaveThresholds = (playerId: string) => {
    const playerThresholds = editableThresholds.get(playerId)
    if (playerThresholds) {
      console.log(`Saving thresholds for ${playerId}:`, Object.fromEntries(playerThresholds))
      // In a real application, you would send this data to a backend API
      // e.g., await fetch('/api/save-thresholds', { method: 'POST', body: JSON.stringify({ playerId, thresholds: Object.fromEntries(playerThresholds) }) });
      alert(`Thresholds for ${liveGamePlayers.find((p) => p.id === playerId)?.name} saved! (Conceptual)`)
    }
  }

  const filteredPlayers = showTrackedOnly
    ? players.filter((player) => trackedPlayerIds.includes(player.id))
    : players

  const getTriggerBadge = (trigger: LiveGameTrigger, playerType: LiveGamePlayer["type"], playerId?: string) => {
    // Remove the icon and clean the trigger type
    const cleanType = trigger.type.replace(/decline|drop|increase/gi, '').replace(/\s+/g, ' ').trim()
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={() => {
                if (playerId) {
                  setEditingTrigger({
                    playerId,
                    triggerType: trigger.type,
                    currentValue: editableThresholds.get(playerId)?.get(trigger.type) || "",
                    unit: trigger.unit,
                  })
                  setNewThresholdValue(editableThresholds.get(playerId)?.get(trigger.type) || "")
                }
              }}
              className={`focus:outline-none`}
            >
              <Badge
                variant="outline"
                className={`${playerType === "anomaly" ? "bg-red-50 text-red-700 border-red-200" : "bg-amber-50 text-amber-700 border-amber-200"} cursor-pointer`}
              >
                {cleanType}
              </Badge>
            </button>
          </TooltipTrigger>
          <TooltipContent className="w-80">
            <div className="space-y-2">
              <p className="font-medium">{trigger.description}</p>
              {trigger.change && (
                <div className="font-medium text-sm">
                  Change: <span className="text-red-600">{trigger.change}</span>
                </div>
              )}
              {trigger.substanceCorrelation && (
                <div className="mt-2 pt-2 border-t border-gray-200">
                  <p className="text-xs font-medium text-muted-foreground mb-1">Potential Substance Correlation:</p>
                  <div className="flex flex-wrap gap-1">
                    {trigger.substanceCorrelation.map((substance, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {substance}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {trigger.potentialCauses && (
                <div className="mt-2 pt-2 border-t border-gray-200">
                  <p className="text-xs font-medium text-muted-foreground mb-1">Potential Causes:</p>
                  <div className="flex flex-wrap gap-1">
                    {trigger.potentialCauses.map((cause, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {cause}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  const handleModalSave = () => {
    if (editingTrigger) {
      handleThresholdInputChange(editingTrigger.playerId, editingTrigger.triggerType, newThresholdValue)
      setEditingTrigger(null)
    }
  }

  const handleAddPlayer = () => {
    if (!newPlayer.name || !newPlayer.number || !newPlayer.position || !newPlayer.triggers[0]) return
    setPlayers((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).slice(2),
        name: newPlayer.name,
        number: newPlayer.number,
        position: newPlayer.position,
        imageUrl: newPlayer.imageUrl || '/placeholder.svg',
        type: newPlayer.type as any,
        triggers: newPlayer.triggers.filter(Boolean).map((t) => ({ type: t, description: '', potentialCauses: [] })),
      },
    ])
    setAddPlayerOpen(false)
    setNewPlayer({ name: '', number: '', position: '', type: 'underperforming', triggers: [''], imageUrl: '' })
  }

  return (
    <div>
      <div className="flex justify-end mb-4 gap-2">
        <Button variant="outline" onClick={() => setAddPlayerOpen(true)}>
          Add Player
        </Button>
        <Button variant="outline" onClick={() => setShowTrackedOnly(!showTrackedOnly)}>
          {showTrackedOnly ? "Show All Players" : "Show Tracked Players"}
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {[
                <TableHead key="player" className="w-[200px]">
                  Player
                </TableHead>,
                <TableHead key="pos">Position</TableHead>,
                <TableHead key="type">Type</TableHead>,
                <TableHead key="trig">Triggers</TableHead>,
                <TableHead key="track" className="text-center">
                  Track
                </TableHead>,
              ]}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPlayers.map((player) => (
              <TableRow key={player.id}>
                {[
                  /* Player avatar / name */
                  <TableCell key="player">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 rounded-md">
                        <AvatarImage src={player.imageUrl || "/placeholder.svg"} alt={player.name} />
                        <AvatarFallback className="rounded-md bg-pirates-yellow text-pirates-black">
                          {player.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{player.name}</span>
                          <span className="text-xs text-muted-foreground">#{player.number}</span>
                        </div>
                      </div>
                    </div>
                  </TableCell>,

                  <TableCell key="pos">{player.position}</TableCell>,

                  <TableCell key="type">
                    <Badge variant="outline" className="capitalize">
                      {player.type === "anomaly"
                        ? "Statistical Anomaly"
                        : player.type === "underperforming"
                          ? "Underperforming"
                          : player.type === "Active P"
                            ? "Active P"
                            : player.type === "Today's SP"
                              ? "Today's SP"
                              : player.type === "Game Injury"
                                ? "Game Injury"
                                : "Other"}
                    </Badge>
                  </TableCell>,

                  <TableCell key="triggers">
                    <div className="flex flex-wrap gap-1">
                      {player.triggers.map((trigger, idx) => (
                        <div key={idx}>{getTriggerBadge(trigger, player.type, player.id)}</div>
                      ))}
                    </div>
                  </TableCell>,

                  <TableCell key="track" className="text-center">
                    <Checkbox
                      checked={trackedPlayerIds.includes(player.id)}
                      onCheckedChange={(checked) => handleTrackPlayer(player.id, checked as boolean)}
                      aria-label={`Track ${player.name}`}
                    />
                  </TableCell>,
                ]}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Dialog open={!!editingTrigger} onOpenChange={(open) => !open && setEditingTrigger(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Custom Datapoint</DialogTitle>
          </DialogHeader>
          {editingTrigger && (
            <div className="space-y-4">
              <div>
                <span className="font-medium">Trigger:</span> {editingTrigger.triggerType}
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Custom Datapoint:</span>
                <Input
                  type="text"
                  value={newThresholdValue}
                  onChange={(e) => setNewThresholdValue(e.target.value)}
                  className="w-48 h-8 text-xs"
                  placeholder="e.g. ISO > .200, Velocity < 95 mph"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={handleModalSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={addPlayerOpen} onOpenChange={setAddPlayerOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Player</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="flex gap-2">
              <Input
                placeholder="Name"
                value={newPlayer.name}
                onChange={e => setNewPlayer(p => ({ ...p, name: e.target.value }))}
              />
              <Input
                placeholder="Number"
                value={newPlayer.number}
                onChange={e => setNewPlayer(p => ({ ...p, number: e.target.value }))}
              />
              <Input
                placeholder="Position"
                value={newPlayer.position}
                onChange={e => setNewPlayer(p => ({ ...p, position: e.target.value }))}
              />
            </div>
            <div className="flex gap-2">
              <select
                className="border rounded px-2 py-1 text-sm"
                value={newPlayer.type}
                onChange={e => setNewPlayer(p => ({ ...p, type: e.target.value }))}
              >
                <option value="underperforming">Underperforming</option>
                <option value="anomaly">Statistical Anomaly</option>
                <option value="Today's SP">Today's SP</option>
                <option value="Active P">Active P</option>
                <option value="Game Injury">Game Injury</option>
                <option value="Other">Other</option>
              </select>
              <Input
                placeholder="Image URL (optional)"
                value={newPlayer.imageUrl}
                onChange={e => setNewPlayer(p => ({ ...p, imageUrl: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Triggers</label>
              {newPlayer.triggers.map((t, i) => (
                <div key={i} className="flex gap-2 mb-1">
                  <Input
                    placeholder="Trigger name"
                    value={t}
                    onChange={e => setNewPlayer(p => {
                      const triggers = [...p.triggers]
                      triggers[i] = e.target.value
                      return { ...p, triggers }
                    })}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setNewPlayer(p => ({ ...p, triggers: p.triggers.filter((_, idx) => idx !== i) }))}
                    disabled={newPlayer.triggers.length === 1}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setNewPlayer(p => ({ ...p, triggers: [...p.triggers, ''] }))}
              >
                Add Trigger
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAddPlayer}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
