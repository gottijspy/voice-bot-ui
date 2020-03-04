#Download base image ubuntu 16.04
FROM ubuntu:18.04

RUN apt-get update -yq \
    && apt-get install curl gnupg -yq \
    && curl -sL https://deb.nodesource.com/setup_8.x | bash \
    && apt-get install nodejs -yq

# FROM node:10

WORKDIR /app

COPY package.json /app
RUN npm install
COPY . /app
CMD npm start


#COPY react-backend/package.json /app/react-backend/
#COPY . /app/react-backend
#CMD ["npm start"] 
#&& ["node react-backend/bin/www"]

#EXPOSE 8081 
#8082
