"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  RefreshCw, 
  Clock, 
  User, 
  Calendar,
  AlertCircle,
  CheckCircle2
} from "lucide-react"
import { getTodaysGame, getNextScheduledGame, shouldScrapeForGame } from "@/data/pirates-schedule"

interface ScrapingStatus {
  lastChecked: string
  gamesFound: number
  probablePitchers: any[]
  nextCheck: string
}

export function ProbablePitcherDashboard() {
  const [scrapingStatus, setScrapingStatus] = useState<ScrapingStatus | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [todaysGame, setTodaysGame] = useState<any>(null)
  const [nextGame, setNextGame] = useState<any>(null)

  useEffect(() => {
    const todays = getTodaysGame()
    const next = getNextScheduledGame()
    setTodaysGame(todays)
    setNextGame(next)
  }, [])

  const testScraping = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/test-scraping')
      const data = await response.json()
      
      if (data.success) {
        setScrapingStatus({
          lastChecked: new Date().toISOString(),
          gamesFound: data.scrapeTest.games?.length || 0,
          probablePitchers: data.scrapeTest.games || [],
          nextCheck: new Date(Date.now() + 60 * 60 * 1000).toISOString() // 1 hour from now
        })
      }
    } catch (error) {
      console.error('Error testing scraping:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const shouldScrapeToday = todaysGame && shouldScrapeForGame(todaysGame.date, todaysGame.time)
  const shouldScrapeNext = nextGame && shouldScrapeForGame(nextGame.date, nextGame.time)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Probable Pitcher Scraping
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-medium">Today's Game:</span>
            <Badge variant={todaysGame ? "default" : "secondary"}>
              {todaysGame ? `${todaysGame.opponent} at ${todaysGame.time}` : "No game"}
            </Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-green-500" />
            <span className="text-sm font-medium">Next Game:</span>
            <Badge variant={nextGame ? "default" : "secondary"}>
              {nextGame ? `${nextGame.opponent} on ${nextGame.date}` : "No upcoming"}
            </Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4 text-orange-500" />
            <span className="text-sm font-medium">Scraping Status:</span>
            <Badge variant={shouldScrapeToday || shouldScrapeNext ? "destructive" : "secondary"}>
              {shouldScrapeToday || shouldScrapeNext ? "Due" : "Up to date"}
            </Badge>
          </div>
        </div>

        {/* Game Details */}
        {todaysGame && (
          <div className="border rounded-lg p-3 bg-gray-50">
            <h4 className="font-medium mb-2">Today's Game Details</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div><span className="font-medium">Opponent:</span> {todaysGame.opponent}</div>
              <div><span className="font-medium">Time:</span> {todaysGame.time}</div>
              <div><span className="font-medium">Probable Pitcher:</span> {todaysGame.probablePitcher || "TBD"}</div>
              <div><span className="font-medium">Scraping Due:</span> 
                {shouldScrapeToday ? (
                  <Badge variant="destructive" className="ml-1">Yes</Badge>
                ) : (
                  <Badge variant="secondary" className="ml-1">No</Badge>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Manual Test */}
        <div className="border rounded-lg p-3">
          <h4 className="font-medium mb-2">Manual Scraping Test</h4>
          <Button 
            onClick={testScraping} 
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Testing Scraping...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                Test Scraping Now
              </>
            )}
          </Button>
        </div>

        {/* Scraping Results */}
        {scrapingStatus && (
          <div className="border rounded-lg p-3">
            <h4 className="font-medium mb-2">Last Scraping Results</h4>
            <div className="space-y-2 text-sm">
              <div><span className="font-medium">Last Checked:</span> {new Date(scrapingStatus.lastChecked).toLocaleString()}</div>
              <div><span className="font-medium">Games Found:</span> {scrapingStatus.gamesFound}</div>
              <div><span className="font-medium">Next Check:</span> {new Date(scrapingStatus.nextCheck).toLocaleString()}</div>
              
              {scrapingStatus.probablePitchers.length > 0 && (
                <div>
                  <span className="font-medium">Probable Pitchers Found:</span>
                  <ul className="mt-1 space-y-1">
                    {scrapingStatus.probablePitchers.map((game, index) => (
                      <li key={index} className="text-xs bg-green-50 p-2 rounded">
                        {game.date} {game.time}: {game.probablePitcher} vs {game.opponent}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Information */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium">How it works:</p>
              <ul className="mt-1 space-y-1">
                <li>• System automatically scrapes MLB.com 4 hours before each game</li>
                <li>• Updates probable pitchers in real-time</li>
                <li>• Sends SMS notifications when probable pitchers are announced</li>
                <li>• Checks every hour for updates</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 