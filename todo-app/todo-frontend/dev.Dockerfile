FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .
#host to allow access from outside the container
CMD ["npm", "run", "dev", "--", "--host"]