FROM caddy:2.6.4

RUN apk update
RUN apk add nss-tools
COPY --from=gsapi-app /app/dist /srv
COPY Caddyfile /etc/caddy/Caddyfile
