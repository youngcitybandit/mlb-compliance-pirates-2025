import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { 
  Database, 
  Activity, 
  Shield, 
  BarChart3, 
  Zap, 
  Settings,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Clock
} from "lucide-react"

interface Integration {
  id: string
  name: string
  description: string
  category: "data" | "analytics" | "security" | "monitoring"
  status: "active" | "inactive" | "pending" | "error"
  lastSync?: string
  icon: React.ComponentType<{ className?: string }>
  features: string[]
}

const integrations: Integration[] = [
  {
    id: "mlb-regulations",
    name: "MLB Regulations and Player Resources",
    description: "Official MLB rules, policies, and player resources for compliance and education.",
    category: "security",
    status: "active",
    lastSync: "Just now",
    icon: Shield,
    features: [
      "Official MLB rules",
      "Player conduct policies",
      "Substance regulations",
      "Appeals process",
      "Educational resources"
    ]
  },
  {
    id: "mlb-stats-api",
    name: "MLB Stats API",
    description: "Real-time player statistics and performance data",
    category: "data",
    status: "active",
    lastSync: "2 minutes ago",
    icon: Database,
    features: ["Live game data", "Player statistics", "Historical records", "Real-time updates"]
  },
  {
    id: "statcast",
    name: "Statcast Integration",
    description: "Advanced metrics and player tracking data in real time",
    category: "analytics",
    status: "active",
    lastSync: "5 minutes ago",
    icon: BarChart3,
    features: ["Exit velocity", "Launch angle", "Spin rate", "Pitch tracking"]
  },
  {
    id: "historical-injury-data",
    name: "Historical MLB Injury Data",
    description: "2019-YTD injuries by position and by age",
    category: "data",
    status: "active",
    lastSync: "1 minute ago",
    icon: Database,
    features: ["Injury patterns", "Position analysis", "Age demographics", "Trend analysis"]
  },
  {
    id: "drug-testing-lab",
    name: "Drug Testing Lab",
    description: "Direct integration with authorized testing facilities",
    category: "security",
    status: "inactive",
    lastSync: "1 hour ago",
    icon: Shield,
    features: ["Test scheduling", "Results reporting", "Chain of custody", "Compliance tracking"]
  },
  {
    id: "medical-records",
    name: "Medical Records System",
    description: "Player health and injury tracking",
    category: "monitoring",
    status: "inactive",
    lastSync: "30 minutes ago",
    icon: Activity,
    features: ["Injury tracking", "Recovery monitoring", "Medical exemptions", "Health alerts"]
  },
  {
    id: "biometric-monitoring",
    name: "Biometric Monitoring",
    description: "Real-time player biometric data collection",
    category: "monitoring",
    status: "pending",
    icon: Zap,
    features: ["Heart rate monitoring", "Sleep tracking", "Recovery metrics", "Performance indicators"]
  },
  {
    id: "weather-api",
    name: "Weather API",
    description: "Game day weather conditions and forecasts",
    category: "data",
    status: "inactive",
    icon: Database,
    features: ["Game day forecasts", "Historical weather", "Impact analysis", "Scheduling optimization"]
  }
]

const getStatusBadge = (status: Integration["status"]) => {
  switch (status) {
    case "active":
      return <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>
    case "inactive":
      return <Badge variant="outline" className="text-gray-600">Inactive</Badge>
    case "pending":
      return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>
    case "error":
      return <Badge className="bg-red-100 text-red-800 border-red-200">Error</Badge>
    default:
      return <Badge variant="outline">Unknown</Badge>
  }
}

const getStatusIcon = (status: Integration["status"]) => {
  switch (status) {
    case "active":
      return <CheckCircle className="h-4 w-4 text-green-600" />
    case "inactive":
      return <Clock className="h-4 w-4 text-gray-400" />
    case "pending":
      return <Clock className="h-4 w-4 text-yellow-600" />
    case "error":
      return <AlertCircle className="h-4 w-4 text-red-600" />
    default:
      return <Clock className="h-4 w-4 text-gray-400" />
  }
}

export default function IntegrationsPage() {
  return (
    <DashboardShell>
      <DashboardHeader 
        heading="Integrations" 
        text="Manage external data sources and system connections for comprehensive compliance monitoring." 
      />

      <div className="grid gap-6">
        {/* Integration Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Integration Overview
            </CardTitle>
            <CardDescription>
              Monitor the status and performance of all connected systems and data sources.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active</p>
                  <p className="text-2xl font-bold text-green-600">3</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">1</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-600">Inactive</p>
                  <p className="text-2xl font-bold text-gray-600">3</p>
                </div>
                <Clock className="h-8 w-8 text-gray-400" />
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total</p>
                  <p className="text-2xl font-bold text-blue-600">7</p>
                </div>
                <Database className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Integration List */}
        <Card>
          <CardHeader>
            <CardTitle>Connected Systems</CardTitle>
            <CardDescription>
              Manage your integrations and configure data synchronization settings.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {integrations.map((integration) => (
                <div key={integration.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <integration.icon className="h-6 w-6 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{integration.name}</h3>
                          {getStatusBadge(integration.status)}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{integration.description}</p>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {integration.features.map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                        {integration.lastSync && (
                          <p className="text-xs text-gray-500">
                            Last sync: {integration.lastSync}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch 
                        checked={integration.status === "active"} 
                        disabled={integration.status === "pending"}
                      />
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 mr-1" />
                        Configure
                      </Button>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Add New Integration */}
        <Card>
          <CardHeader>
            <CardTitle>Add New Integration</CardTitle>
            <CardDescription>
              Connect additional data sources and systems to enhance your compliance monitoring capabilities.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
                <Database className="h-6 w-6" />
                <span>Data Source</span>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
                <BarChart3 className="h-6 w-6" />
                <span>Analytics Tool</span>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
                <Shield className="h-6 w-6" />
                <span>Security System</span>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
                <Activity className="h-6 w-6" />
                <span>Monitoring Tool</span>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
                <Zap className="h-6 w-6" />
                <span>Custom API</span>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
                <Settings className="h-6 w-6" />
                <span>Other</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
} 