FROM node:latest

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

ENV NODE_ENV production
ENV DATABASE_URL "mongodb://localhost/endopage-prod"


COPY . /usr/src/app

EXPOSE 5000

CMD ["npm", "start"]
