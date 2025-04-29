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

This bot can be easily deployed to Railway.com. See [RAILWAY.md](RAILWAY.md) for Railway-specific deployment instructions or [DEPLOYMENT.md](DEPLOYMENT.md) for other hosting options.

## License

MIT 