#test stage
FROM node:20 AS test-stage
WORKDIR /usr/src/app

FROM node:20 AS build-stage

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .
# Set the VITE_BACKEND_URL build argument and environment variable
ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}

RUN npm run build

FROM nginx:1.25-alpine


COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html
# Copy the custom nginx configuration file to the container
EXPOSE 80
#  
CMD ["nginx", "-g", "daemon off;"]
