FROM node:16.14.0
WORKDIR /app-node
COPY . .
RUN npm install
COPY . . 
EXPOSE 3000

ENTRYPOINT npm run start
