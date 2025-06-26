import { NextRequest, NextResponse } from 'next/server';
import { getTodaysGame, getNextScheduledGame } from '@/data/pirates-schedule';
import { getPiratesPitcherIds, getActivePiratesPitcherIds } from '@/data/pirates-roster';

interface StatcastPitch {
  pitchId: string;
  pitcherId: number;
  pitcherName: string;
  inning: number;
  pitchType: string;
  velocity: number;
  spinRate: number;
  result: string;
  timestamp: string;
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
      // Only include if Pirates are home or away (should always be true in our data)
      const isPiratesGame = todaysGame.opponent && (todaysGame.homeAway === 'home' || todaysGame.homeAway === 'away');
      if (isPiratesGame) {
        games.push({
          time: todaysGame.time,
          opponent: todaysGame.opponent,
          home_away: todaysGame.homeAway,
          probable_pitcher: todaysGame.probablePitcher, // Only Pirates pitcher
          status: todaysGame.status
        });
      }
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
  // --- REAL DATA LOGIC (placeholder) ---
  // Uncomment and implement this block when ready to use real Statcast data
  /*
  // 1. Fetch all pitch data for the game from Baseball Savant
  const url = `https://baseballsavant.mlb.com/gf?game_pk=${gamePk}`;
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0',
      'Accept': 'application/json',
      'Referer': 'https://baseballsavant.mlb.com/'
    }
  });
  if (!response.ok) throw new Error(`Failed to fetch pitch data: ${response.status}`);
  const data = await response.json();
  
  // 2. Get active Pirates pitcher IDs (excludes IL players)
  const activePiratesPitcherIds = getActivePiratesPitcherIds();
  
  // 3. Filter to only include pitches thrown by active Pirates pitchers
  const piratesPitches = data.filter((pitch: any) => 
    activePiratesPitcherIds.includes(pitch.pitcher_id)
  );
  
  // 4. Transform to our StatcastPitch format
  return piratesPitches.map((pitch: any) => ({
    pitchId: pitch.pitch_id,
    pitcherId: pitch.pitcher_id,
    pitcherName: pitch.pitcher_name,
    inning: pitch.inning,
    pitchType: pitch.pitch_type,
    velocity: pitch.release_speed,
    spinRate: pitch.release_spin_rate,
    result: pitch.description,
    timestamp: pitch.timestamp
  }));
  */

  // --- MOCK DATA (current implementation) ---
  // For now, return mock data for active Pirates pitchers
  const activePitchers = getActivePiratesPitcherIds();
  
  // Generate mock pitch data for active pitchers only
  const mockPitches: StatcastPitch[] = [];
  const pitchTypes = ['FF', 'SL', 'CH', 'CU', 'SI'];
  const results = ['Ball', 'Strike', 'In Play', 'Foul'];
  
  // Generate 10-20 mock pitches per active pitcher
  activePitchers.forEach(pitcherId => {
    const numPitches = Math.floor(Math.random() * 11) + 10; // 10-20 pitches
    
    for (let i = 0; i < numPitches; i++) {
      const inning = Math.floor(Math.random() * 9) + 1;
      const pitchType = pitchTypes[Math.floor(Math.random() * pitchTypes.length)];
      const velocity = pitchType === 'FF' ? 
        Math.floor(Math.random() * 15) + 85 : // 85-99 mph for fastballs
        Math.floor(Math.random() * 20) + 70;  // 70-89 mph for other pitches
      const spinRate = Math.floor(Math.random() * 2000) + 1500; // 1500-3500 rpm
      
      mockPitches.push({
        pitchId: `mock_${pitcherId}_${i}`,
        pitcherId: pitcherId,
        pitcherName: `Pirates Pitcher ${pitcherId}`, // In real data, this would be the actual name
        inning: inning,
        pitchType: pitchType,
        velocity: velocity,
        spinRate: spinRate,
        result: results[Math.floor(Math.random() * results.length)],
        timestamp: new Date().toISOString()
      });
    }
  });
  
  return mockPitches;
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

// Helper function to get Pirates pitcher IDs
export function getPiratesPitchers(): number[] {
  return getPiratesPitcherIds();
} 