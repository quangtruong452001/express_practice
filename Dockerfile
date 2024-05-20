FROM node:20-alpine

ENV PORT 3000

COPY . /home/app

WORKDIR /home/app

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]