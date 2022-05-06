FROM node:16.14.0
WORKDIR /app-node
COPY . .
RUN npm install
ENTRYPOINT npm run start
