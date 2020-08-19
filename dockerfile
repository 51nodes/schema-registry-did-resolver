FROM node:12 AS builder
WORKDIR /schema-registry-did-resolver
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:12
WORKDIR /schema-registry-did-resolver
COPY --from=builder /schema-registry-did-resolver ./
EXPOSE 8080
CMD ["npm", "run", "start:prod"]
