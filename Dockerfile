# Use the official image as a parent image
FROM node:21.6.1-slim
WORKDIR /client

COPY . . 
RUN npm install -g pnpm
RUN pnpm install
RUN pnpm run build

ENV PUBLIC_API_URL=http://localhost:3000/api
ENV HOST=0.0.0.0
ENV PORT=4321

EXPOSE 4321
CMD ["node","dist/server/entry.mjs"]



