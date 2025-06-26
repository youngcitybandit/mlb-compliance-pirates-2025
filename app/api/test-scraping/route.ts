import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // Test the scraping endpoint
    const scrapeResponse = await fetch(`${req.nextUrl.origin}/api/scrape-probable-pitchers`);
    const scrapeData = await scrapeResponse.json();
    
    // Test the update endpoint
    const updateResponse = await fetch(`${req.nextUrl.origin}/api/update-probable-pitchers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const updateData = await updateResponse.json();
    
    return NextResponse.json({
      success: true,
      scrapeTest: scrapeData,
      updateTest: updateData,
      testedAt: new Date().toISOString()
    });
    
  } catch (error: any) {
    console.error('Error testing scraping:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
} 