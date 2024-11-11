# elspark-frontend/Dockerfile
# Använd en Node.js-bild
FROM node:18

# Sätt arbetskatalog
WORKDIR /app

# Kopiera package.json och installera beroenden
COPY package*.json ./
RUN npm install

# Kopiera all övrig kod
COPY . .

# Exponera port 3000 (eller annan om frontend använder något annat)
EXPOSE 3000

# Startkommando, skriv ut "Hello World" till terminalen
CMD ["npm", "start"]
