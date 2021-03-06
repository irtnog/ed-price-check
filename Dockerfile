FROM node:14.13.1 AS build
COPY --chown=node:node . /home/node/app/
WORKDIR /home/node/app
USER node
RUN set -eux; \
        npm ci --only=production

FROM node:14.13.1-slim
COPY --chown=node:node --from=build /home/node/app/ /home/node/app/
WORKDIR /home/node/app
USER node
CMD ["node","index.js"]
