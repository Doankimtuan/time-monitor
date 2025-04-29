You are an expert Node.js developer.

I need you to create a simple Node.js app with these specifications:

1. Connect to a Telegram bot using the `node-telegram-bot-api` package.
2. Every 2 to 6 seconds (use a random interval), call this API endpoint: `https://time.fun/api/trpc/creators.newTimeMarkets`.
3. The response body has a structure where the creators list is under `result.data.json`.
4. Track creators by `creatorAddress`.
5. Store previously seen creator addresses in memory (no database needed).
6. If a new creator appears (one not seen before):
   - Send a Telegram message to a specific chat with this info:
     - `Username`
     - `Price Per Minute (USD)`
     - `Image URL`
   - Add this new creator to the seen list.
7. If no new creator, do nothing and continue polling silently.
8. Requirements:
   - Handle API call errors without crashing (retry or log errors nicely).
   - Use only necessary packages (`axios`, `node-telegram-bot-api`).
   - Keep the code in **one single file** (e.g., `index.js`).
   - No need for unit tests or complex setup.
   - Make the code simple, clean, and readable.
   - Use dotenv for Telegram Bot Token and Chat ID configuration.
9. Also, suggest a free hosting method such as:
   - cyclic.sh
   - Railway.app
   - Render.com
   - Provide short instructions for deployment after generating the code.

Be sure to:
- Import all required packages.
- Include an example `.env` file content for easy setup.

Output only the final working code, an example `.env` file, and short hosting instructions. 
