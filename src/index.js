require("dotenv").config();
const { Telegraf } = require("telegraf");
const axios = require("axios");
const http = require("http");

// Log available environment variables (without showing sensitive values)
console.log(
  "Environment variables available:",
  Object.keys(process.env)
    .filter((key) => !key.includes("TOKEN"))
    .join(", ")
);

// Environment variables with validation and fallbacks
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
// We also check for common variations in case Railway sets it differently
const FALLBACK_TOKEN =
  process.env.TELEGRAM_TOKEN ||
  process.env.BOT_TOKEN ||
  process.env.TGBOT_TOKEN;

// Use token or fallback
const BOT_TOKEN = TELEGRAM_BOT_TOKEN || FALLBACK_TOKEN;

// Validate bot token exists
if (!BOT_TOKEN) {
  console.error(
    "ERROR: TELEGRAM_BOT_TOKEN is missing. Please set it in your .env file or environment variables."
  );
  console.error(
    "Available environment variables:",
    Object.keys(process.env)
      .filter((key) => !key.includes("TOKEN"))
      .join(", ")
  );
  process.exit(1);
}

// Initialize Telegram Bot with proper error handling
console.log("Initializing bot with token (length):", BOT_TOKEN.length);
const bot = new Telegraf(BOT_TOKEN);

// Add middleware to log all incoming messages
bot.use((ctx, next) => {
  console.log(
    "Received message:",
    JSON.stringify(ctx.message || ctx.update, null, 2)
  );
  return next();
});

// Store seen creators
const seenCreators = new Set();
// Track if monitoring is active
let isMonitoringActive = false;
// Store active chat ID
let activeChatId = null;
// Track monitoring intervals
let monitoringInterval = null;
// Store the most recent creator
let latestCreator = null;

// Welcome message on first interaction (/start)
bot.start((ctx) => {
  console.log("Received /start command");
  try {
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
        "Welcome to Time.fun Monitor Bot!\n\n" +
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
  try {
    // Get the latest creator data from the API
    const latestCreatorData = await getLatestCreator();

    if (latestCreatorData && latestCreatorData.solanaAddress) {
      try {
        // The correct API endpoint format might be different
        // For now, just use the basic creator info

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

        // Send the enhanced creator info
        const message = `🆕 Latest Creator:\n\n👤 ${verifiedBadge}Username: ${
          latestCreatorData.username || "N/A"
        }${priceInfo}${changeInfo}${timeInfo}\n💼 Solana Address: ${
          latestCreatorData.solanaAddress || "N/A"
        }\n\n🔗 Link: https://time.fun/${latestCreatorData.username}`;

        // Send message with image if available
        if (latestCreatorData.image) {
          await ctx
            .replyWithPhoto(
              { url: latestCreatorData.image },
              { caption: message }
            )
            .then(() => {
              console.log(
                "Successfully sent latest creator message with image"
              );
            })
            .catch((error) => {
              console.error("Error sending creator image:", error);
              // Fall back to text-only message if image sending fails
              ctx.reply(message);
            });
        } else {
          ctx
            .reply(message)
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
        const message = `🆕 Latest Creator:\n\n👤 Username: ${
          latestCreatorData.username || "N/A"
        }\n💰 Solana Address: ${latestCreatorData.solanaAddress || "N/A"}`;

        ctx
          .reply(message)
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
          "❌ Couldn't fetch the latest creator information. Please try again later."
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
    ctx.reply("❌ Error fetching latest creator. Please try again later.");
  }
});

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

// Monitor command (renamed from start to avoid conflict with bot.start)
bot.command(["monitor", "Monitor", "MONITOR"], (ctx) => {
  console.log("Received /monitor command");
  try {
    activeChatId = ctx.chat.id;

    if (!isMonitoringActive) {
      isMonitoringActive = true;
      ctx
        .reply(
          "🚀 Monitoring started! You will be notified when new creators appear on time.fun"
        )
        .then(() => {
          console.log("Successfully sent monitoring start message");
        })
        .catch((error) => {
          console.error("Error sending monitoring start message:", error);
        });

      console.log(`Monitoring started by chat ID: ${activeChatId}`);

      // Initial fetch
      fetchNewCreators(true);

      // Set up recurring monitoring
      monitoringInterval = setInterval(() => {
        fetchNewCreators(false);
      }, 4000); // Check every 5 seconds
    } else {
      ctx
        .reply("Monitoring is already active!")
        .then(() => {
          console.log("Successfully sent already active message");
        })
        .catch((error) => {
          console.error("Error sending already active message:", error);
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
    if (isMonitoringActive) {
      isMonitoringActive = false;

      // Clear the interval
      if (monitoringInterval) {
        clearInterval(monitoringInterval);
        monitoringInterval = null;
      }

      ctx
        .reply("⏹️ Monitoring stopped. Use /monitor to resume monitoring.")
        .then(() => {
          console.log("Successfully sent monitoring stopped message");
        })
        .catch((error) => {
          console.error("Error sending monitoring stopped message:", error);
        });

      console.log("Monitoring stopped");
    } else {
      ctx
        .reply("Monitoring is not active. Use /monitor to begin monitoring.")
        .then(() => {
          console.log("Successfully sent not active message");
        })
        .catch((error) => {
          console.error("Error sending not active message:", error);
        });
    }
  } catch (error) {
    console.error("Error in stop command:", error);
  }
});

// Status command
bot.command(["status", "Status", "STATUS"], (ctx) => {
  console.log("Received /status command");
  try {
    if (isMonitoringActive) {
      ctx
        .reply("✅ Monitoring is active and running.")
        .then(() => {
          console.log("Successfully sent status active message");
        })
        .catch((error) => {
          console.error("Error sending status active message:", error);
        });
    } else {
      ctx
        .reply("❌ Monitoring is not active. Use /monitor to begin monitoring.")
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
      .reply(`📊 Currently tracking ${seenCreators.size} creators on time.fun`)
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
  }

  ctx
    .reply(
      `I don't understand that command. Try /help to see available commands.`
    )
    .then(() => {
      console.log("Successfully sent unknown command message");
    })
    .catch((error) => {
      console.error("Error sending unknown command message:", error);
    });
});

// Function to fetch new creators
async function fetchNewCreators(isInitialFetch) {
  if (!isMonitoringActive || !activeChatId) return;

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
      creators.forEach((creator) => {
        if (
          creator.creatorAddress &&
          !seenCreators.has(creator.creatorAddress)
        ) {
          // We found a new creator
          seenCreators.add(creator.creatorAddress);

          // Only send messages if this is not the initial fetch
          if (!isInitialFetch) {
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

              // Prepare message
              const message = `🔔 New Creator Alert!\n\n👤 ${verifiedBadge}Username: ${
                creator.username || "N/A"
              }${priceInfo}${changeInfo}${timeInfo}\n💼 Solana Address: ${
                creator.solanaAddress
                  ? `${creator.solanaAddress.substring(
                      0,
                      4
                    )}...${creator.solanaAddress.substring(
                      creator.solanaAddress.length - 4
                    )}`
                  : "N/A"
              }\n\n🔗 Link: https://time.fun/${creator.username}`;

              // Send with image if available
              if (creator.image) {
                bot.telegram
                  .sendPhoto(
                    activeChatId,
                    { url: creator.image },
                    { caption: message }
                  )
                  .then(() => {
                    console.log(
                      `Successfully sent notification for new creator with image: ${
                        creator.username || creator.creatorAddress
                      }`
                    );
                  })
                  .catch((error) => {
                    console.error(
                      "Error sending creator image:",
                      error.message
                    );
                    // Fall back to text-only message
                    bot.telegram.sendMessage(activeChatId, message);
                  });
              } else {
                bot.telegram
                  .sendMessage(activeChatId, message)
                  .then(() => {
                    console.log(
                      `Successfully sent notification for new creator: ${
                        creator.username || creator.creatorAddress
                      }`
                    );
                  })
                  .catch((error) => {
                    console.error(
                      "Error sending Telegram message:",
                      error.message
                    );
                  });
              }
            } catch (error) {
              console.error("Error formatting creator message:", error.message);

              // Fallback to simple message
              const simpleMessage = `🔔 New Creator Alert!\n\n👤 Username: ${
                creator.username || "N/A"
              }\n💼 Solana Address: ${creator.solanaAddress || "N/A"}`;

              bot.telegram
                .sendMessage(activeChatId, simpleMessage)
                .catch((error) =>
                  console.error(
                    "Error sending fallback message:",
                    error.message
                  )
                );
            }
          }

          console.log(
            `New creator found: ${creator.username || creator.creatorAddress}`
          );
        }
      });

      // If this was the initial fetch, send a summary
      if (isInitialFetch) {
        bot.telegram
          .sendMessage(
            activeChatId,
            `✅ Initial scan complete. Tracking ${seenCreators.size} existing creators. You'll be notified when new ones appear.`
          )
          .then(() => {
            console.log("Successfully sent initial scan message");
          })
          .catch((error) => {
            console.error("Error sending initial scan message:", error.message);
          });
      }
    }
  } catch (error) {
    console.error("Error fetching creators data:", error.message);
    // Only log the error, don't stop monitoring
  }
}

// Start the bot with more detailed logging
console.log("Starting Telegram bot...");

// Function to start the bot with retries
async function startBot(maxRetries = 3) {
  let retryCount = 0;

  while (retryCount < maxRetries) {
    try {
      console.log(`Attempt ${retryCount + 1} to start bot...`);

      // Make sure we're using a valid token
      if (!BOT_TOKEN || BOT_TOKEN === "your_telegram_bot_token_here") {
        throw new Error(
          "Invalid bot token. Please check your environment variables."
        );
      }

      await bot.launch({
        // Add webhook info if needed
        // webhook: {
        //  domain: process.env.WEBHOOK_DOMAIN,
        //  port: process.env.PORT || 3000
        // }
      });

      console.log("Telegram bot started successfully!");
      console.log("Use /monitor in the bot chat to begin monitoring");
      return true;
    } catch (err) {
      retryCount++;
      console.error(
        `Failed to start Telegram bot (attempt ${retryCount}/${maxRetries}):`,
        err.message
      );

      if (retryCount >= maxRetries) {
        console.error(
          "Max retries reached. Could not start the bot. Please check your configuration."
        );
        process.exit(1);
      }

      // Wait before retry
      console.log(`Waiting 5 seconds before retry...`);
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }

  return false;
}

// Start the bot
startBot().catch((err) => {
  console.error("Fatal error starting bot:", err);
  process.exit(1);
});

// Handle application termination gracefully
process.on("SIGINT", () => {
  console.log("Stopping bot and application...");
  bot.stop("SIGINT");
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("Stopping bot and application...");
  bot.stop("SIGTERM");
  process.exit(0);
});

// Keep the application running
process.on("uncaughtException", (error) => {
  console.error("Uncaught exception:", error.message);
  // Keep the application running despite errors
});

// Add http server for health checks (keeps Railway from sleeping)
const PORT = process.env.PORT || 3000;

// Create a simple HTTP server for health checks
const server = http.createServer((req, res) => {
  // Health check endpoint
  if (req.url === "/health" || req.url === "/") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        status: "ok",
        service: "Time.fun Monitor Bot",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
      })
    );
  } else {
    res.writeHead(404);
    res.end();
  }
});

// Start HTTP server
server.listen(PORT, () => {
  console.log(`Health check server running on port ${PORT}`);
});
