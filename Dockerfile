FROM node:16-alpine AS builder
ENV NODE_ENV production
WORKDIR /app
COPY apps/package.json .
COPY apps/yarn.lock .
COPY apps .
RUN cp /app/.env.production .env
RUN yarn install
RUN yarn build

# BUILD MIDDLEWARE
FROM node:16-alpine AS middleware
WORKDIR /middleware
COPY middleware/package.json .
COPY middleware/yarn.lock .
COPY middleware .
RUN cp /middleware/.env.production .env
RUN yarn install


# Bundle static
FROM node:16-alpine AS serve
ENV NODE_ENV production
#RUN npm i -g pm2
COPY --from=middleware /middleware ./middleware
COPY --from=builder /app/build ./build
EXPOSE 8000
# Start the App
CMD ["node", "./middleware/server.js"]