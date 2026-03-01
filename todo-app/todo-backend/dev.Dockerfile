FROM node:20

WORKDIR /usr/src/app

# Install dependencies first (better layer caching)
COPY package*.json ./
RUN npm install

# Install nodemon globally (or use npx)
RUN npm install -g nodemon

# Copy rest of the source delete becauase of dev
# COPY . .

EXPOSE 3000

CMD ["nodemon", "--legacy-watch", "index.js"]