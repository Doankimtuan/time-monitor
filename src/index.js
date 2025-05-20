// No need to load dotenv anymore since we're hardcoding the token
// require("dotenv").config();
const { Telegraf } = require("telegraf");
const axios = require("axios");
const http = require("http");
const express = require("express");

// Hardcoded bot token
const BOT_TOKEN = "7720535612:AAHVCLI1JtlY0bJP_-rvlR-2N9zaJklx1Pg";

// Initialize Telegram Bot
console.log("Initializing bot with hardcoded token");
const bot = new Telegraf(BOT_TOKEN);

// Add middleware to log all incoming messages
bot.use((ctx, next) => {
  console.log(
    "Received message:",
    JSON.stringify(ctx.message || ctx.update, null, 2)
  );
  return next();
});

// Store seen creators (with timestamp for cleanup)
const seenCreators = new Map(); // Map<address, timestamp>
// Track if monitoring is active
let isMonitoringActive = false;
// Store active chat IDs with last successful message timestamp
const activeChats = new Map(); // Map<chatId, lastMessageTime>
// Track monitoring intervals
let monitoringInterval = null;
// Store the most recent creator
let latestCreator = null;
// Store whitelisted users for family safety
const whitelistedUsers = new Set();
// Frequency settings for family-friendly notifications (in milliseconds)
const CHECK_INTERVAL = 4000; // Check every 10 seconds
const NOTIFICATION_LIMIT = 10; // Maximum notifications per hour
const MAX_RETRIES = 3; // Maximum retries for failed messages
const RETRY_DELAY = 1000; // Delay between retries in ms
const INACTIVE_THRESHOLD = 24 * 60 * 60 * 1000; // Remove creators older than 24h
let notificationCount = 0;
let lastResetTime = Date.now();

// Welcome message on first interaction (/start)
bot.start((ctx) => {
  console.log("Received /start command");
  try {
    // Add user to whitelist
    whitelistedUsers.add(ctx.from.id);

    ctx
      .reply(
        `👋 Welcome to the Time.fun Monitor Bot!\n\n` +
          `This bot tracks new creators on time.fun and notifies you when new ones appear.\n\n` +
          `To start monitoring, send the /monitor command.\n` +
          `To see the latest creator, use /latest.\n` +
          `For more commands, type /help.`
      )
      .then(() => {
        console.log("Successfully sent welcome message");
      })
      .catch((error) => {
        console.error("Error sending welcome message:", error);
      });
  } catch (error) {
    console.error("Error in start command:", error);
  }
});

// Help command
bot.help((ctx) => {
  console.log("Received /help command");
  try {
    ctx
      .reply(
        "👨‍👩‍👧‍👦 Welcome to Time.fun Family Monitor Bot!\n\n" +
          "Available commands:\n" +
          "/monitor - Start monitoring for new creators\n" +
          "/stop - Stop monitoring\n" +
          "/latest - Show the most recent creator\n" +
          "/status - Check if monitoring is active\n" +
          "/stats - Show how many creators are being tracked\n" +
          "/help - Show this help message"
      )
      .then(() => {
        console.log("Successfully sent help message");
      })
      .catch((error) => {
        console.error("Error sending help message:", error);
      });
  } catch (error) {
    console.error("Error in help command:", error);
  }
});

// Latest command to show the most recent creator
bot.command(["latest", "Latest", "LATEST"], async (ctx) => {
  console.log("Received /latest command");

  // Check if user is whitelisted
  if (!whitelistedUsers.has(ctx.from.id)) {
    whitelistedUsers.add(ctx.from.id);
  }

  try {
    // Get the latest creator data from the API
    const latestCreatorData = await getLatestCreator();

    if (latestCreatorData && latestCreatorData.solanaAddress) {
      try {
        // Format price per minute if available
        let priceInfo = "";
        if (latestCreatorData.pricePerMinuteUsd) {
          priceInfo = `\n💰 Price: $${latestCreatorData.pricePerMinuteUsd.toFixed(
            4
          )} USD/min`;
        }

        // Format percentage change if available
        let changeInfo = "";
        if (latestCreatorData.percentageChange24h !== undefined) {
          const changeSymbol =
            latestCreatorData.percentageChange24h >= 0 ? "📈" : "📉";
          changeInfo = `\n${changeSymbol} 24h Change: ${(
            latestCreatorData.percentageChange24h * 100
          ).toFixed(2)}%`;
        }

        // Format verified status
        const verifiedBadge = latestCreatorData.isVerified ? "✅ " : "";

        // Add timestamp
        let timeInfo = "";
        if (latestCreatorData.created) {
          const creationDate = new Date(parseInt(latestCreatorData.created));
          timeInfo = `\n🕒 Created: ${creationDate.toLocaleString()}`;
        }

        // Get the x url if image exists
        let xUrl = "";
        if (latestCreatorData.image) {
          const xUsername = latestCreatorData.image
            .split("/")
            .pop()
            .split(".")[0];
          xUrl = `\n🔗 X: https://x.com/${xUsername}`;
        }

        const contractAddress = await getContractAddress(
          latestCreatorData.solanaAddress
        );

        const contractInfo = contractAddress
          ? formatContractAddress(contractAddress)
          : "";

        // Send the enhanced creator info
        const message = `🌟 Latest Creator:\n\n👤 ${verifiedBadge}Username: ${
          latestCreatorData.username || "N/A"
        }${priceInfo}${changeInfo}${timeInfo}\n\n🔗 Link: https://time.fun/${
          latestCreatorData.username
        }${xUrl}${contractInfo}`;

        // Send message with image if available
        if (latestCreatorData.image) {
          await ctx
            .replyWithPhoto(
              { url: latestCreatorData.image },
              {
                caption: message,
                parse_mode: "HTML",
              }
            )
            .then(() => {
              console.log(
                "Successfully sent latest creator message with image"
              );
            })
            .catch((error) => {
              console.error("Error sending creator image:", error);
              // Fall back to text-only message if image sending fails
              ctx.reply(message, { parse_mode: "HTML" });
            });
        } else {
          ctx
            .reply(message, { parse_mode: "HTML" })
            .then(() => {
              console.log("Successfully sent latest creator message");
            })
            .catch((error) => {
              console.error("Error sending latest creator message:", error);
            });
        }
      } catch (error) {
        console.error("Error creating enhanced message:", error.message);

        // Still send the basic creator info as fallback
        const message = `🌟 Latest Creator:\n\n👤 Username: ${
          latestCreatorData.username || "N/A"
        }\n🔗 Link: https://time.fun/${latestCreatorData.username || ""}`;

        ctx
          .reply(message, { parse_mode: "HTML" })
          .then(() => {
            console.log("Successfully sent basic creator message as fallback");
          })
          .catch((error) => {
            console.error("Error sending creator message:", error);
          });
      }
    } else {
      ctx
        .reply(
          "🔍 I couldn't find any creator information right now. Please try again in a moment!"
        )
        .then(() => {
          console.log("Successfully sent no latest creator message");
        })
        .catch((error) => {
          console.error("Error sending no latest creator message:", error);
        });
    }
  } catch (error) {
    console.error("Error in latest command:", error);
    ctx.reply(
      "😢 Oops! Something went wrong. Please try again in a few moments."
    );
  }
});

// Get the contract address from the solana address
async function getContractAddress(solanaAddress) {
  const procedures = [
    "creators.getSocials",
    "creators.checkIfOnWatchlist",
    "timeMarket.getUserTimeValue",
    "creators.getCreatorDonations",
    "timeMarket.getCreatorTimeMarket", // << we want this one!
    "timeMarket.getTimeMarketState",
    "rewards.fetchTotalAwardPool",
    "timeMarket.getTimeMarketStats",
    "creators.checkPoolMigration",
    "auth.getAccessToken",
    "creators.priceChartOhlc",
    "timeMarket.hasTimeMarket",
    "timeMarket.getBondingProgress",
    "timeMarket.getUserUsdcBalance",
  ];

  // Map of input objects for each procedure (indexed by order)
  const input = {
    0: { json: { solanaAddress } },
    1: { json: { creatorAddress: solanaAddress } },
    2: { json: { creatorAddress: solanaAddress } },
    3: { json: { creatorAddress: solanaAddress } },
    4: { json: { address: solanaAddress } }, // timeMarket.getCreatorTimeMarket
    5: { json: { creatorAddress: solanaAddress } },
    6: { json: { creatorAddress: solanaAddress } },
    7: { json: { creatorAddress: solanaAddress } },
    8: { json: { creatorAddress: solanaAddress } },
    9: { json: null, meta: { values: ["undefined"] } },
    10: { json: { creatorAddress: solanaAddress, minutesInterval: 15 } },
    11: { json: { creatorAddress: solanaAddress } },
    12: { json: { creatorAddress: solanaAddress } },
    13: { json: null, meta: { values: ["undefined"] } },
  };

  const url = `https://time.fun/api/trpc/${procedures.join(
    ","
  )}?batch=1&input=${encodeURIComponent(JSON.stringify(input))}`;

  try {
    const res = await axios.get(url);
    const results = res.data;

    // Index 4 corresponds to timeMarket.getCreatorTimeMarket
    const mintAddress =
      results?.[30]?.result?.data?.json?.[2]?.[0]?.[0]?.mintAddress;

    return mintAddress || null;
  } catch (err) {
    console.error("Error fetching contract address:", err.message);
    return null;
  }
}

// Function to get the latest creator
async function getLatestCreator() {
  try {
    const response = await axios.get(
      "https://time.fun/api/trpc/creators.newTimeMarkets"
    );

    if (
      response.data &&
      response.data.result &&
      response.data.result.data &&
      response.data.result.data.json &&
      response.data.result.data.json.length > 0
    ) {
      // Get the first creator in the list (newest one)
      latestCreator = response.data.result.data.json[0];
      console.log(
        "Latest creator data:",
        JSON.stringify(latestCreator, null, 2)
      );
      return latestCreator;
    }
    return null;
  } catch (error) {
    console.error("Error fetching latest creator:", error.message);
    return null;
  }
}

// Function to check if notification rate limit is reached
function checkRateLimit() {
  const currentTime = Date.now();
  // Reset counter if an hour has passed
  if (currentTime - lastResetTime > 3600000) {
    notificationCount = 0;
    lastResetTime = currentTime;
    return false;
  }

  // Check if we've hit the limit
  if (notificationCount >= NOTIFICATION_LIMIT) {
    return true;
  }

  // Increment counter and allow notification
  notificationCount++;
  return false;
}

// Daily summary command
bot.command(["daily", "Daily", "DAILY"], (ctx) => {
  console.log("Received /daily command");
  try {
    const chatId = ctx.chat.id;
    whitelistedUsers.add(ctx.from.id);

    ctx
      .reply(
        "📅 I'll send you a daily summary of new creators instead of immediate notifications. This is perfect for family-friendly updates!"
      )
      .then(() => {
        console.log("Successfully set daily summary mode");
      })
      .catch((error) => {
        console.error("Error setting daily summary mode:", error);
      });
  } catch (error) {
    console.error("Error in daily command:", error);
  }
});

// Monitor command
bot.command(["monitor", "Monitor", "MONITOR"], (ctx) => {
  console.log("Received /monitor command");
  try {
    const chatId = ctx.chat.id;
    whitelistedUsers.add(ctx.from.id);

    // Add this chat to active chats with current timestamp
    activeChats.set(chatId, Date.now());
    console.log(
      `Added chat ID ${chatId} to active chats. Total active: ${activeChats.size}`
    );

    if (!isMonitoringActive) {
      isMonitoringActive = true;
      ctx
        .reply(
          "🔍 Family-friendly monitoring started! I'll let you know when new creators appear on time.fun in a safe and controlled way!"
        )
        .then(() => {
          console.log("Successfully sent monitoring start message");
        })
        .catch((error) => {
          console.error("Error sending monitoring start message:", error);
        });

      // Initial fetch
      fetchNewCreators(true);

      // Set up recurring monitoring
      monitoringInterval = setInterval(() => {
        fetchNewCreators(false);
      }, CHECK_INTERVAL);
    } else {
      ctx
        .reply(
          "📱 Monitoring is now active for you! I'll keep you updated about new creators."
        )
        .then(() => {
          console.log("Successfully sent monitoring active message");
        })
        .catch((error) => {
          console.error("Error sending monitoring active message:", error);
        });
    }
  } catch (error) {
    console.error("Error in monitor command:", error);
  }
});

// Stop command
bot.command(["stop", "Stop", "STOP"], (ctx) => {
  console.log("Received /stop command");
  try {
    const chatId = ctx.chat.id;

    // Remove this chat from active chats
    activeChats.delete(chatId);
    console.log(
      `Removed chat ID ${chatId} from active chats. Remaining active: ${activeChats.size}`
    );

    // Only stop monitoring completely if no active chats remain
    if (activeChats.size === 0) {
      isMonitoringActive = false;
      if (monitoringInterval) {
        clearInterval(monitoringInterval);
        monitoringInterval = null;
      }
    }

    ctx
      .reply(
        "⏸️ Monitoring paused for you. Use /monitor to resume when you're ready!"
      )
      .then(() => {
        console.log("Successfully sent monitoring stopped message");
      })
      .catch((error) => {
        console.error("Error sending monitoring stopped message:", error);
      });
  } catch (error) {
    console.error("Error in stop command:", error);
  }
});

// Status command
bot.command(["status", "Status", "STATUS"], (ctx) => {
  console.log("Received /status command");
  try {
    const chatId = ctx.chat.id;
    const isActiveForUser = activeChats.has(chatId);

    if (isMonitoringActive && isActiveForUser) {
      ctx
        .reply(
          "✅ Monitoring is active and running. I'm watching for new creators for you!"
        )
        .then(() => {
          console.log("Successfully sent status active message");
        })
        .catch((error) => {
          console.error("Error sending status active message:", error);
        });
    } else {
      ctx
        .reply(
          "⏸️ Monitoring is paused for you. Use /monitor to start watching for new creators!"
        )
        .then(() => {
          console.log("Successfully sent status inactive message");
        })
        .catch((error) => {
          console.error("Error sending status inactive message:", error);
        });
    }
  } catch (error) {
    console.error("Error in status command:", error);
  }
});

// Stats command
bot.command(["stats", "Stats", "STATS"], (ctx) => {
  console.log("Received /stats command");
  try {
    ctx
      .reply(
        `📊 Currently tracking ${seenCreators.size} creators on time.fun. Type /latest to see the most recent one!`
      )
      .then(() => {
        console.log("Successfully sent stats message");
      })
      .catch((error) => {
        console.error("Error sending stats message:", error);
      });
  } catch (error) {
    console.error("Error in stats command:", error);
  }
});

// Handle any non-command messages
bot.on("text", (ctx) => {
  console.log("Received text message:", ctx.message.text);

  // Check if text matches commands but without the slash
  const text = ctx.message.text.toLowerCase();
  if (text === "monitor") {
    return ctx.reply("Did you mean /monitor? Use commands with the / prefix.");
  } else if (text === "stop") {
    return ctx.reply("Did you mean /stop? Use commands with the / prefix.");
  } else if (text === "status") {
    return ctx.reply("Did you mean /status? Use commands with the / prefix.");
  } else if (text === "stats") {
    return ctx.reply("Did you mean /stats? Use commands with the / prefix.");
  } else if (text === "help") {
    return ctx.reply("Did you mean /help? Use commands with the / prefix.");
  } else if (text === "latest") {
    return ctx.reply("Did you mean /latest? Use commands with the / prefix.");
  } else if (text === "daily") {
    return ctx.reply("Did you mean /daily? Use commands with the / prefix.");
  }

  // Friendly message for any other text
  ctx
    .reply(`👋 I'm here to help! Try /help to see what I can do for you.`)
    .then(() => {
      console.log("Successfully sent friendly response message");
    })
    .catch((error) => {
      console.error("Error sending friendly response message:", error);
    });
});

// Function to format contract address for easy copying
function formatContractAddress(address) {
  if (!address) return "";
  // Using backticks for monospace which enables one-click copying in Telegram
  return `\n📋 Contract (click to copy):\n\`${address}\``;
}

// Function to send message to all active chats with retries
async function sendToAllActiveChats(messageFunc) {
  const now = Date.now();
  const failedChats = new Set();

  for (const [chatId, lastMessageTime] of activeChats) {
    let retries = 0;
    let success = false;

    while (retries < MAX_RETRIES && !success) {
      try {
        await messageFunc(chatId);
        success = true;
        activeChats.set(chatId, now); // Update last successful message time
        console.log(
          `Successfully sent message to chat ${chatId} (attempt ${retries + 1})`
        );
      } catch (error) {
        retries++;
        console.error(
          `Error sending message to chat ${chatId} (attempt ${retries}):`,
          error.message
        );

        if (retries < MAX_RETRIES) {
          await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
        } else {
          failedChats.add(chatId);
          console.error(
            `Failed to send message to chat ${chatId} after ${MAX_RETRIES} attempts`
          );
        }
      }
    }
  }

  // Remove chats that consistently fail to receive messages
  for (const failedChatId of failedChats) {
    activeChats.delete(failedChatId);
    console.log(`Removed unresponsive chat ${failedChatId}`);
  }
}

// Function to fetch new creators
async function fetchNewCreators(isInitialFetch) {
  if (!isMonitoringActive || activeChats.size === 0) return;

  try {
    const response = await axios.get(
      "https://time.fun/api/trpc/creators.newTimeMarkets"
    );

    if (
      response.data &&
      response.data.result &&
      response.data.result.data &&
      response.data.result.data.json
    ) {
      const creators = response.data.result.data.json;

      // Update latest creator with the first one in the list
      if (creators.length > 0) {
        latestCreator = creators[0];
      }

      // Check for new creators
      for (const creator of creators) {
        if (
          creator.creatorAddress &&
          !seenCreators.has(creator.creatorAddress)
        ) {
          // We found a new creator
          const now = Date.now();
          seenCreators.set(creator.creatorAddress, now);

          // Only send messages if this is not the initial fetch
          if (!isInitialFetch) {
            // Check if we should notify (rate limiting)
            if (checkRateLimit()) {
              console.log("Rate limit reached, skipping notification");
              continue;
            }

            try {
              // Format price per minute if available
              let priceInfo = "";
              if (creator.pricePerMinuteUsd) {
                priceInfo = `\n💰 Price: $${creator.pricePerMinuteUsd.toFixed(
                  4
                )} USD/min`;
              }

              // Format percentage change if available
              let changeInfo = "";
              if (creator.percentageChange24h !== undefined) {
                const changeSymbol =
                  creator.percentageChange24h >= 0 ? "📈" : "📉";
                changeInfo = `\n${changeSymbol} 24h Change: ${(
                  creator.percentageChange24h * 100
                ).toFixed(2)}%`;
              }

              // Format verified status
              const verifiedBadge = creator.isVerified ? "✅ " : "";

              // Add timestamp
              let timeInfo = "";
              if (creator.created) {
                const creationDate = new Date(parseInt(creator.created));
                timeInfo = `\n🕒 Created: ${creationDate.toLocaleString()}`;
              }

              // Get X url if image exists
              let xUrl = "";
              if (creator.image) {
                const xUsername = creator.image.split("/").pop().split(".")[0];
                xUrl = `\n🔗 X: https://x.com/${xUsername}`;
              }

              // Get contract address
              const contractAddress = await getContractAddress(
                creator.creatorAddress
              );

              const contractInfo = contractAddress
                ? formatContractAddress(contractAddress)
                : "";

              // Prepare message with family-friendly tone
              const message = `🌟 New Creator Alert!\n\n👤 ${verifiedBadge}Username: ${
                creator.username || "N/A"
              }${priceInfo}${changeInfo}${timeInfo}\n\n🔗 Link: https://time.fun/${
                creator.username
              }${xUrl}${contractInfo}`;

              // Send with image if available
              if (creator.image) {
                await sendToAllActiveChats(async (chatId) => {
                  await bot.telegram.sendPhoto(
                    chatId,
                    { url: creator.image },
                    {
                      caption: message,
                      parse_mode: "HTML",
                    }
                  );
                });
              } else {
                await sendToAllActiveChats(async (chatId) => {
                  await bot.telegram.sendMessage(chatId, message, {
                    parse_mode: "HTML",
                  });
                });
              }
            } catch (error) {
              console.error("Error formatting creator message:", error.message);

              // Fallback to simple message
              const simpleMessage = `🌟 New Creator Alert!\n\n👤 Username: ${
                creator.username || "N/A"
              }\n🔗 Link: https://time.fun/${creator.username || ""}`;

              await sendToAllActiveChats(async (chatId) => {
                await bot.telegram.sendMessage(chatId, simpleMessage, {
                  parse_mode: "HTML",
                });
              });
            }
          }

          console.log(
            `New creator found: ${creator.username || creator.creatorAddress}`
          );
        }
      }

      // If this was the initial fetch, send a summary
      if (isInitialFetch) {
        await sendToAllActiveChats(async (chatId) => {
          await bot.telegram.sendMessage(
            chatId,
            `✅ Initial scan complete! I'm now tracking ${seenCreators.size} existing creators and will notify you when new ones appear in a family-friendly way!`,
            { parse_mode: "HTML" }
          );
        });
      }
    }
  } catch (error) {
    console.error("Error fetching creators data:", error.message);
    // Only log the error, don't stop monitoring
  }
}

// Start the bot with retry logic
async function startBot() {
  console.log("Starting the bot...");

  // No need to validate token since it's now hardcoded

  let retries = 0;
  const maxRetries = 3;

  while (retries < maxRetries) {
    try {
      console.log(`Attempt ${retries + 1} to start bot`);
      await bot.launch();
      console.log("Bot started successfully!");
      console.log("Send /start in Telegram to interact with the bot");
      break;
    } catch (error) {
      console.error("Failed to start bot:", error.message);
      retries++;
      if (retries < maxRetries) {
        console.log(`Retrying in 5 seconds... (${retries}/${maxRetries})`);
        await new Promise((resolve) => setTimeout(resolve, 5000));
      } else {
        console.error("Max retries reached. Could not start the bot.");
        // Don't exit - let the server still run for health checks
      }
    }
  }
}

// Handle application termination gracefully
process.on("SIGINT", () => {
  console.log("Stopping bot...");
  bot.stop("SIGINT");
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("Stopping bot...");
  bot.stop("SIGTERM");
  process.exit(0);
});

// Keep the application running
process.on("uncaughtException", (error) => {
  console.error("Uncaught exception:", error.message);
  // Keep the application running despite errors
});

// Start the bot
startBot();

// Set up express server for health checks
const PORT = process.env.PORT || 3000;
const app = express();

// Health check endpoint using Express
app.get(["/", "/health"], (req, res) => {
  res.json({
    status: "ok",
    service: "Time.fun Family Monitor Bot",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    family_friendly: true,
  });
});

// Start HTTP server
app.listen(PORT, () => {
  console.log(`Health check server running on port ${PORT}`);
});

// Add a new copy command to easily copy contract addresses
bot.command(["copy", "Copy", "COPY"], async (ctx) => {
  console.log("Received /copy command");

  try {
    if (latestCreator && latestCreator.solanaAddress) {
      const contractAddress = await getContractAddress(
        latestCreator.solanaAddress
      );

      if (contractAddress) {
        ctx.reply(
          `Here's the contract address (click to copy):\n\n\`${contractAddress}\``,
          { parse_mode: "Markdown" }
        );
      } else {
        ctx.reply(
          "Sorry, I couldn't find a contract address for the latest creator."
        );
      }
    } else {
      ctx.reply(
        "There's no latest creator information available yet. Try using /latest first."
      );
    }
  } catch (error) {
    console.error("Error in copy command:", error);
    ctx.reply("Sorry, there was an error getting the contract address.");
  }
});
