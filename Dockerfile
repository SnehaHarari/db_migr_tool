FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

COPY wait-for-services.sh ./wait-for-services.sh
RUN chmod +x wait-for-services.sh

EXPOSE 5000

CMD ["./wait-for-services.sh", "npm", "start"]
