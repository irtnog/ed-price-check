FROM node:14.13.1
RUN set -eux; \
        apt-get update; \
        apt-get install -y \
                libzmq3-dev \
                zlib1g-dev \
        ; \
        rm -rf /var/lib/apt/lists/*
COPY --chown=node:node . /home/node/app/
WORKDIR /home/node/app
USER node
