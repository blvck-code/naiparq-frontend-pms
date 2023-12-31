FROM node:19.6.0 as build

# Create html and workdir
RUN mkdir -p /var/www/html/
RUN mkdir -p /home/naiparqPMSFrontend

WORKDIR /home/naiparqPMSFrontend

# install package.json (o sea las dependencies)
COPY package.json /home/naiparqPMSFrontend/package.json
COPY . /home/naiparqPMSFrontend

#Install npm
RUN npm install -g @angular/cli@latest
RUN npm install --force

# Build
RUN npm run build

# Copy files to html dir
FROM node:19.6.0
COPY --from=build /home/naiparqPMSFrontend/dist/naiparq-frontend-pms/ /var/www/html/
