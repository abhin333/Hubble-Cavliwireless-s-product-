FROM node:22-alpine

# Enable corepack to use the built-in pnpm
RUN corepack enable

WORKDIR /app

# Copy lockfile along with package.json for reproducible builds
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install

# Copy the rest of the application source code
COPY . .

# Expose the application port (adjust if your app uses a different port, e.g., 3000 or 5173)
EXPOSE 3000

CMD ["pnpm", "run", "dev"]