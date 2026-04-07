FROM node:24-bookworm-slim AS base
WORKDIR /app

FROM base AS deps
COPY package*.json ./
RUN npm i --include=optional \
  && npm i @rollup/rollup-linux-x64-gnu --no-save

FROM base AS dev
ENV NODE_ENV=development
COPY --from=deps --chown=node:node /app/node_modules ./node_modules
COPY --chown=node:node package*.json ./
COPY --chown=node:node . .
USER node
EXPOSE 4200
CMD ["npm", "run", "start", "--", "--host", "0.0.0.0", "--port", "4200"]
