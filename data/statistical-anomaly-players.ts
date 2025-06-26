// Shared types and data for statistical anomaly players
export type Position = "C" | "1B" | "2B" | "3B" | "SS" | "OF" | "SP" | "RP" | "CL"
export type PlayerType = "hitter" | "pitcher"
export type RiskLevel = "High" | "Medium" | "Low" | "None"

export interface StatisticalTrigger {
  type: string
  description: string
  threshold: string
  current: string
  previous: string
  change: string
  significant: boolean
  substanceCorrelation?: string[]
}

export interface Player {
  id: string
  name: string
  number: string
  position: Position
  playerType: PlayerType
  age: number
  riskLevel: RiskLevel
  riskScore: number
  complianceStatus: string
  lastTested: string
  triggers: StatisticalTrigger[]
  imageUrl: string
}

export const players: Player[] = [
  {
    id: "2",
    name: "Carlos Martinez",
    number: "53",
    position: "RP",
    playerType: "pitcher",
    age: 33,
    riskLevel: "High",
    riskScore: 85,
    complianceStatus: "Pending",
    lastTested: "Apr 10, 2025",
    triggers: [
      {
        type: "ERA Improvement",
        description: "Dramatic ERA improvement with stuff enhancement",
        threshold: "-1.50 or more",
        current: "2.15",
        previous: "4.20",
        change: "-2.05",
        significant: true,
        substanceCorrelation: ["Anabolic Agents", "Peptide Hormones"],
      },
      {
        type: "Fastball Velocity",
        description: "Fastball velocity increase at age 33",
        threshold: "+2 mph or more",
        current: "96.2 mph",
        previous: "93.8 mph",
        change: "+2.4 mph",
        significant: true,
        substanceCorrelation: ["Boldenone", "Ibutamoren (MK-677)"],
      },
      {
        type: "K% Increase",
        description: "Strikeout percentage increase with velocity jump",
        threshold: "+5% or more",
        current: "28.4%",
        previous: "22.1%",
        change: "+6.3%",
        significant: true,
        substanceCorrelation: ["Selective Androgen Receptor Modulator S-23"],
      },
    ],
    imageUrl: "/baseball-pitcher.png",
  },
  {
    id: "3",
    name: "Jason Thompson",
    number: "41",
    position: "OF",
    playerType: "hitter",
    age: 31,
    riskLevel: "High",
    riskScore: 78,
    complianceStatus: "Compliant",
    lastTested: "May 2, 2025",
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
    ],
    imageUrl: "/baseball-outfielder.png",
  },
  {
    id: "4",
    name: "David Johnson",
    number: "39",
    position: "SP",
    playerType: "pitcher",
    age: 37,
    riskLevel: "Medium",
    riskScore: 62,
    complianceStatus: "Exempt",
    lastTested: "Apr 25, 2025",
    triggers: [
      {
        type: "Fastball Velocity",
        description: "Fastball velocity increase at advanced age",
        threshold: "+2 mph or more",
        current: "93.8 mph",
        previous: "91.5 mph",
        change: "+2.3 mph",
        significant: true,
        substanceCorrelation: ["Ibutamoren (MK-677)", "Growth Hormone"],
      },
      {
        type: "Spin Rate",
        description: "Breaking ball spin rate increase",
        threshold: "+200 RPM or more",
        current: "2580 RPM",
        previous: "2350 RPM",
        change: "+230 RPM",
        significant: true,
        substanceCorrelation: ["Selective Androgen Receptor Modulator S-23"],
      },
    ],
    imageUrl: "/baseball-pitcher.png",
  },
  {
    id: "5",
    name: "Anthony Garcia",
    number: "28",
    position: "3B",
    playerType: "hitter",
    age: 34,
    riskLevel: "Low",
    riskScore: 35,
    complianceStatus: "Compliant",
    lastTested: "May 10, 2025",
    triggers: [
      {
        type: "Exit Velocity",
        description: "Average exit velocity increase at advanced age",
        threshold: "+3 mph or more",
        current: "90.8 mph",
        previous: "88.5 mph",
        change: "+2.3 mph",
        significant: false,
        substanceCorrelation: ["Testosterone", "Stanozolol"],
      },
    ],
    imageUrl: "/placeholder-qcez2.png",
  },
  {
    id: "6",
    name: "Tyler Wilson",
    number: "56",
    position: "CL",
    playerType: "pitcher",
    age: 31,
    riskLevel: "High",
    riskScore: 82,
    complianceStatus: "Compliant",
    lastTested: "May 8, 2025",
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
    ],
    imageUrl: "/baseball-closer.png",
  },
  {
    id: "101",
    name: "David Bednar",
    number: "51",
    position: "CL",
    complianceStatus: "Attention",
    lastTested: "May 5, 2025",
    imageUrl: "/baseball-pitcher.png",
    riskLevel: "Low",
    riskScore: 85,
    playerType: "pitcher",
    age: 29,
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
  {
    id: "102",
    name: "Ke'Bryan Hayes",
    number: "13",
    position: "3B",
    complianceStatus: "Clear",
    lastTested: "May 10, 2025",
    imageUrl: "/baseball-infielder.png",
    riskLevel: "Medium",
    riskScore: 60,
    playerType: "hitter",
    age: 27,
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
    id: "103",
    name: "Chris Davis",
    number: "2",
    position: "SS",
    complianceStatus: "Clear",
    lastTested: "May 15, 2025",
    imageUrl: "/baseball-shortstop.png",
    riskLevel: "Low",
    riskScore: 40,
    playerType: "hitter",
    age: 38,
    triggers: [
      {
        type: "OBP Drop",
        description: "On-base percentage decline",
        threshold: "-.030",
        current: "-.045",
        previous: ".355",
        change: "-.045",
        significant: false,
        substanceCorrelation: ["Metabolic Modulators"]
      }
    ]
  },
  {
    id: "104",
    name: "Daniel Green",
    number: "18",
    position: "SP",
    complianceStatus: "Clear",
    lastTested: "May 12, 2025",
    imageUrl: "/baseball-pitcher.png",
    riskLevel: "Medium",
    riskScore: 50,
    playerType: "pitcher",
    age: 26,
    triggers: [
      {
        type: "Control Issues",
        description: "Walk rate increased significantly",
        threshold: "+2.0 BB/9",
        current: "+2.8 BB/9",
        previous: "2.2 BB/9",
        change: "+2.8 BB/9",
        significant: true,
        substanceCorrelation: ["Hormone Modulators", "Metabolic Modulators"]
      }
    ]
  },
  {
    id: "105",
    name: "Ethan White",
    number: "25",
    position: "OF",
    complianceStatus: "Clear",
    lastTested: "May 8, 2025",
    imageUrl: "/baseball-outfielder.png",
    riskLevel: "Low",
    riskScore: 25,
    playerType: "hitter",
    age: 25,
    triggers: [
      {
        type: "Slump",
        description: "Batting average decline",
        threshold: "-.050",
        current: "-.065",
        previous: ".340",
        change: "-.065",
        significant: false,
        substanceCorrelation: ["Metabolic Modulators"]
      }
    ]
  }
]

export const statisticalIncreasePlayers = [
  {
    id: "1",
    name: "Carlos Martinez",
    number: "53",
    position: "RP",
    age: 33,
    riskLevel: "High",
    riskScore: 85,
    triggers: [
      { type: "ERA Improvement", description: "ERA significantly improved" },
      { type: "Fastball Velocity", description: "Fastball velocity increased" },
      { type: "K% Increase", description: "Strikeout rate increased" }
    ],
    imageUrl: "/baseball-pitcher.png",
    lastTested: "Apr 10, 2025"
  },
  {
    id: "2",
    name: "Jason Thompson",
    number: "41",
    position: "OF",
    age: 31,
    riskLevel: "High",
    riskScore: 78,
    triggers: [
      { type: "ISO Increase", description: "Isolated power increased" },
      { type: "SLG Increase", description: "Slugging percentage increased" },
      { type: "K% Drop", description: "Strikeout rate dropped" }
    ],
    imageUrl: "/baseball-outfielder.png",
    lastTested: "May 2, 2025"
  },
  {
    id: "3",
    name: "David Johnson",
    number: "39",
    position: "SP",
    age: 37,
    riskLevel: "Medium",
    riskScore: 62,
    triggers: [
      { type: "Fastball Velocity", description: "Fastball velocity increased" },
      { type: "Spin Rate", description: "Spin rate increased" }
    ],
    imageUrl: "/baseball-pitcher.png",
    lastTested: "Apr 25, 2025"
  },
  {
    id: "4",
    name: "Anthony Garcia",
    number: "28",
    position: "3B",
    age: 34,
    riskLevel: "Low",
    riskScore: 35,
    triggers: [
      { type: "Exit Velocity", description: "Exit velocity increased" }
    ],
    imageUrl: "",
    lastTested: "May 10, 2025"
  },
  {
    id: "5",
    name: "Tyler Wilson",
    number: "56",
    position: "CL",
    age: 31,
    riskLevel: "High",
    riskScore: 82,
    triggers: [
      { type: "Fastball Velocity", description: "Fastball velocity increased" },
      { type: "K% Increase", description: "Strikeout rate increased" },
      { type: "Recovery", description: "Recovery speed increased" }
    ],
    imageUrl: "/baseball-pitcher.png",
    lastTested: "May 8, 2025"
  },
  {
    id: "6",
    name: "David Bednar",
    number: "51",
    position: "CL",
    age: 29,
    riskLevel: "Low",
    riskScore: 85,
    triggers: [
      { type: "Velocity Spike", description: "Fastball velocity spike" }
    ],
    imageUrl: "/baseball-pitcher.png",
    lastTested: "May 5, 2025"
  },
  {
    id: "7",
    name: "Ke'Bryan Hayes",
    number: "13",
    position: "3B",
    age: 27,
    riskLevel: "Medium",
    riskScore: 60,
    triggers: [
      { type: "Power Surge", description: "Home run rate increased by 150%" }
    ],
    imageUrl: "",
    lastTested: "May 10, 2025"
  }
];

export const statisticalDeclinePlayers = [
  // Spencer Strider removed - now only appears in underperforming players analysis
]; 