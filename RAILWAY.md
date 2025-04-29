# Railway.com Deployment Guide

Railway offers simple deployment with automatic CI/CD from your GitHub repository.

## Prerequisites

1. A GitHub account with your Time.fun Monitor code
2. Your Telegram Bot Token (from BotFather)
3. A Railway.com account

## Recommended Deployment Method

### 1. Sign up/Login to Railway

Visit [Railway.app](https://railway.app/) and sign up or login with your GitHub account.

### 2. Create a New Project

1. Click on "New Project" on your Railway dashboard
2. Select "Deploy from GitHub repo"
3. Choose your repository containing the Time.fun Monitor code

### 3. Configure Environment Variables

1. Once your project is created, go to the "Variables" tab
2. Add a new variable:
   - Key: `TELEGRAM_BOT_TOKEN`
   - Value: `your_actual_token_here`
3. Click "Add" to save the variable

### The variable should look like this:
```
TELEGRAM_BOT_TOKEN=1234567890:ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789
```

### 4. Configure Deployment Settings

1. Go to the "Settings" tab
2. Ensure the following settings:
   - Root Directory: `/` (default)
   - Build Command: `npm install --omit=dev` (avoid using Dockerfile)
   - Start Command: `npm start` (default)

### 5. Trigger Deployment

1. Railway will automatically start deploying your app
2. You can monitor the deployment in the "Deployments" tab
3. If you need to manually trigger a deployment, click on "Deploy now"

### 6. Verify Deployment

1. Check the deployment logs for any errors
2. Look for the message "Telegram bot started successfully!"
3. Open Telegram and send the `/start` command to your bot
4. Send `/monitor` to begin monitoring

### 7. Configure Railway for 24/7 Operation (Important)

By default, Railway may put your service to sleep after inactivity. To ensure 24/7 operation:

1. Go to project "Settings" 
2. Under "Usage" section, ensure your service doesn't have an inactive timeout 
3. Be aware of Railway's free tier limits (500 hours/month)

## Troubleshooting

### If you see "npm ci --only=production" error:

This error occurs when Railway tries to use the Dockerfile. To fix it:

1. **Disable Dockerfile Detection**:
   - In your Railway project, go to "Settings"
   - Set "Root Directory" to "/"
   - Set build command to `npm install --omit=dev`
   - Set start command to `npm start`
   - Click "Deploy" to deploy with these new settings

2. **Try direct npm commands**:
   - Set Build Command: `npm install --omit=dev`
   - Set Start Command: `node src/index.js`
   - Click "Deploy" to deploy with these commands

### Other Common Issues:

1. Check deployment logs in Railway dashboard for specific errors
2. Verify the `TELEGRAM_BOT_TOKEN` is correct (no extra spaces or quotes)
3. Make sure your bot is added to the chat where you're sending commands
4. Try redeploying the application

For persistent issues, Railway provides a "Connect" terminal option where you can check logs and environment variables. 