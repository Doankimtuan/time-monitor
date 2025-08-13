# Time.fun Creator Monitor

A simple Node.js application that monitors new creators on time.fun and sends notifications via Telegram using the Telegraf library.

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/t9u-kJ?referralCode=LXhvCm)

## Features

- 🔍 Monitor time.fun for new creators
- 🔔 Send notifications via Telegram
- 🖼️ Show creator images and profile info
- 📊 Track statistics about creators
- 🔄 Simple commands to control monitoring

## Setup

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Copy the example.env file to .env:
   ```
   cp example.env .env
   ```
4. Edit the .env file with your Telegram bot token:
   - Get a bot token from [BotFather](https://t.me/botfather)

## Running Locally

```
npm start
```

## Using the Telegram Bot

Once the bot is running, you can interact with it using these commands:

1. `/start` - Welcome message and instructions
2. `/monitor` - Begin monitoring time.fun for new creators
3. `/stop` - Pause the monitoring process
4. `/latest` - Show the most recent creator on time.fun
5. `/status` - Check if monitoring is currently active
6. `/stats` - View how many creators have been tracked so far
7. `/help` - Display all available commands

The bot will automatically send you a notification whenever a new creator appears on time.fun.

## Deployment

This bot can be easily deployed to Railway.com or Vercel. See [RAILWAY.md](RAILWAY.md) for Railway-specific deployment instructions or [DEPLOYMENT.md](DEPLOYMENT.md) for other hosting options.

### Vercel Deployment

1. Deploy to Vercel using the Vercel CLI or by connecting your GitHub repository
2. Set the following environment variables in your Vercel project:
   - `WEBHOOK_URL`: Your Vercel app URL + `/webhook` (e.g., `https://your-app.vercel.app/webhook`)
3. After deployment, the bot will automatically set up the webhook
4. If you encounter issues, use the `/setup` command in Telegram to manually set the webhook

### Troubleshooting Vercel Issues

If you see "Client network socket disconnected before secure TLS connection was established" error:
- This is fixed by using webhook mode instead of polling
- The bot now automatically sets up webhooks for serverless environments
- Use `/setup` command to manually configure the webhook if needed

## License

MIT 