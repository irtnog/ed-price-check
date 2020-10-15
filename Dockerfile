FROM node:14.13.1
COPY --chown=node:node . /home/node/app/
WORKDIR /home/node/app
USER node
