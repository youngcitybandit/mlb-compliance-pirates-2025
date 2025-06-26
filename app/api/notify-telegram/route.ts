import { NextRequest, NextResponse } from 'next/server'

interface TelegramMessage {
  message: string
  chatId?: string
}

// Debug log to check environment variables
console.log('DEBUG TELEGRAM ENV:', {
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
  TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID,
});

export async function POST(request: NextRequest) {
  try {
    const body: TelegramMessage = await request.json()
    const { message, chatId } = body

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Get Telegram bot token and chat ID from environment variables
    const botToken = process.env.TELEGRAM_BOT_TOKEN
    const defaultChatId = process.env.TELEGRAM_CHAT_ID

    if (!botToken) {
      return NextResponse.json(
        { error: 'TELEGRAM_BOT_TOKEN not configured' },
        { status: 500 }
      )
    }

    if (!defaultChatId && !chatId) {
      return NextResponse.json(
        { error: 'TELEGRAM_CHAT_ID not configured and no chatId provided' },
        { status: 500 }
      )
    }

    const targetChatId = chatId || defaultChatId

    // Add this log to debug
    console.log('Sending Telegram message:', { botToken, targetChatId, message });

    // Send message via Telegram Bot API
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`
    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: targetChatId,
        text: message,
        parse_mode: 'HTML', // Allows basic HTML formatting
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Telegram API error:', errorData)
      return NextResponse.json(
        { error: 'Failed to send Telegram message', details: errorData },
        { status: 500 }
      )
    }

    const result = await response.json()
    console.log('Telegram message sent successfully:', result)

    return NextResponse.json({
      success: true,
      message: 'Telegram message sent successfully',
      result,
    })
  } catch (error) {
    console.error('Error sending Telegram message:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET endpoint for testing
export async function GET() {
  return NextResponse.json({
    message: 'Telegram notification endpoint is working',
    instructions: 'Send a POST request with { "message": "your message" }',
  })
} 