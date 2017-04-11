FROM node:4-slim

# Create app directory
RUN mkdir -p /usr/src/apiWebClient && \
    apt update && \
    apt install -y jq && \
    rm -rf /var/lib/apt/lists/*
WORKDIR /usr/src/apiWebClient

# Install app dependencies
COPY package.json /usr/src/apiWebClient/
RUN npm install --silent -g npm 
RUN npm install --silent --prod 
RUN npm prune --prod

# Bundle app source
COPY . /usr/src/apiWebClient

CMD [ "node", "./app/app.js" ]