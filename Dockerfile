FROM node:18.15.0

RUN mkdir app
WORKDIR app
COPY package.json package-lock.json /app/
RUN npm i
COPY . .
RUN make build
