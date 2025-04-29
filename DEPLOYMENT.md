# Deployment Guide for Time.fun Monitor Bot

This guide provides detailed instructions for deploying the Time.fun Monitor Bot to various hosting platforms.

## Environment Variables

The bot requires the following environment variable to function:

- `TELEGRAM_BOT_TOKEN`: Your Telegram bot token from BotFather (required)

## Deployment Options

### 1. Railway.app (Recommended)

1. Create an account on [Railway.app](https://railway.app/)
2. Install the Railway CLI or use the web interface
3. Create a new project and connect to your GitHub repository
4. Set up the environment variable:
   - Add `TELEGRAM_BOT_TOKEN` with your bot token

```bash
# Using the Railway CLI
railway login
railway link # Link to your existing project
railway variables set TELEGRAM_BOT_TOKEN=your_token_here
railway up
```

5. Railway will automatically deploy your bot. The free tier includes 500 hours of runtime per month.

### 2. Render.com

1. Create an account on [Render.com](https://render.com/)
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository
4. Configure the deployment:
   - **Name**: Choose a name for your service
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add the environment variable:
   - `TELEGRAM_BOT_TOKEN`: Your bot token
6. Click "Create Web Service"

The free tier on Render includes 750 hours of runtime per month, but your service will spin down after 15 minutes of inactivity.

### 3. Cyclic.sh

1. Create an account on [Cyclic.sh](https://cyclic.sh/)
2. Connect your GitHub account
3. Choose your repository
4. Add environment variable:
   - `TELEGRAM_BOT_TOKEN`: Your bot token
5. Deploy your app

Cyclic's free tier is generous and doesn't have the same sleep limitations as some other platforms.

### 4. Using Docker

You can also deploy the bot using Docker:

```bash
# Build the Docker image
docker build -t time-fun-bot .

# Run the Docker container
docker run -d --name time-fun-bot \
  -e TELEGRAM_BOT_TOKEN=your_token_here \
  time-fun-bot
```

## Troubleshooting

### Bot Not Starting

If you see the error "Bot Token is required", check:

1. Your environment variables are correctly set
2. Your token is valid (try using the token to access https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/getMe)
3. There are no extra spaces in your token value

### Connection Issues

If the bot connects but isn't responding to commands:

1. Make sure your bot is added to the chat you're testing in
2. Send the /start command to initialize the bot
3. Check the logs for any error messages

For any other issues, check the application logs on your hosting provider. 