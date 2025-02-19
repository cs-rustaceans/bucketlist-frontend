FROM nginx

WORKDIR /code

COPY src src 
COPY *.json .
COPY *.js .
COPY *.ts .
COPY *.html .

# Install Node
ENV NODE_VERSION=18
RUN apt install -y curl
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"

RUN . "$NVM_DIR/nvm.sh" && npm i
RUN . "$NVM_DIR/nvm.sh" && npm run build
RUN rm -rf /usr/share/nginx/html
RUN ln -s /code/dist /usr/share/nginx/html