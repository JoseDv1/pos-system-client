FROM oven/bun:latest as base
WORKDIR /usr/src/client


# --- Install --- 
FROM base AS install
RUN mkdir -p /temp/dependencies
COPY package.json bun.lockb /temp/dependencies/
# Install dependencies in a separate layer to avoid rebuilding when the code changes
RUN cd /temp/dependencies && bun install --frozen-lockfile


# --- Build ---
FROM install as build
COPY --from=install /temp/dependencies/node_modules node_modules
COPY . .
RUN bun run build


# --- Release ---
FROM base as release
COPY --from=build /usr/src/client/node_modules node_modules
COPY --from=build /usr/src/client/dist dist

ENV PUBLIC_API_URL=http://localhost:3000/api
ENV HOST=0.0.0.0
ENV PORT=4321
USER bun
EXPOSE 4321
CMD ["bun","dist/server/entry.mjs"]



