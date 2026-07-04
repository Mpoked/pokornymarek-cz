# ── Studio Dva — produkční image (neprůstřelná varianta) ──────────
# Build i běh v jednom node:22 image → better-sqlite3 se zkompiluje
# přesně pro toto prostředí, žádné problémy s nativními moduly.
#
# Build:  docker compose build
# Run:    docker compose up -d
# Data (SQLite) žijí ve volume ./data — přežijí restart i rebuild.

FROM node:22-bookworm-slim
WORKDIR /app

# Build nástroje pro better-sqlite3 (kdyby chyběla prebuilt binárka)
RUN apt-get update && apt-get install -y --no-install-recommends \
      python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

# Nejdřív jen manifesty → využije cache, když se nemění závislosti
COPY package.json package-lock.json ./
RUN npm ci

# Zbytek projektu + produkční build
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Databáze se ukládá sem (přemapováno na volume v docker-compose)
RUN mkdir -p /app/data

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
EXPOSE 3000

CMD ["npm", "start"]
