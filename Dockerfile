#
# This is a multi-stage docker build
# We are going to build client artifacts
# and then copy that to build server
#

# ---- Base Node ----
FROM node:8.12.0-alpine as base
ENV NPM_CONFIG_LOGLEVEL warn
ENV APP_DIR /client

# ---- Build Client ----
FROM base AS client
# Override the base log level (info).
RUN mkdir $APP_DIR
WORKDIR $APP_DIR
# Copy all local files into the image.
COPY . $APP_DIR
RUN ls
# Install package
RUN npm install
# Get environment variables from compose
ARG NODE_ENV
# Build for production.
RUN npm run build


# ---- Build Server ----
#
# serve with -s is very important because
# it run it as SPA which affect react router
#
FROM base AS release
RUN ls
COPY --from=client $APP_DIR/build ./build
# Install and configure `serve`.
RUN npm install -g serve@10.0.2 --silent
CMD serve -s build
EXPOSE 5000