FROM node:20

WORKDIR /usr/src/app

COPY . .

# В режиме разработки используем npm install
RUN npm install

# Запускаем dev-сервер Vite
CMD ["npm", "run", "dev", "--", "--host"]