#!/usr/bin/env node

/**
 * Railway.app setup helper
 * This script helps ensure your application is properly set up for Railway deployment
 */

// Load environment variables from .env file if present
require("dotenv").config();

console.log("🚂 Time.fun Monitor - Railway Setup Helper");
console.log("------------------------------------------");

// Check for Node.js version
const nodeVersion = process.version;
console.log(`✅ Node.js version: ${nodeVersion}`);

// Check if we're running in a Railway environment
const isRailway =
  process.env.RAILWAY_SERVICE_ID || process.env.RAILWAY_STATIC_URL;
console.log(`Environment: ${isRailway ? "Railway" : "Local"}`);

// Check environment variables
console.log("Checking environment variables...");
console.log(
  "Available environment variables:",
  Object.keys(process.env).join(", ")
);

// No need to check for TELEGRAM_BOT_TOKEN anymore as it's hardcoded in the source code
console.log("✅ Using hardcoded bot token from source code");

// Check for PORT
if (process.env.PORT) {
  console.log(`✅ PORT is set to ${process.env.PORT}`);
} else {
  console.log("ℹ️ PORT is not set. Will use default port 3000.");
}

// Display success message
console.log(
  "\n✅ Your application appears to be properly configured for Railway."
);
console.log("Starting the main application...\n");

// This script will exit and allow the main app to start
