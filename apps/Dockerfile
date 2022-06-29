FROM node:16-alpine AS builder
ENV NODE_ENV production
# Add work directory
WORKDIR /app
# Cache and Install deps
COPY package.json .
COPY yarn.lock .
# Copy files and repalce app env
COPY . .
RUN cp .env.production .env
# Install and build app
RUN yarn install
RUN yarn build


# Bundle static
FROM node:16-alpine AS serve
ENV NODE_ENV production
COPY --from=builder /app/build .
EXPOSE 3030
# Start the App
CMD ["node", "./middleware/server.js"]