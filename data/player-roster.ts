// Shared player roster data for both client and server components
export type Position = "C" | "1B" | "2B" | "3B" | "SS" | "OF" | "SP" | "RP" | "CL"
export type PlayerType = "hitter" | "pitcher"

export interface Trigger {
  type: string
  description: string
  threshold: string
  current: string
  previous: string
  change: string
  significant?: boolean
  substanceCorrelation?: string[]
}

export interface Player {
  id: string
  name: string
  number: string
  position: Position
  positionCategory: string
  batsThrows: string
  height: string
  weight: string
  complianceStatus: string
  lastTested: string
  nextTest: string
  contractExpiration: string
  contractValue: string
  stats: any
  imageUrl: string
  riskLevel: string
  injuryStatus?: string
  injuryType?: string
  expectedReturn?: string
  injuryStartDate?: string
  triggers?: Trigger[]
  playerType: PlayerType
  avgRecoveryDays?: number
  progress?: number
  daysOnIL?: number
  daysRemaining?: number
  age?: number
}

export const players: Player[] = [
  // ACTIVE PLAYERS
  {
    id: "1",
    name: "Oneil Cruz",
    number: "15",
    position: "SS",
    positionCategory: "hitter",
    batsThrows: "L/R",
    height: "6'7\"",
    weight: "220",
    complianceStatus: "Clear",
    lastTested: "May 15, 2025",
    nextTest: "Aug 15, 2025",
    contractExpiration: "2029",
    contractValue: "$8M",
    stats: { avg: ".285", hr: 12, rbi: 45, obp: ".345", slg: ".520" },
    imageUrl: "/baseball-infielder.png",
    riskLevel: "Low",
    playerType: "hitter"
  },
  {
    id: "2",
    name: "Ke'Bryan Hayes",
    number: "13",
    position: "3B",
    positionCategory: "hitter",
    batsThrows: "R/R",
    height: "6'1\"",
    weight: "210",
    complianceStatus: "Clear",
    lastTested: "May 10, 2025",
    nextTest: "Aug 10, 2025",
    contractExpiration: "2030",
    contractValue: "$70M",
    stats: { avg: ".285", hr: 15, rbi: 65, obp: ".350", slg: ".480" },
    imageUrl: "/baseball-infielder.png",
    riskLevel: "Medium",
    playerType: "hitter",
    triggers: [
      {
        type: "Power Surge",
        description: "Home run rate increased by 150%",
        threshold: "+50%",
        current: "+150%",
        previous: "8 HR",
        change: "+150%",
        significant: true,
        substanceCorrelation: ["Anabolic Agents", "Hormone Modulators"]
      }
    ]
  },
  {
    id: "3",
    name: "Bryan Reynolds",
    number: "10",
    position: "OF",
    positionCategory: "hitter",
    batsThrows: "S/R",
    height: "6'3\"",
    weight: "205",
    complianceStatus: "Clear",
    lastTested: "May 20, 2025",
    nextTest: "Aug 20, 2025",
    contractExpiration: "2031",
    contractValue: "$106M",
    stats: { avg: ".295", hr: 15, rbi: 52, obp: ".365", slg: ".510" },
    imageUrl: "/baseball-outfielder.png",
    riskLevel: "Low",
    playerType: "hitter"
  },
  {
    id: "4",
    name: "Mitch Keller",
    number: "23",
    position: "SP",
    positionCategory: "pitcher",
    batsThrows: "R/R",
    height: "6'2\"",
    weight: "220",
    complianceStatus: "Clear",
    lastTested: "May 12, 2025",
    nextTest: "Aug 12, 2025",
    contractExpiration: "2028",
    contractValue: "$77M",
    stats: { era: "3.45", w: 8, l: 4, whip: "1.25", so: 95 },
    imageUrl: "/baseball-pitcher.png",
    riskLevel: "Low",
    playerType: "pitcher"
  },
  {
    id: "5",
    name: "David Bednar",
    number: "51",
    position: "CL",
    positionCategory: "pitcher",
    batsThrows: "R/R",
    height: "6'1\"",
    weight: "220",
    complianceStatus: "Attention",
    lastTested: "May 5, 2025",
    nextTest: "Aug 5, 2025",
    contractExpiration: "2028",
    contractValue: "$12M",
    stats: { era: "2.10", w: 2, l: 1, whip: "0.95", so: 45, sv: 28 },
    imageUrl: "/baseball-pitcher.png",
    riskLevel: "High",
    playerType: "pitcher",
    triggers: [
      {
        type: "Velocity Spike",
        description: "Fastball velocity increased by 4.2 mph",
        threshold: "+3.0 mph",
        current: "+4.2 mph",
        previous: "94.1 mph",
        change: "+4.2 mph",
        significant: true,
        substanceCorrelation: ["Anabolic Agents", "Peptide Hormones"]
      }
    ]
  },

  // INJURED PLAYERS (First 5 only)
  {
    id: "106",
    name: "Mitch Keller",
    number: "29",
    position: "SP",
    positionCategory: "pitcher",
    batsThrows: "R/R",
    height: "6'3\"",
    weight: "210 lbs",
    complianceStatus: "Attention",
    lastTested: "May 1, 2025",
    nextTest: "Aug 1, 2025",
    contractExpiration: "2029",
    contractValue: "$15M",
    stats: { era: "5.50", w: 3, l: 7, whip: "1.60", so: 55 },
    imageUrl: "/baseball-pitcher.png",
    riskLevel: "High",
    injuryStatus: "Injured List (15-day)",
    injuryType: "Forearm Tightness",
    expectedReturn: "June 25, 2025",
    injuryStartDate: "2025-06-12",
    playerType: "pitcher",
    avgRecoveryDays: 25,
    progress: 87,
    daysOnIL: 13,
    daysRemaining: 2
  },
  {
    id: "201",
    name: "Oneil Cruz",
    number: "15",
    position: "SS",
    positionCategory: "hitter",
    batsThrows: "L/R",
    height: "6'7\"",
    weight: "215 lbs",
    complianceStatus: "Clear",
    lastTested: "May 15, 2025",
    nextTest: "Aug 15, 2025",
    contractExpiration: "2029",
    contractValue: "$8M",
    stats: { avg: ".285", hr: 12, rbi: 45, obp: ".345", slg: ".520" },
    imageUrl: "/oneil-cruz.png",
    riskLevel: "Low",
    injuryStatus: "Injured List (10-day)",
    injuryType: "Ankle Sprain",
    expectedReturn: "July 1, 2025",
    injuryStartDate: "June 5, 2025",
    playerType: "hitter",
    avgRecoveryDays: 18,
    progress: 20,
    daysOnIL: 2,
    daysRemaining: 8
  },
  {
    id: "202",
    name: "Henry Davis",
    number: "32",
    position: "C",
    positionCategory: "hitter",
    batsThrows: "R/R",
    height: "6'1\"",
    weight: "210 lbs",
    complianceStatus: "Clear",
    lastTested: "May 18, 2025",
    nextTest: "Aug 18, 2025",
    contractExpiration: "2028",
    contractValue: "$2M",
    stats: { avg: ".260", hr: 3, rbi: 22, obp: ".320", slg: ".380" },
    imageUrl: "/henry-davis.png",
    riskLevel: "Low",
    injuryStatus: "Injured List (15-day)",
    injuryType: "Hamstring Strain",
    expectedReturn: "August 15, 2025",
    injuryStartDate: "June 10, 2025",
    playerType: "hitter",
    avgRecoveryDays: 18,
    progress: 12,
    daysOnIL: 7,
    daysRemaining: 53
  },
  {
    id: "203",
    name: "Frank Miller",
    number: "99",
    position: "SP",
    positionCategory: "pitcher",
    batsThrows: "L/L",
    height: "6'4\"",
    weight: "225 lbs",
    complianceStatus: "Clear",
    lastTested: "May 8, 2025",
    nextTest: "Aug 8, 2025",
    contractExpiration: "2026",
    contractValue: "$5M",
    stats: { era: "4.80", w: 4, l: 8, whip: "1.40", so: 65 },
    imageUrl: "/baseball-pitcher.png",
    riskLevel: "Low",
    injuryStatus: "Injured List (60-day)",
    injuryType: "Shoulder Inflammation",
    expectedReturn: "September 1, 2025",
    injuryStartDate: "May 15, 2025",
    playerType: "pitcher",
    avgRecoveryDays: 25,
    progress: 50,
    daysOnIL: 22,
    daysRemaining: 22
  },
  {
    id: "304",
    name: "Colin Holderman",
    number: "41",
    position: "RP",
    positionCategory: "pitcher",
    batsThrows: "R/R",
    height: "6'7\"",
    weight: "240",
    complianceStatus: "Clear",
    lastTested: "May 14, 2025",
    nextTest: "Aug 14, 2025",
    contractExpiration: "2027",
    contractValue: "$3M",
    stats: { era: "3.80", w: 2, l: 3, whip: "1.30", so: 42 },
    imageUrl: "/baseball-pitcher.png",
    riskLevel: "Low",
    injuryStatus: "Injured List (15-day)",
    injuryType: "Shoulder Soreness",
    expectedReturn: "July 25, 2025",
    injuryStartDate: "June 12, 2025",
    playerType: "pitcher",
    avgRecoveryDays: 37,
  },
  // DEMO ACTIVE PLAYERS
  {
    id: "204",
    name: "Chris Johnson",
    number: "45",
    position: "RP",
    positionCategory: "pitcher",
    batsThrows: "R/R",
    height: "6'0\"",
    weight: "195",
    complianceStatus: "Clear",
    lastTested: "May 18, 2025",
    nextTest: "Aug 18, 2025",
    contractExpiration: "2029",
    contractValue: "$2M",
    stats: { era: "2.80", w: 2, l: 1, whip: "1.05", so: 34 },
    imageUrl: "/baseball-pitcher.png",
    riskLevel: "Low",
    playerType: "pitcher",
  },
  {
    id: "205",
    name: "Alex Kim",
    number: "7",
    position: "SS",
    positionCategory: "hitter",
    batsThrows: "S/R",
    height: "5'11\"",
    weight: "180",
    complianceStatus: "Clear",
    lastTested: "May 20, 2025",
    nextTest: "Aug 20, 2025",
    contractExpiration: "2027",
    contractValue: "$4M",
    stats: { avg: ".275", hr: 4, rbi: 22, sb: 12 },
    imageUrl: "/baseball-infielder.png",
    riskLevel: "Low",
    playerType: "hitter",
  },
  // DEMO INJURED PLAYERS
  {
    id: "206",
    name: "Ethan Brooks",
    number: "18",
    position: "2B",
    positionCategory: "hitter",
    batsThrows: "R/R",
    height: "6'0\"",
    weight: "185",
    complianceStatus: "Attention",
    lastTested: "May 22, 2025",
    nextTest: "Aug 22, 2025",
    contractExpiration: "2026",
    contractValue: "$2.5M",
    stats: { avg: ".250", hr: 2, rbi: 18, sb: 7 },
    imageUrl: "/baseball-infielder.png",
    riskLevel: "High",
    playerType: "hitter",
    injuryStatus: "Injured List (10-day)",
    injuryType: "Hamstring Strain",
    expectedReturn: "June 5, 2025",
    injuryStartDate: "May 28, 2025",
    // Fast recovery for demo: High risk
  },
  {
    id: "207",
    name: "Miguel Torres",
    number: "22",
    position: "OF",
    positionCategory: "hitter",
    batsThrows: "L/L",
    height: "6'2\"",
    weight: "210",
    complianceStatus: "Clear",
    lastTested: "May 25, 2025",
    nextTest: "Aug 25, 2025",
    contractExpiration: "2028",
    contractValue: "$3.5M",
    stats: { avg: ".240", hr: 6, rbi: 25, sb: 10 },
    imageUrl: "/baseball-infielder.png",
    riskLevel: "Low",
    playerType: "hitter",
    injuryStatus: "Injured List (15-day)",
    injuryType: "Wrist Sprain",
    expectedReturn: "June 20, 2025",
    injuryStartDate: "June 1, 2025",
    // Normal recovery: Low risk
    avgRecoveryDays: 18,
  },
  {
    id: "208",
    name: "Samir Patel",
    number: "50",
    position: "SP",
    positionCategory: "pitcher",
    batsThrows: "R/R",
    height: "6'4\"",
    weight: "225",
    complianceStatus: "Attention",
    lastTested: "May 28, 2025",
    nextTest: "Aug 28, 2025",
    contractExpiration: "2029",
    contractValue: "$6M",
    stats: { era: "4.10", w: 4, l: 5, whip: "1.30", so: 60 },
    imageUrl: "/baseball-pitcher.png",
    riskLevel: "High",
    playerType: "pitcher",
    injuryStatus: "Injured List (15-day)",
    injuryType: "Forearm Strain",
    expectedReturn: "June 10, 2025",
    injuryStartDate: "June 1, 2025",
    // Fast recovery: High risk
    avgRecoveryDays: 25,
  },
  {
    id: "209",
    name: "Tyler Evans",
    number: "16",
    position: "RP",
    positionCategory: "pitcher",
    batsThrows: "L/L",
    height: "6'2\"",
    weight: "205",
    complianceStatus: "Clear",
    lastTested: "May 30, 2025",
    nextTest: "Aug 30, 2025",
    contractExpiration: "2027",
    contractValue: "$2M",
    stats: { era: "3.50", w: 1, l: 2, whip: "1.18", so: 28 },
    imageUrl: "/baseball-pitcher.png",
    riskLevel: "Low",
    playerType: "pitcher",
    injuryStatus: "Injured List (10-day)",
    injuryType: "Groin Strain",
    expectedReturn: "June 15, 2025",
    injuryStartDate: "June 5, 2025",
    // Normal recovery: Low risk
    avgRecoveryDays: 15,
  },
  {
    id: "210",
    name: "Jordan White",
    number: "29",
    position: "3B",
    positionCategory: "hitter",
    batsThrows: "R/R",
    height: "6'1\"",
    weight: "210",
    complianceStatus: "Attention",
    lastTested: "June 1, 2025",
    nextTest: "Sept 1, 2025",
    contractExpiration: "2026",
    contractValue: "$3M",
    stats: { avg: ".230", hr: 10, rbi: 30, sb: 3 },
    imageUrl: "/baseball-infielder.png",
    riskLevel: "High",
    playerType: "hitter",
    injuryStatus: "Injured List (10-day)",
    injuryType: "Shoulder Inflammation",
    expectedReturn: "June 8, 2025",
    injuryStartDate: "June 1, 2025",
    // Fast recovery: High risk
  },
  {
    id: "103",
    name: "Chris Davis",
    number: "2",
    position: "SS",
    positionCategory: "hitter",
    batsThrows: "L/R",
    height: "6'0\"",
    weight: "195",
    complianceStatus: "Clear",
    lastTested: "May 15, 2025",
    nextTest: "Aug 15, 2025",
    contractExpiration: "2027",
    contractValue: "$4M",
    stats: { avg: ".245", hr: 5, rbi: 20, obp: ".310", slg: ".370" },
    imageUrl: "/baseball-shortstop.png",
    riskLevel: "Low",
    playerType: "hitter",
    triggers: [
      {
        type: "OBP Drop",
        description: "On-base percentage decline",
        threshold: "-.030",
        current: ".310",
        previous: ".340",
        change: "-.030"
      }
    ]
  },
  {
    id: "104",
    name: "Daniel Green",
    number: "47",
    position: "1B",
    positionCategory: "hitter",
    batsThrows: "R/R",
    height: "6'3\"",
    weight: "230",
    complianceStatus: "Attention",
    lastTested: "May 18, 2025",
    nextTest: "Aug 18, 2025",
    contractExpiration: "2026",
    contractValue: "$6M",
    stats: { avg: ".210", hr: 7, rbi: 18, obp: ".290", slg: ".350" },
    imageUrl: "/baseball-player-first-base.png",
    riskLevel: "Medium",
    playerType: "hitter",
    triggers: [
      {
        type: "SLG Drop",
        description: "Slugging percentage significantly lower",
        threshold: "-.090",
        current: ".350",
        previous: ".440",
        change: "-.090"
      },
      {
        type: "Exit Velocity Drop",
        description: "Average exit velocity decrease",
        threshold: "-2.5 mph",
        current: "87.0 mph",
        previous: "89.5 mph",
        change: "-2.5 mph"
      },
      {
        type: "Strikeout Rate Increase",
        description: "Strikeout rate increased significantly",
        threshold: "+5.0%",
        current: "28.0%",
        previous: "23.0%",
        change: "+5.0%"
      },
      {
        type: "OPS Decline",
        description: "On-base plus slugging percentage dropped",
        threshold: "-.060",
        current: ".640",
        previous: ".700",
        change: "-.060"
      }
    ]
  },
  {
    id: "105",
    name: "Ethan White",
    number: "27",
    position: "C",
    positionCategory: "hitter",
    batsThrows: "R/R",
    height: "6'2\"",
    weight: "210",
    complianceStatus: "Clear",
    lastTested: "May 20, 2025",
    nextTest: "Aug 20, 2025",
    contractExpiration: "2028",
    contractValue: "$3M",
    stats: { avg: ".220", hr: 3, rbi: 12, obp: ".280", slg: ".320" },
    imageUrl: "/baseball-catcher.png",
    riskLevel: "Low",
    playerType: "hitter",
    triggers: [
      {
        type: "RBI Drop",
        description: "Runs batted in production significantly down",
        threshold: "-15 RBI pace",
        current: "12 RBI",
        previous: "27 RBI",
        change: "-15 RBI"
      }
    ]
  },
  {
    id: "107",
    name: "Spencer Strider",
    number: "99",
    position: "SP",
    positionCategory: "pitcher",
    batsThrows: "R/R",
    height: "6'0\"",
    weight: "195",
    complianceStatus: "Attention",
    lastTested: "May 4, 2025",
    nextTest: "Aug 4, 2025",
    contractExpiration: "2029",
    contractValue: "$8M",
    stats: { era: "5.40", w: 2, l: 8, whip: "1.50", so: 60 },
    imageUrl: "/spencer-strider.png",
    riskLevel: "High",
    playerType: "pitcher",
    age: 26,
    triggers: [
      {
        type: "ERA Increase",
        description: "Earned run average significantly higher than prior year",
        threshold: "+2.00",
        current: "5.40",
        previous: "2.25",
        change: "+3.15"
      },
      {
        type: "Velocity Drop",
        description: "Fastball velocity decrease",
        threshold: "-2.0 mph",
        current: "92.0 mph",
        previous: "96.0 mph",
        change: "-4.0 mph"
      },
      {
        type: "K% Drop",
        description: "Strikeout rate decrease",
        threshold: "-15.0%",
        current: "10.0%",
        previous: "35.0%",
        change: "-25.0%"
      },
      {
        type: "Spin Rate Decline",
        description: "Spin rate decrease on breaking ball",
        threshold: "-300 rpm",
        current: "1900 rpm",
        previous: "2500 rpm",
        change: "-600 rpm"
      }
    ]
  },
  {
    id: "108",
    name: "Paul Skenes",
    number: "30",
    position: "SP",
    positionCategory: "pitcher",
    batsThrows: "R/R",
    height: "6'6\"",
    weight: "260",
    complianceStatus: "Clear",
    lastTested: "May 25, 2025",
    nextTest: "Aug 25, 2025",
    contractExpiration: "2029",
    contractValue: "$9.2M",
    stats: { 
      era: "2.12", 
      w: 4, 
      l: 7, 
      whip: "0.91", 
      so: 110,
      ip: 106,
      g: 17,
      gs: 17,
      // 2024 stats for comparison
      era_2024: "1.96",
      w_2024: 11,
      l_2024: 3,
      whip_2024: "0.95",
      so_2024: 170,
      ip_2024: 133,
      g_2024: 23,
      gs_2024: 23
    },
    imageUrl: "/paul-skenes.png",
    riskLevel: "Low",
    playerType: "pitcher",
    age: 23,
    triggers: [
      {
        type: "Velocity Consistency",
        description: "Fastball velocity maintaining elite levels",
        threshold: "98+ mph",
        current: "99.2 mph",
        previous: "98.8 mph",
        change: "+0.4 mph",
        significant: false
      },
      {
        type: "Strikeout Rate",
        description: "Elite strikeout rate maintained",
        threshold: "30%+",
        current: "32.1%",
        previous: "31.8%",
        change: "+0.3%",
        significant: false
      },
      {
        type: "WHIP Improvement",
        description: "Walks plus hits per inning pitched improved",
        threshold: "<1.00",
        current: "0.91",
        previous: "0.95",
        change: "-0.04",
        significant: true
      }
    ]
  },
]

export default players 