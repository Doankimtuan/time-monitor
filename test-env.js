#!/usr/bin/env node

/**
 * Environment Variable Diagnostic Tool
 * Run this with: node test-env.js
 */

// Load environment variables
require("dotenv").config();

console.log("======= ENVIRONMENT VARIABLE TEST =======");
console.log("Timestamp:", new Date().toISOString());
console.log("Node.js version:", process.version);

// Check Railway environment
const isRailway =
  process.env.RAILWAY_SERVICE_ID || process.env.RAILWAY_STATIC_URL;
console.log("Running on Railway:", isRailway ? "Yes" : "No");

// List all environment variables (excluding sensitive content)
console.log("\nEnvironment Variables Available:");
const envVars = Object.keys(process.env).sort();
envVars.forEach((key) => {
  if (key.includes("TOKEN") || key.includes("KEY") || key.includes("SECRET")) {
    // Don't show the actual value of sensitive variables
    console.log(`- ${key}: [present, ${process.env[key].length} characters]`);
  } else {
    // Show non-sensitive variables
    console.log(`- ${key}: ${process.env[key]}`);
  }
});

// Check specifically for Telegram token
console.log("\nTelegram Bot Token Check:");
const hasToken = !!process.env.TELEGRAM_BOT_TOKEN;
console.log("TELEGRAM_BOT_TOKEN present:", hasToken);

if (hasToken) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  console.log("Token length:", token.length);
  console.log("Contains colon (:):", token.includes(":"));
  console.log("Starts with number:", /^\d/.test(token));

  // Very basic validation
  if (token.includes(":") && token.length > 20) {
    console.log("Token format appears valid");
  } else {
    console.log("WARNING: Token format may be invalid");
  }
} else {
  console.log("Checking for alternative token variables:");
  const alternatives = ["TELEGRAM_TOKEN", "BOT_TOKEN", "TGBOT_TOKEN"];
  let found = false;

  alternatives.forEach((alt) => {
    if (process.env[alt]) {
      console.log(`- ${alt}: [present, ${process.env[alt].length} characters]`);
      found = true;
    }
  });

  if (!found) {
    console.log("No alternative token variables found.");
  }
}

console.log("\n======= TEST COMPLETE =======");
