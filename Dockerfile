FROM node:18-slim

WORKDIR /app

# Copy entire project
COPY . .

# Install dependencies using npm install
RUN npm install --omit=dev

# Start the bot
CMD ["npm", "start"] 