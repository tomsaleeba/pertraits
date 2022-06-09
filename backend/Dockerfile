FROM node:16-alpine

ADD https://github.com/benbjohnson/litestream/releases/download/v0.3.8/litestream-v0.3.8-linux-amd64-static.tar.gz /tmp/litestream.tar.gz
RUN tar -C /usr/local/bin -xzf /tmp/litestream.tar.gz && \
  rm /tmp/litestream.tar.gz && \
  npm -g install pnpm

ENV APP_HOME=/app  DB_PATH=/app/the.db
ENV GOOGLE_APPLICATION_CREDENTIALS=/app/secrets/gcp-key.json
RUN mkdir -p $APP_HOME && \
  touch /etc/litestream.yml && \
  chown node:node $APP_HOME /etc/litestream.yml
WORKDIR $APP_HOME

COPY --chown=node package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod

COPY --chown=node . .
USER node

ENV PORT=3000
EXPOSE ${PORT}
ENTRYPOINT ["sh", "./scripts/entrypoint.sh"]

