import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

interface ScrapedGame {
  date: string;
  time: string;
  opponent: string;
  homeAway: "home" | "away";
  probablePitcher?: string;
  status: "scheduled" | "active" | "completed";
}

export async function GET(req: NextRequest) {
  try {
    // Scrape the Pirates schedule from MLB.com
    const response = await fetch('https://www.mlb.com/pirates/schedule/2025/fullseason', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch schedule: ${response.status}`);
    }

    const html = await response.text();
    
    // Parse the HTML to extract game information
    const games = parseScheduleHTML(html);
    
    return NextResponse.json({ 
      success: true, 
      games,
      scrapedAt: new Date().toISOString()
    });
    
  } catch (error: any) {
    console.error('Error scraping probable pitchers:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}

function parseScheduleHTML(html: string): ScrapedGame[] {
  const games: ScrapedGame[] = [];
  
  try {
    const $ = cheerio.load(html);
    
    // Look for game rows in the schedule table
    $('.schedule-table tbody tr, .schedule-row, [data-testid*="schedule"]').each((index, element) => {
      const $row = $(element);
      
      // Extract date
      const dateText = $row.find('.date, [data-testid*="date"]').text().trim();
      const timeText = $row.find('.time, [data-testid*="time"]').text().trim();
      const opponentText = $row.find('.opponent, [data-testid*="opponent"]').text().trim();
      const pitcherText = $row.find('.pitcher, [data-testid*="pitcher"], .probable-pitcher').text().trim();
      
      if (dateText && timeText) {
        const game: ScrapedGame = {
          date: parseDate(dateText),
          time: timeText,
          opponent: opponentText || 'TBD',
          homeAway: opponentText?.includes('vs') ? 'home' : 'away',
          probablePitcher: pitcherText || undefined,
          status: 'scheduled'
        };
        
        games.push(game);
      }
    });
    
    // If no games found with the above selectors, try alternative parsing
    if (games.length === 0) {
      return parseAlternativeSchedule($);
    }
    
    return games;
  } catch (error) {
    console.error('Error parsing HTML:', error);
    return [];
  }
}

function parseAlternativeSchedule($: cheerio.CheerioAPI): ScrapedGame[] {
  const games: ScrapedGame[] = [];
  
  // Try to find any text that looks like game information
  const text = $.text();
  
  // Look for patterns like "Jun 27" or "6:40 PM"
  const dateMatches = text.match(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2}/g) || [];
  const timeMatches = text.match(/\d{1,2}:\d{2}\s*[AP]M/g) || [];
  const opponentMatches = text.match(/(vs|at)\s+([A-Za-z\s]+)/g) || [];
  
  // For now, return a basic structure
  // This would need to be enhanced based on the actual HTML structure
  return games;
}

function parseDate(dateText: string): string {
  // Convert date text to YYYY-MM-DD format
  const now = new Date();
  const year = now.getFullYear();
  
  // Handle various date formats
  if (dateText.includes('/')) {
    const [month, day] = dateText.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }
  
  // Handle "Jun 27" format
  const monthMap: { [key: string]: string } = {
    'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04',
    'May': '05', 'Jun': '06', 'Jul': '07', 'Aug': '08',
    'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'
  };
  
  const match = dateText.match(/(\w{3})\s+(\d{1,2})/);
  if (match) {
    const [, month, day] = match;
    return `${year}-${monthMap[month]}-${day.padStart(2, '0')}`;
  }
  
  return dateText;
}

// Function to check if we should scrape (4 hours before game time)
export function shouldScrapeForGame(gameDate: string, gameTime: string): boolean {
  const now = new Date();
  const gameDateTime = new Date(`${gameDate}T${gameTime}`);
  const fourHoursBefore = new Date(gameDateTime.getTime() - (4 * 60 * 60 * 1000));
  
  return now >= fourHoursBefore && now < gameDateTime;
} 