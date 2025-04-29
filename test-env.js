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

// Note about hardcoded token
console.log("\n✅ Using hardcoded Telegram Bot Token from source code");
console.log(
  "Token is set directly in src/index.js - no environment variable needed"
);

// Check for PORT
if (process.env.PORT) {
  console.log(`\n✅ PORT is set to ${process.env.PORT}`);
} else {
  console.log("\nℹ️ PORT is not set. Will use default port 3000.");
}

console.log("\n======= TEST COMPLETE =======");
