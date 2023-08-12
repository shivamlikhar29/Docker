FROM node
WORKDIR /app
COPY package.json .
RUN npm install --only=production

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
    then npm install; \
    else npm install --only=production; \
    fi

COPY . ./
ENV PORT=3000
EXPOSE 3000
CMD [ "node", "index.js" ]