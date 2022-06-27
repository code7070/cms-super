FROM node:14-alpine AS development
ENV NODE_ENV development
#add work directory
WORKDIR /app
#cache and install deps
COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock
RUN yarn install
#copy app files
COPY . /app
EXPOSE 3030
CMD ["yarn", "start"]