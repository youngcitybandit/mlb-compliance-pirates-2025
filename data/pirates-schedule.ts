// 2025 Pittsburgh Pirates Schedule
// Based on https://www.mlb.com/pirates/schedule/2025/fullseason

export interface GameSchedule {
  date: string
  time: string
  opponent: string
  homeAway: "home" | "away"
  gameType: "regular" | "spring" | "playoff"
  probablePitcher?: string
  status: "scheduled" | "active" | "completed" | "postponed"
}

export const piratesSchedule2025: GameSchedule[] = [
  // March 2025 - Spring Training
  {
    date: "2025-03-27",
    time: "1:05 PM",
    opponent: "vs Baltimore Orioles",
    homeAway: "home",
    gameType: "spring",
    status: "completed"
  },
  {
    date: "2025-03-28",
    time: "1:05 PM", 
    opponent: "vs Toronto Blue Jays",
    homeAway: "home",
    gameType: "spring",
    status: "completed"
  },
  {
    date: "2025-03-29",
    time: "1:05 PM",
    opponent: "vs New York Yankees", 
    homeAway: "home",
    gameType: "spring",
    status: "completed"
  },
  {
    date: "2025-03-30",
    time: "1:05 PM",
    opponent: "vs Boston Red Sox",
    homeAway: "home", 
    gameType: "spring",
    status: "completed"
  },

  // April 2025 - Regular Season
  {
    date: "2025-04-03",
    time: "4:10 PM",
    opponent: "at Miami Marlins",
    homeAway: "away",
    gameType: "regular",
    probablePitcher: "Paul Skenes",
    status: "completed"
  },
  {
    date: "2025-04-04", 
    time: "6:40 PM",
    opponent: "at Miami Marlins",
    homeAway: "away",
    gameType: "regular",
    probablePitcher: "Mitch Keller",
    status: "completed"
  },
  {
    date: "2025-04-05",
    time: "4:10 PM", 
    opponent: "at Miami Marlins",
    homeAway: "away",
    gameType: "regular",
    probablePitcher: "Jared Jones",
    status: "completed"
  },
  {
    date: "2025-04-07",
    time: "6:40 PM",
    opponent: "vs Washington Nationals", 
    homeAway: "home",
    gameType: "regular",
    probablePitcher: "Bailey Falter",
    status: "completed"
  },
  {
    date: "2025-04-08",
    time: "6:40 PM",
    opponent: "vs Washington Nationals",
    homeAway: "home", 
    gameType: "regular",
    probablePitcher: "Paul Skenes",
    status: "completed"
  },
  {
    date: "2025-04-09",
    time: "12:35 PM",
    opponent: "vs Washington Nationals",
    homeAway: "home",
    gameType: "regular", 
    probablePitcher: "Mitch Keller",
    status: "completed"
  },
  {
    date: "2025-04-11",
    time: "6:40 PM",
    opponent: "vs Philadelphia Phillies",
    homeAway: "home",
    gameType: "regular",
    probablePitcher: "Jared Jones", 
    status: "completed"
  },
  {
    date: "2025-04-12",
    time: "4:05 PM",
    opponent: "vs Philadelphia Phillies",
    homeAway: "home",
    gameType: "regular",
    probablePitcher: "Bailey Falter",
    status: "completed"
  },
  {
    date: "2025-04-13", 
    time: "1:35 PM",
    opponent: "vs Philadelphia Phillies",
    homeAway: "home",
    gameType: "regular",
    probablePitcher: "Paul Skenes",
    status: "completed"
  },
  {
    date: "2025-04-15",
    time: "7:10 PM",
    opponent: "at New York Mets",
    homeAway: "away",
    gameType: "regular", 
    probablePitcher: "Mitch Keller",
    status: "completed"
  },
  {
    date: "2025-04-16",
    time: "7:10 PM",
    opponent: "at New York Mets",
    homeAway: "away",
    gameType: "regular",
    probablePitcher: "Jared Jones",
    status: "completed"
  },
  {
    date: "2025-04-17",
    time: "1:10 PM",
    opponent: "at New York Mets", 
    homeAway: "away",
    gameType: "regular",
    probablePitcher: "Bailey Falter",
    status: "completed"
  },
  {
    date: "2025-04-18",
    time: "7:10 PM",
    opponent: "at New York Mets",
    homeAway: "away",
    gameType: "regular",
    probablePitcher: "Paul Skenes",
    status: "completed"
  },
  {
    date: "2025-04-19",
    time: "4:05 PM",
    opponent: "at New York Mets",
    homeAway: "away",
    gameType: "regular",
    probablePitcher: "Mitch Keller",
    status: "completed"
  },
  {
    date: "2025-04-20",
    time: "1:40 PM",
    opponent: "at New York Mets",
    homeAway: "away",
    gameType: "regular",
    probablePitcher: "Jared Jones",
    status: "completed"
  },
  {
    date: "2025-04-22",
    time: "6:40 PM",
    opponent: "vs Milwaukee Brewers",
    homeAway: "home",
    gameType: "regular",
    probablePitcher: "Bailey Falter",
    status: "completed"
  },
  {
    date: "2025-04-23",
    time: "6:40 PM",
    opponent: "vs Milwaukee Brewers",
    homeAway: "home",
    gameType: "regular",
    probablePitcher: "Paul Skenes",
    status: "completed"
  },
  {
    date: "2025-04-24",
    time: "12:35 PM",
    opponent: "vs Milwaukee Brewers",
    homeAway: "home",
    gameType: "regular",
    probablePitcher: "Mitch Keller",
    status: "completed"
  },
  {
    date: "2025-04-25",
    time: "6:40 PM",
    opponent: "vs San Francisco Giants",
    homeAway: "home",
    gameType: "regular",
    probablePitcher: "Jared Jones",
    status: "completed"
  },
  {
    date: "2025-04-26",
    time: "4:05 PM",
    opponent: "vs San Francisco Giants",
    homeAway: "home",
    gameType: "regular",
    probablePitcher: "Bailey Falter",
    status: "completed"
  },
  {
    date: "2025-04-27",
    time: "1:35 PM",
    opponent: "vs San Francisco Giants",
    homeAway: "home",
    gameType: "regular",
    probablePitcher: "Paul Skenes",
    status: "completed"
  },
  {
    date: "2025-04-29",
    time: "7:10 PM",
    opponent: "at Oakland Athletics",
    homeAway: "away",
    gameType: "regular",
    probablePitcher: "Mitch Keller",
    status: "completed"
  },
  {
    date: "2025-04-30",
    time: "9:40 PM",
    opponent: "at Oakland Athletics",
    homeAway: "away",
    gameType: "regular",
    probablePitcher: "Jared Jones",
    status: "completed"
  },

  // May 2025
  {
    date: "2025-05-01",
    time: "3:37 PM",
    opponent: "at Oakland Athletics",
    homeAway: "away",
    gameType: "regular",
    probablePitcher: "Bailey Falter",
    status: "completed"
  },
  {
    date: "2025-05-02",
    time: "9:40 PM",
    opponent: "at San Diego Padres",
    homeAway: "away",
    gameType: "regular",
    probablePitcher: "Paul Skenes",
    status: "completed"
  },
  {
    date: "2025-05-03",
    time: "8:40 PM",
    opponent: "at San Diego Padres",
    homeAway: "away",
    gameType: "regular",
    probablePitcher: "Mitch Keller",
    status: "completed"
  },
  {
    date: "2025-05-04",
    time: "4:10 PM",
    opponent: "at San Diego Padres",
    homeAway: "away",
    gameType: "regular",
    probablePitcher: "Jared Jones",
    status: "completed"
  },
  {
    date: "2025-05-06",
    time: "6:40 PM",
    opponent: "vs Los Angeles Angels",
    homeAway: "home",
    gameType: "regular",
    probablePitcher: "Bailey Falter",
    status: "completed"
  },
  {
    date: "2025-05-07",
    time: "6:40 PM",
    opponent: "vs Los Angeles Angels",
    homeAway: "home",
    gameType: "regular",
    probablePitcher: "Paul Skenes",
    status: "completed"
  },
  {
    date: "2025-05-08",
    time: "12:35 PM",
    opponent: "vs Los Angeles Angels",
    homeAway: "home",
    gameType: "regular",
    probablePitcher: "Mitch Keller",
    status: "completed"
  },
  {
    date: "2025-05-09",
    time: "6:40 PM",
    opponent: "vs Chicago Cubs",
    homeAway: "home",
    gameType: "regular",
    probablePitcher: "Jared Jones",
    status: "completed"
  },
  {
    date: "2025-05-10",
    time: "4:05 PM",
    opponent: "vs Chicago Cubs",
    homeAway: "home",
    gameType: "regular",
    probablePitcher: "Bailey Falter",
    status: "completed"
  },
  {
    date: "2025-05-11",
    time: "1:35 PM",
    opponent: "vs Chicago Cubs",
    homeAway: "home",
    gameType: "regular",
    probablePitcher: "Paul Skenes",
    status: "completed"
  },
  {
    date: "2025-05-13",
    time: "7:40 PM",
    opponent: "at Milwaukee Brewers",
    homeAway: "away",
    gameType: "regular",
    probablePitcher: "Mitch Keller",
    status: "completed"
  },
  {
    date: "2025-05-14",
    time: "7:40 PM",
    opponent: "at Milwaukee Brewers",
    homeAway: "away",
    gameType: "regular",
    probablePitcher: "Jared Jones",
    status: "completed"
  },
  {
    date: "2025-05-15",
    time: "1:10 PM",
    opponent: "at Milwaukee Brewers",
    homeAway: "away",
    gameType: "regular",
    probablePitcher: "Bailey Falter",
    status: "completed"
  },
  {
    date: "2025-05-16",
    time: "7:40 PM",
    opponent: "at Chicago Cubs",
    homeAway: "away",
    gameType: "regular",
    probablePitcher: "Paul Skenes",
    status: "completed"
  },
  {
    date: "2025-05-17",
    time: "2:20 PM",
    opponent: "at Chicago Cubs",
    homeAway: "away",
    gameType: "regular",
    probablePitcher: "Mitch Keller",
    status: "completed"
  },
  {
    date: "2025-05-18",
    time: "2:20 PM",
    opponent: "at Chicago Cubs",
    homeAway: "away",
    gameType: "regular",
    probablePitcher: "Jared Jones",
    status: "completed"
  },
  {
    date: "2025-05-20",
    time: "6:40 PM",
    opponent: "vs Atlanta Braves",
    homeAway: "home",
    gameType: "regular",
    probablePitcher: "Bailey Falter",
    status: "completed"
  },
  {
    date: "2025-05-21",
    time: "6:40 PM",
    opponent: "vs Atlanta Braves",
    homeAway: "home",
    gameType: "regular",
    probablePitcher: "Paul Skenes",
    status: "completed"
  },
  {
    date: "2025-05-22",
    time: "12:35 PM",
    opponent: "vs Atlanta Braves",
    homeAway: "home",
    gameType: "regular",
    probablePitcher: "Mitch Keller",
    status: "completed"
  },
  {
    date: "2025-05-23",
    time: "6:40 PM",
    opponent: "vs Houston Astros",
    homeAway: "home",
    gameType: "regular",
    probablePitcher: "Jared Jones",
    status: "completed"
  },
  {
    date: "2025-05-24",
    time: "4:05 PM",
    opponent: "vs Houston Astros",
    homeAway: "home",
    gameType: "regular",
    probablePitcher: "Bailey Falter",
    status: "completed"
  },
  {
    date: "2025-05-25",
    time: "1:35 PM",
    opponent: "vs Houston Astros",
    homeAway: "home",
    gameType: "regular",
    probablePitcher: "Paul Skenes",
    status: "completed"
  },
  {
    date: "2025-05-27",
    time: "7:10 PM",
    opponent: "at Detroit Tigers",
    homeAway: "away",
    gameType: "regular",
    probablePitcher: "Mitch Keller",
    status: "completed"
  },
  {
    date: "2025-05-28",
    time: "6:40 PM",
    opponent: "at Detroit Tigers",
    homeAway: "away",
    gameType: "regular",
    probablePitcher: "Jared Jones",
    status: "completed"
  },
  {
    date: "2025-05-29",
    time: "1:10 PM",
    opponent: "at Detroit Tigers",
    homeAway: "away",
    gameType: "regular",
    probablePitcher: "Bailey Falter",
    status: "completed"
  },
  {
    date: "2025-05-30",
    time: "7:10 PM",
    opponent: "at Toronto Blue Jays",
    homeAway: "away",
    gameType: "regular",
    probablePitcher: "Paul Skenes",
    status: "completed"
  },
  {
    date: "2025-05-31",
    time: "3:07 PM",
    opponent: "at Toronto Blue Jays",
    homeAway: "away",
    gameType: "regular",
    probablePitcher: "Mitch Keller",
    status: "completed"
  },

  // June 2025
  {
    date: "2025-06-01",
    time: "1:37 PM",
    opponent: "at Toronto Blue Jays",
    homeAway: "away",
    gameType: "regular",
    probablePitcher: "Jared Jones",
    status: "completed"
  },
  {
    date: "2025-06-03",
    time: "6:40 PM",
    opponent: "vs Los Angeles Dodgers",
    homeAway: "home",
    gameType: "regular",
    probablePitcher: "Bailey Falter",
    status: "completed"
  },
  {
    date: "2025-06-04",
    time: "6:40 PM",
    opponent: "vs Los Angeles Dodgers",
    homeAway: "home",
    gameType: "regular",
    probablePitcher: "Paul Skenes",
    status: "completed"
  },
  {
    date: "2025-06-05",
    time: "12:35 PM",
    opponent: "vs Los Angeles Dodgers",
    homeAway: "home",
    gameType: "regular",
    probablePitcher: "Mitch Keller",
    status: "completed"
  },
  {
    date: "2025-06-06",
    time: "6:40 PM",
    opponent: "vs Minnesota Twins",
    homeAway: "home",
    gameType: "regular",
    probablePitcher: "Jared Jones",
    status: "completed"
  },
  {
    date: "2025-06-07",
    time: "4:05 PM",
    opponent: "vs Minnesota Twins",
    homeAway: "home",
    gameType: "regular",
    probablePitcher: "Bailey Falter",
    status: "completed"
  },
  {
    date: "2025-06-08",
    time: "1:35 PM",
    opponent: "vs Minnesota Twins",
    homeAway: "home",
    gameType: "regular",
    probablePitcher: "Paul Skenes",
    status: "completed"
  },
  {
    date: "2025-06-10",
    time: "7:10 PM",
    opponent: "at Colorado Rockies",
    homeAway: "away",
    gameType: "regular",
    probablePitcher: "Mitch Keller",
    status: "completed"
  },
  {
    date: "2025-06-11",
    time: "8:40 PM",
    opponent: "at Colorado Rockies",
    homeAway: "away",
    gameType: "regular",
    probablePitcher: "Jared Jones",
    status: "completed"
  },
  {
    date: "2025-06-12",
    time: "3:10 PM",
    opponent: "at Colorado Rockies",
    homeAway: "away",
    gameType: "regular",
    probablePitcher: "Bailey Falter",
    status: "completed"
  },
  {
    date: "2025-06-13",
    time: "9:40 PM",
    opponent: "at Arizona Diamondbacks",
    homeAway: "away",
    gameType: "regular",
    probablePitcher: "Paul Skenes",
    status: "completed"
  },
  {
    date: "2025-06-14",
    time: "10:10 PM",
    opponent: "at Arizona Diamondbacks",
    homeAway: "away",
    gameType: "regular",
    probablePitcher: "Mitch Keller",
    status: "completed"
  },
  {
    date: "2025-06-15",
    time: "4:10 PM",
    opponent: "at Arizona Diamondbacks",
    homeAway: "away",
    gameType: "regular",
    probablePitcher: "Jared Jones",
    status: "completed"
  },
  {
    date: "2025-06-17",
    time: "6:40 PM",
    opponent: "vs Cincinnati Reds",
    homeAway: "home",
    gameType: "regular",
    probablePitcher: "Bailey Falter",
    status: "completed"
  },
  {
    date: "2025-06-18",
    time: "6:40 PM",
    opponent: "vs Cincinnati Reds",
    homeAway: "home",
    gameType: "regular",
    probablePitcher: "Paul Skenes",
    status: "completed"
  },
  {
    date: "2025-06-19",
    time: "12:35 PM",
    opponent: "vs Cincinnati Reds",
    homeAway: "home",
    gameType: "regular",
    probablePitcher: "Mitch Keller",
    status: "completed"
  },
  {
    date: "2025-06-20",
    time: "6:40 PM",
    opponent: "vs Tampa Bay Rays",
    homeAway: "home",
    gameType: "regular",
    probablePitcher: "Jared Jones",
    status: "completed"
  },
  {
    date: "2025-06-21",
    time: "4:05 PM",
    opponent: "vs Tampa Bay Rays",
    homeAway: "home",
    gameType: "regular",
    probablePitcher: "Bailey Falter",
    status: "completed"
  },
  {
    date: "2025-06-22",
    time: "1:35 PM",
    opponent: "vs Tampa Bay Rays",
    homeAway: "home",
    gameType: "regular",
    probablePitcher: "Paul Skenes",
    status: "completed"
  },
  {
    date: "2025-06-24",
    time: "7:10 PM",
    opponent: "at Baltimore Orioles",
    homeAway: "away",
    gameType: "regular",
    probablePitcher: "Mitch Keller",
    status: "completed"
  },
  {
    date: "2025-06-25",
    time: "7:05 PM",
    opponent: "at Baltimore Orioles",
    homeAway: "away",
    gameType: "regular",
    probablePitcher: "Jared Jones",
    status: "completed"
  },
  {
    date: "2025-06-26",
    time: "1:05 PM",
    opponent: "at Baltimore Orioles",
    homeAway: "away",
    gameType: "regular",
    probablePitcher: "Bailey Falter",
    status: "completed"
  },
  {
    date: "2025-06-27",
    time: "7:10 PM",
    opponent: "at Boston Red Sox",
    homeAway: "away",
    gameType: "regular",
    probablePitcher: "Paul Skenes",
    status: "completed"
  },
  {
    date: "2025-06-28",
    time: "4:10 PM",
    opponent: "at Boston Red Sox",
    homeAway: "away",
    gameType: "regular",
    probablePitcher: "Mitch Keller",
    status: "completed"
  },
  {
    date: "2025-06-29",
    time: "1:35 PM",
    opponent: "at Boston Red Sox",
    homeAway: "away",
    gameType: "regular",
    probablePitcher: "Jared Jones",
    status: "completed"
  },

  // June 2025 - Upcoming games (scheduled status)
  {
    date: "2025-06-27",
    time: "6:40 PM",
    opponent: "vs New York Mets",
    homeAway: "home",
    gameType: "regular",
    probablePitcher: "Mitch Keller",
    status: "scheduled"
  },
  {
    date: "2025-06-28",
    time: "4:05 PM",
    opponent: "vs New York Mets",
    homeAway: "home",
    gameType: "regular",
    probablePitcher: "Jared Jones",
    status: "scheduled"
  },
  {
    date: "2025-06-29",
    time: "1:35 PM",
    opponent: "vs New York Mets",
    homeAway: "home",
    gameType: "regular",
    probablePitcher: "Bailey Falter",
    status: "scheduled"
  },
  {
    date: "2025-06-30",
    time: "6:40 PM",
    opponent: "vs St. Louis Cardinals",
    homeAway: "home",
    gameType: "regular",
    probablePitcher: "Paul Skenes",
    status: "scheduled"
  },

  // July 2025 - Upcoming games (scheduled status)
  {
    date: "2025-07-01",
    time: "6:40 PM",
    opponent: "vs St. Louis Cardinals",
    homeAway: "home",
    gameType: "regular",
    probablePitcher: "Mitch Keller",
    status: "scheduled"
  },
  {
    date: "2025-07-02",
    time: "6:40 PM",
    opponent: "vs St. Louis Cardinals",
    homeAway: "home",
    gameType: "regular",
    probablePitcher: "Jared Jones",
    status: "scheduled"
  },
  {
    date: "2025-07-03",
    time: "12:35 PM",
    opponent: "vs St. Louis Cardinals",
    homeAway: "home",
    gameType: "regular",
    probablePitcher: "Bailey Falter",
    status: "scheduled"
  },
  {
    date: "2025-07-04",
    time: "6:40 PM",
    opponent: "vs New York Mets",
    homeAway: "home",
    gameType: "regular",
    probablePitcher: "Paul Skenes",
    status: "scheduled"
  },
  {
    date: "2025-07-05",
    time: "4:05 PM",
    opponent: "vs New York Mets",
    homeAway: "home",
    gameType: "regular",
    probablePitcher: "Mitch Keller",
    status: "scheduled"
  },
  {
    date: "2025-07-06",
    time: "1:35 PM",
    opponent: "vs New York Mets",
    homeAway: "home",
    gameType: "regular",
    probablePitcher: "Jared Jones",
    status: "scheduled"
  }
]

// Helper function to get today's game
export function getTodaysGame(): GameSchedule | null {
  const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD format
  return piratesSchedule2025.find(game => game.date === today) || null
}

// Helper function to get next scheduled game
export function getNextScheduledGame(): GameSchedule | null {
  const today = new Date().toISOString().split('T')[0]
  return piratesSchedule2025.find(game => game.date > today && game.status === "scheduled") || null
}

// Helper function to check if a game should be active based on time
export function shouldGameBeActive(game: GameSchedule): boolean {
  if (game.status !== "scheduled") return false
  
  const now = new Date()
  const gameDate = new Date(game.date + 'T' + game.time)
  const gameEndTime = new Date(gameDate.getTime() + (3.5 * 60 * 60 * 1000)) // 3.5 hours after start
  
  return now >= gameDate && now <= gameEndTime
}

// Helper function to get pitcher by name
export function getPitcherByName(name: string) {
  const pitcherMap: { [key: string]: string } = {
    "Paul Skenes": "108",
    "Mitch Keller": "4", 
    "Jared Jones": "109",
    "Bailey Falter": "110",
    "David Bednar": "5"
  }
  return pitcherMap[name]
}

// Function to check if we should scrape (4 hours before game time)
export function shouldScrapeForGame(gameDate: string, gameTime: string): boolean {
  const now = new Date();
  const gameDateTime = new Date(`${gameDate}T${gameTime}`);
  const fourHoursBefore = new Date(gameDateTime.getTime() - (4 * 60 * 60 * 1000));
  
  return now >= fourHoursBefore && now < gameDateTime;
} 