FROM node:18.12.1 as build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
FROM build as test
RUN npm test
FROM node:18.12.1-alpine
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/build ./build
RUN npm install --production
EXPOSE 3000
CMD ["npm", "start"]