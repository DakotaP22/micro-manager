# Use the official Node.js image as the base image
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /angular-19

# Install git and other necessary tools
RUN apk add --no-cache git
RUN npm install -g @angular/cli@19

# Install Firebase Emulators
RUN apk add --no-cache git openjdk11-jre
RUN npm install -g firebase-tools