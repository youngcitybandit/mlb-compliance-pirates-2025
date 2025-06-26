// Telegram notification helper functions

export interface TelegramNotification {
  message: string
  chatId?: string
}

/**
 * Send a Telegram notification
 */
export async function sendTelegramNotification(notification: TelegramNotification): Promise<boolean> {
  try {
    const response = await fetch('/api/notify-telegram', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(notification),
    })

    if (!response.ok) {
      console.error('Failed to send Telegram notification:', await response.text())
      return false
    }

    const result = await response.json()
    return result.success === true
  } catch (error) {
    console.error('Error sending Telegram notification:', error)
    return false
  }
}

/**
 * Send a game start notification
 */
export async function sendGameStartNotification(gameInfo: {
  opponent: string
  time: string
  probablePitcher: string
}): Promise<boolean> {
  const message = `🏴‍☠️ <b>Pirates Game Starting!</b>

⚾ <b>Opponent:</b> ${gameInfo.opponent}
🕐 <b>Time:</b> ${gameInfo.time}
🎯 <b>Probable Pitcher:</b> ${gameInfo.probablePitcher}

<i>Pitch monitoring is now active...</i>`

  return sendTelegramNotification({ message })
}

/**
 * Send a pitch anomaly alert
 */
export async function sendPitchAnomalyAlert(pitchData: {
  pitcherName: string
  pitchType: string
  velocity: number
  previousVelocity: number
  inning: number
}): Promise<boolean> {
  const velocityDrop = pitchData.previousVelocity - pitchData.velocity
  const message = `⚠️ <b>Pitch Anomaly Detected!</b>

🎯 <b>Pitcher:</b> ${pitchData.pitcherName}
⚾ <b>Pitch Type:</b> ${pitchData.pitchType}
📊 <b>Current Velocity:</b> ${pitchData.velocity} mph
📉 <b>Velocity Drop:</b> -${velocityDrop.toFixed(1)} mph
🏟️ <b>Inning:</b> ${pitchData.inning}

<i>Consider checking for potential issues...</i>`

  return sendTelegramNotification({ message })
}

/**
 * Send a game end notification
 */
export async function sendGameEndNotification(gameInfo: {
  opponent: string
  finalScore?: string
}): Promise<boolean> {
  const message = `🏁 <b>Pirates Game Ended</b>

⚾ <b>Opponent:</b> ${gameInfo.opponent}
${gameInfo.finalScore ? `📊 <b>Final Score:</b> ${gameInfo.finalScore}` : ''}

<i>Pitch monitoring stopped.</i>`

  return sendTelegramNotification({ message })
}

/**
 * Send a test notification
 */
export async function sendTestNotification(): Promise<boolean> {
  const message = `🧪 <b>Test Notification</b>

✅ Pirates Pitching Monitor is working!
🏴‍☠️ Telegram notifications are active.

<i>Ready for game day monitoring...</i>`

  return sendTelegramNotification({ message })
} 