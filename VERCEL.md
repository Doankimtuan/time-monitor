# Vercel Deployment Guide

This guide will help you deploy the Time.fun Monitor Bot to Vercel without encountering the "Client network socket disconnected before secure TLS connection was established" error.

## Prerequisites

1. A Vercel account
2. A Telegram bot token from [BotFather](https://t.me/botfather)
3. Your bot's username

## Step 1: Deploy to Vercel

### Option A: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy the project:
   ```bash
   vercel
   ```

### Option B: Deploy via GitHub

1. Push your code to a GitHub repository
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Deploy

## Step 2: Configure Environment Variables

After deployment, go to your Vercel project dashboard and set these environment variables:

1. `WEBHOOK_URL`: Your Vercel app URL + `/webhook`
   - Example: `https://your-app-name.vercel.app/webhook`
   - You can find your app URL in the Vercel dashboard

2. `BOT_TOKEN`: Your Telegram bot token (optional, since it's hardcoded)

## Step 3: Set Up the Webhook

After deployment, you need to tell Telegram where to send updates:

1. Go to your deployed app URL (e.g., `https://your-app.vercel.app`)
2. You should see a health check response
3. Send `/setup` to your bot on Telegram to configure the webhook
4. Or manually set the webhook by visiting: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook?url=https://your-app.vercel.app/webhook`

## Step 4: Test the Bot

1. Send `/start` to your bot
2. Try `/help` to see available commands
3. Use `/latest` to see the most recent creator
4. Use `/monitor` to start monitoring

## Troubleshooting

### "Client network socket disconnected" Error

This error occurs when the bot tries to use polling mode on Vercel. The fix is already implemented:

- The bot now uses webhook mode instead of polling
- Webhooks are automatically configured on startup
- Use `/setup` command to manually configure if needed

### Bot Not Responding

1. Check if the webhook is set correctly:
   ```
   https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getWebhookInfo
   ```

2. Verify your app is accessible:
   ```
   https://your-app.vercel.app/health
   ```

3. Check Vercel function logs for errors

### Webhook Not Working

1. Make sure your `WEBHOOK_URL` environment variable is set correctly
2. Use the `/setup` command in Telegram
3. Check that your Vercel app URL is accessible via HTTPS

## Commands

- `/start` - Welcome message
- `/help` - Show all commands
- `/monitor` - Start monitoring
- `/stop` - Stop monitoring
- `/latest` - Show latest creator
- `/status` - Check monitoring status
- `/stats` - Show statistics
- `/copy` - Copy contract address
- `/setup` - Configure webhook (for debugging)

## Architecture

The bot is designed for serverless environments:

- Uses webhooks instead of polling
- Handles requests through Express endpoints
- Automatically configures webhooks on startup
- Graceful error handling for serverless constraints

## Support

If you encounter issues:

1. Check the Vercel function logs
2. Verify your environment variables
3. Test the webhook manually
4. Use the `/setup` command for debugging
