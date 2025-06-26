# Telegram Bot Setup Guide

This guide will help you set up Telegram notifications to replace SMS alerts for your Pirates Pitching Monitor.

## Step 1: Create a Telegram Bot

1. **Open Telegram** and search for [@BotFather](https://t.me/botfather)
2. **Start a chat** with BotFather by clicking "Start"
3. **Send the command** `/newbot`
4. **Follow the prompts:**
   - Enter a name for your bot (e.g., "Pirates Pitching Monitor")
   - Enter a username for your bot (must end in "bot", e.g., "pirates_monitor_bot")
5. **Save the bot token** that BotFather gives you (looks like `123456789:ABCdefGhIJKlmNoPQRstuVWxyZ`)

## Step 2: Get Your Chat ID

1. **Start a chat** with your new bot (search for the username you created)
2. **Send any message** to your bot (e.g., "Hello")
3. **Open this URL** in your browser (replace `YOUR_BOT_TOKEN` with your actual token):
   ```
   https://api.telegram.org/botYOUR_BOT_TOKEN/getUpdates
   ```
4. **Find your chat ID** in the response. It will look like:
   ```json
   {
     "ok": true,
     "result": [
       {
         "message": {
           "chat": {
             "id": 123456789,
             "first_name": "Your Name"
           }
         }
       }
     ]
   }
   ```
5. **Copy the chat ID** (the number, e.g., `123456789`)

## Step 3: Configure Environment Variables

1. **Open your `.env.local` file** in your project root
2. **Add these lines** (replace with your actual values):
   ```env
   # Telegram Bot Configuration
   TELEGRAM_BOT_TOKEN=your_bot_token_here
   TELEGRAM_CHAT_ID=your_chat_id_here
   ```
3. **Save the file**

## Step 4: Test the Setup

1. **Start your development server** (if not already running):
   ```bash
   npm run dev
   ```
2. **Go to your dashboard** at `http://localhost:3000`
3. **Click the "Test Telegram" button** in the Probable Pitcher Dashboard
4. **Check your Telegram** - you should receive a test message

## Step 5: Verify Everything Works

You should receive a message like:
```
🧪 Test Notification

✅ Pirates Pitching Monitor is working!
🏴‍☠️ Telegram notifications are active.

Ready for game day monitoring...
```

## Troubleshooting

### If you get "TELEGRAM_BOT_TOKEN not configured":
- Make sure you added the token to your `.env.local` file
- Restart your development server after adding environment variables

### If you get "TELEGRAM_CHAT_ID not configured":
- Make sure you added the chat ID to your `.env.local` file
- Verify the chat ID is correct by checking the getUpdates URL again

### If messages aren't being received:
- Make sure you started a chat with your bot
- Check that your bot token is correct
- Verify your chat ID is correct

### If you get API errors:
- Check the browser console for detailed error messages
- Make sure your bot token is valid
- Ensure your chat ID is a number, not a string

## What You'll Receive

Once set up, you'll get these types of notifications:

1. **Game Start Alerts** - When a Pirates game begins
2. **Pitch Anomaly Alerts** - When pitchers show significant velocity drops
3. **Game End Notifications** - When games finish
4. **Test Messages** - When you manually test the system

## Security Notes

- Keep your bot token private - don't share it publicly
- The bot token allows anyone to send messages through your bot
- Consider using different bots for different environments (dev/prod)

## Next Steps

Once Telegram is working:
1. You can disable SMS notifications by commenting out the SMS code
2. The system will automatically use Telegram for all notifications
3. You can customize the message formats in `lib/telegram.ts` 

DEBUG TELEGRAM ENV: { TELEGRAM_BOT_TOKEN: ..., TELEGRAM_CHAT_ID: ... } 