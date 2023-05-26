FROM node:18

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./
COPY controller ./controller
COPY db ./db 
COPY public ./public 
COPY routes ./routes 
COPY views ./views 
COPY index.js ./index.js

RUN npm install

EXPOSE 8080
CMD [ "node", "index.js" ]