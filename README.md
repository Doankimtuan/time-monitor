# Time.fun Creator Monitor

A simple Node.js application that monitors new creators on time.fun and sends notifications via Telegram using the Telegraf library.

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

## Deployment Options

### 1. Railway.app (Recommended)

1. Sign up for a free account at [Railway.app](https://railway.app/)
2. Connect your GitHub repository
3. Configure the environment variable (TELEGRAM_BOT_TOKEN)
4. Deploy with default settings

### 2. Render.com

1. Sign up for a free account at [Render.com](https://render.com/)
2. Create a new Web Service
3. Connect your GitHub repository
4. Set the build command to `npm install`
5. Set the start command to `npm start`
6. Add the environment variable
7. Deploy

### 3. Cyclic.sh

1. Sign up for a free account at [Cyclic.sh](https://cyclic.sh/)
2. Connect your GitHub repository
3. Add the environment variable
4. Deploy

Note: Free tiers of these services may have limitations in terms of uptime. For a more reliable service, consider paid plans or other hosting options. 