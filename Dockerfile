FROM node:18-alpine
WORKDIR /app/finance
COPY package.json ./
RUN npm install
COPY . ./
ENTRYPOINT npm start