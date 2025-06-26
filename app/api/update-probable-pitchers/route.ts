import { NextRequest, NextResponse } from 'next/server';
import { getTodaysGame, getNextScheduledGame, shouldScrapeForGame } from '@/data/pirates-schedule';

export async function POST(req: NextRequest) {
  try {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    
    // Check if there's a game today or tomorrow that we should scrape for
    const todaysGame = getTodaysGame();
    const nextGame = getNextScheduledGame();
    
    let gamesToCheck = [];
    if (todaysGame) gamesToCheck.push(todaysGame);
    if (nextGame) gamesToCheck.push(nextGame);
    
    const gamesToScrape = gamesToCheck.filter(game => 
      shouldScrapeForGame(game.date, game.time)
    );
    
    if (gamesToScrape.length === 0) {
      return NextResponse.json({ 
        success: true, 
        message: 'No games need scraping at this time',
        checkedAt: now.toISOString()
      });
    }
    
    // Scrape the website for probable pitchers
    const scrapeResponse = await fetch(`${req.nextUrl.origin}/api/scrape-probable-pitchers`);
    const scrapeData = await scrapeResponse.json();
    
    if (!scrapeData.success) {
      throw new Error(`Failed to scrape probable pitchers: ${scrapeData.error}`);
    }
    
    // Update the schedule with scraped data
    const updatedGames = updateScheduleWithScrapedData(gamesToScrape, scrapeData.games);
    
    // Send notifications if probable pitchers have changed
    for (const game of updatedGames) {
      if (game.probablePitcher && game.probablePitcher !== 'TBD') {
        await sendProbablePitcherNotification(game);
      }
    }
    
    return NextResponse.json({ 
      success: true, 
      message: `Updated ${updatedGames.length} games with probable pitchers`,
      updatedGames,
      scrapedAt: now.toISOString()
    });
    
  } catch (error: any) {
    console.error('Error updating probable pitchers:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}

function updateScheduleWithScrapedData(existingGames: any[], scrapedGames: any[]) {
  const updatedGames = [];
  
  for (const existingGame of existingGames) {
    const scrapedGame = scrapedGames.find(sg => 
      sg.date === existingGame.date && sg.time === existingGame.time
    );
    
    if (scrapedGame && scrapedGame.probablePitcher) {
      updatedGames.push({
        ...existingGame,
        probablePitcher: scrapedGame.probablePitcher
      });
    } else {
      updatedGames.push(existingGame);
    }
  }
  
  return updatedGames;
}

async function sendProbablePitcherNotification(game: any) {
  try {
    // Send SMS notification about probable pitcher
    const message = `Probable pitcher updated: ${game.probablePitcher} will start vs ${game.opponent} on ${game.date} at ${game.time}`;
    
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/notify-sms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message })
    });
    
    console.log(`Sent probable pitcher notification: ${message}`);
  } catch (error) {
    console.error('Error sending probable pitcher notification:', error);
  }
} 