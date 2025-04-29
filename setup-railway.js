#!/usr/bin/env node

/**
 * Railway.app setup helper
 * This script helps ensure your application is properly set up for Railway deployment
 */

console.log("🚂 Time.fun Monitor - Railway Setup Helper");
console.log("------------------------------------------");

// Check for Node.js version
const nodeVersion = process.version;
console.log(`✅ Node.js version: ${nodeVersion}`);

// Check if we're running in a Railway environment
const isRailway =
  process.env.RAILWAY_SERVICE_ID || process.env.RAILWAY_STATIC_URL;
console.log(`Environment: ${isRailway ? "Railway" : "Local"}`);

// Check for TELEGRAM_BOT_TOKEN
if (process.env.TELEGRAM_BOT_TOKEN) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  console.log(`✅ TELEGRAM_BOT_TOKEN found (${token.length} characters)`);

  // Simple validation
  if (token.includes(":") && token.length > 20) {
    console.log("✅ Token format looks valid");
  } else {
    console.log(
      "⚠️ Warning: Token format may be invalid. Expected format: 1234567890:ABCDEF..."
    );
  }
} else {
  console.log(
    "❌ TELEGRAM_BOT_TOKEN not found! The bot will not function without this."
  );
  console.log("Please set this environment variable in your Railway project.");
}

// Check for PORT
if (process.env.PORT) {
  console.log(`✅ PORT is set to ${process.env.PORT}`);
} else {
  console.log("ℹ️ PORT is not set. Will use default port 3000.");
}

// Display success message if everything looks good
if (process.env.TELEGRAM_BOT_TOKEN) {
  console.log(
    "\n✅ Your application appears to be properly configured for Railway."
  );
  console.log("Starting the main application...\n");
} else {
  console.log("\n❌ Your application is missing required configuration.");
  console.log("Please check the messages above to fix the issues.\n");
}

// This script will exit and allow the main app to start
