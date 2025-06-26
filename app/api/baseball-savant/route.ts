import { NextRequest, NextResponse } from 'next/server';

interface StatcastPitch {
  pitch_type: string;
  release_speed: number;
  release_spin_rate: number;
  pfx_x: number;
  pfx_z: number;
  plate_x: number;
  plate_z: number;
  description: string;
  game_date: string;
  pitcher: number;
  pitcher_name: string;
  inning: number;
  inning_topbot: string;
  outs_when_up: number;
  balls: number;
  strikes: number;
  game_pk: number;
  home_team: string;
  away_team: string;
}

interface GameData {
  game_pk: number;
  game_date: string;
  home_team: string;
  away_team: string;
  home_score: number;
  away_score: number;
  inning: number;
  inning_topbot: string;
  status: string;
  game_time?: string;
}

interface ScheduleData {
  date: string;
  games: {
    time: string;
    opponent: string;
    home_away: 'home' | 'away';
    probable_pitcher?: string;
    status: 'scheduled' | 'active' | 'completed' | 'postponed';
  }[];
}

interface MorningCheckData {
  date: string;
  todaysGames: ScheduleData['games'];
  nextCheckTime: string;
  systemStatus: 'active' | 'standby';
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const gameDate = searchParams.get('game_date') || new Date().toISOString().split('T')[0];
    const gamePk = searchParams.get('game_pk');
    const checkType = searchParams.get('type') || 'live'; // 'morning', 'schedule', 'live', 'pitches'

    if (checkType === 'morning') {
      // 9am EST morning check - determines today's games and sets up tracking
      const morningData = await performMorningCheck(gameDate);
      return NextResponse.json({
        success: true,
        type: 'morning',
        data: morningData,
        scrapedAt: new Date().toISOString()
      });
    }

    if (checkType === 'schedule') {
      // Get today's schedule
      const schedule = await getTodaysSchedule(gameDate);
      return NextResponse.json({
        success: true,
        type: 'schedule',
        data: schedule,
        scrapedAt: new Date().toISOString()
      });
    }

    if (checkType === 'live') {
      // Check if any games are currently live
      const liveGames = await getLiveGames(gameDate);
      return NextResponse.json({
        success: true,
        type: 'live',
        data: liveGames,
        scrapedAt: new Date().toISOString()
      });
    }

    if (checkType === 'pitches' && gamePk) {
      // Get pitch data for a specific game
      const pitches = await fetchPitchData(gamePk);
      return NextResponse.json({
        success: true,
        type: 'pitches',
        data: pitches,
        scrapedAt: new Date().toISOString()
      });
    }

    // Default: return morning check data
    const morningData = await performMorningCheck(gameDate);
    return NextResponse.json({
      success: true,
      type: 'morning',
      data: morningData,
      scrapedAt: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('Error fetching Baseball Savant data:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}

async function performMorningCheck(gameDate: string): Promise<MorningCheckData> {
  try {
    // Get today's schedule
    const schedule = await getTodaysSchedule(gameDate);
    const todaysGames = schedule.games;
    
    // Determine next check time based on games
    let nextCheckTime = '';
    let systemStatus: 'active' | 'standby' = 'standby';
    
    if (todaysGames.length > 0) {
      // Find the earliest game time
      const gameTimes = todaysGames.map(game => parseGameTime(game.time));
      const earliestGame = Math.min(...gameTimes);
      
      // Set activation time to 20 minutes before game time
      const activationTime = earliestGame - 20;
      const now = new Date();
      const currentTime = now.getHours() * 60 + now.getMinutes();
      
      if (currentTime >= activationTime) {
        systemStatus = 'active';
        // Next check in 5 minutes if game is active
        const nextCheck = new Date(now.getTime() + 5 * 60 * 1000);
        nextCheckTime = nextCheck.toLocaleTimeString('en-US', { 
          timeZone: 'America/New_York',
          hour12: true 
        });
      } else {
        // Set next check to 20 minutes before game time
        const nextCheckDate = new Date();
        nextCheckDate.setHours(Math.floor(activationTime / 60), activationTime % 60, 0, 0);
        nextCheckTime = nextCheckDate.toLocaleTimeString('en-US', { 
          timeZone: 'America/New_York',
          hour12: true 
        });
      }
    } else {
      // No games today, next check tomorrow at 9am EST
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(9, 0, 0, 0);
      nextCheckTime = tomorrow.toLocaleTimeString('en-US', { 
        timeZone: 'America/New_York',
        hour12: true 
      });
    }
    
    return {
      date: gameDate,
      todaysGames,
      nextCheckTime,
      systemStatus
    };
  } catch (error) {
    console.error('Error performing morning check:', error);
    return {
      date: gameDate,
      todaysGames: [],
      nextCheckTime: '9:00 AM',
      systemStatus: 'standby'
    };
  }
}

function parseGameTime(gameTime: string): number {
  // Parse game time (assuming format like "7:05 PM" or "1:35 PM")
  const timeMatch = gameTime.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!timeMatch) return 0;
  
  let hour = parseInt(timeMatch[1]);
  const minute = parseInt(timeMatch[2]);
  const period = timeMatch[3].toUpperCase();
  
  // Convert to 24-hour format
  if (period === 'PM' && hour !== 12) hour += 12;
  if (period === 'AM' && hour === 12) hour = 0;
  
  return hour * 60 + minute;
}

async function getTodaysSchedule(gameDate: string): Promise<ScheduleData> {
  try {
    // Use the existing schedule data from pirates-schedule.ts
    const { getTodaysGame, getNextScheduledGame } = await import('@/data/pirates-schedule');
    
    const todaysGame = getTodaysGame();
    const nextGame = getNextScheduledGame();
    
    const games = [];
    
    if (todaysGame) {
      games.push({
        time: todaysGame.time,
        opponent: todaysGame.opponent,
        home_away: todaysGame.homeAway,
        probable_pitcher: todaysGame.probablePitcher,
        status: todaysGame.status
      });
    }
    
    return {
      date: gameDate,
      games
    };
  } catch (error) {
    console.error('Error getting today\'s schedule:', error);
    return {
      date: gameDate,
      games: []
    };
  }
}

async function getLiveGames(gameDate: string): Promise<GameData[]> {
  try {
    // Check if any games are currently live by checking game times
    const schedule = await getTodaysSchedule(gameDate);
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = currentHour * 60 + currentMinute;
    
    const liveGames: GameData[] = [];
    
    for (const game of schedule.games) {
      // Skip cancelled or postponed games
      if (game.status === 'postponed') {
        continue;
      }
      
      const gameTime = parseGameTime(game.time);
      
      // Game is considered "live" if it's within 4 hours of start time
      // and started within the last 4 hours
      const timeDiff = Math.abs(currentTime - gameTime);
      
      if (timeDiff <= 240 && currentTime >= gameTime - 20) { // Within 4 hours and started (with 20 min buffer)
        liveGames.push({
          game_pk: Date.now(), // Mock game PK
          game_date: gameDate,
          home_team: game.home_away === 'home' ? 'Pirates' : game.opponent,
          away_team: game.home_away === 'away' ? 'Pirates' : game.opponent,
          home_score: 0,
          away_score: 0,
          inning: 1,
          inning_topbot: 'top',
          status: 'Live',
          game_time: game.time
        });
      }
    }
    
    return liveGames;
  } catch (error) {
    console.error('Error getting live games:', error);
    return [];
  }
}

async function fetchPitchData(gamePk: string): Promise<StatcastPitch[]> {
  // For now, return mock pitch data since we're not actually connected to live Statcast
  // In production, this would fetch from Baseball Savant's API
  return generateMockPitchData();
}

function generateMockPitchData(): StatcastPitch[] {
  const pitchTypes = ['4-Seam Fastball', 'Slider', 'Changeup', 'Curveball'];
  const descriptions = ['Strike', 'Ball', 'Foul', 'In Play'];
  const pitchers = ['Paul Skenes', 'Mitch Keller', 'Jared Jones'];
  
  const pitches: StatcastPitch[] = [];
  let pitchNum = 1;
  
  for (let inning = 1; inning <= 3; inning++) {
    for (let i = 0; i < 15; i++) {
      const pitch: StatcastPitch = {
        pitch_type: pitchTypes[Math.floor(Math.random() * pitchTypes.length)],
        release_speed: 95 + Math.random() * 5,
        release_spin_rate: 2200 + Math.random() * 300,
        pfx_x: -0.5 + Math.random(),
        pfx_z: 0.5 + Math.random(),
        plate_x: -0.5 + Math.random(),
        plate_z: 2 + Math.random(),
        description: descriptions[Math.floor(Math.random() * descriptions.length)],
        game_date: new Date().toISOString().split('T')[0],
        pitcher: 108,
        pitcher_name: pitchers[Math.floor(Math.random() * pitchers.length)],
        inning,
        inning_topbot: 'top',
        outs_when_up: Math.floor(Math.random() * 3),
        balls: Math.floor(Math.random() * 4),
        strikes: Math.floor(Math.random() * 3),
        game_pk: Date.now(),
        home_team: 'Pirates',
        away_team: 'Reds'
      };
      pitches.push(pitch);
    }
  }
  
  return pitches;
}

// Function to check if it's time to activate game tracking (20 minutes before game time)
export function shouldActivateGameTracking(gameTime: string): boolean {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTime = currentHour * 60 + currentMinute;
  
  const gameTimeMinutes = parseGameTime(gameTime);
  
  // Activate tracking 20 minutes before game time and keep active for 4 hours
  return currentTime >= gameTimeMinutes - 20 && currentTime <= gameTimeMinutes + 240;
}

// Function to check if it's 9am EST for morning schedule check
export function shouldPerformMorningCheck(): boolean {
  const now = new Date();
  const estTime = new Date(now.toLocaleString("en-US", {timeZone: "America/New_York"}));
  const hour = estTime.getHours();
  const minute = estTime.getMinutes();
  
  // Check at 9:00 AM EST (±5 minutes to account for slight timing differences)
  return hour === 9 && minute >= 0 && minute <= 5;
}

async function fetchTodaysPiratesGames(gameDate: string): Promise<GameData[]> {
  // Baseball Savant API endpoint for today's games
  const url = `https://baseballsavant.mlb.com/gf?game_pk=&game_date=${gameDate}&team=134`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'application/json',
        'Referer': 'https://baseballsavant.mlb.com/'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch games: ${response.status}`);
    }

    const data = await response.json();
    return data.games || [];
  } catch (error) {
    console.error('Error fetching today\'s games:', error);
    return [];
  }
}

async function fetchGameData(gamePk: string): Promise<GameData | null> {
  // Fetch specific game data
  const url = `https://baseballsavant.mlb.com/gf?game_pk=${gamePk}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'application/json',
        'Referer': 'https://baseballsavant.mlb.com/'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch game data: ${response.status}`);
    }

    const data = await response.json();
    return data.game || null;
  } catch (error) {
    console.error('Error fetching game data:', error);
    return null;
  }
}

// Function to get Pirates pitcher IDs from Baseball Savant
export async function getPiratesPitchers() {
  const url = 'https://baseballsavant.mlb.com/statcast_search/csv?all=true&hfPT=&hfAB=&hfBBT=&hfPR=&hfZ=&stadium=&hfBBL=&hfNewZones=&hfGT=R%7CPO%7CS%7C&hfC=&hfSea=2025%7C&hfSit=&player_type=pitcher&hfOuts=&opponent=&pitcher_throws=&batter_stands=&hfSA=&game_date_gt=&game_date_lt=&team=134&position=&hfRO=&home_road=&hfFlag=&metric_1=&hfInn=&min_pitches=0&min_results=0&group_by=name&sort_col=pitches&player_event_sort=h_launch_speed&sort_order=desc&min_abs=0&type=details';
  
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/csv',
        'Referer': 'https://baseballsavant.mlb.com/'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch pitchers: ${response.status}`);
    }

    const csvText = await response.text();
    return parsePitchersFromCSV(csvText);
  } catch (error) {
    console.error('Error fetching Pirates pitchers:', error);
    return [];
  }
}

function parsePitchersFromCSV(csvText: string): any[] {
  const lines = csvText.split('\n');
  const headers = lines[0].split(',');
  const pitchers: any[] = [];

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    
    const values = lines[i].split(',');
    const pitcher: any = {};
    
    headers.forEach((header, index) => {
      pitcher[header.trim()] = values[index]?.trim() || '';
    });

    pitchers.push(pitcher);
  }

  return pitchers;
} 