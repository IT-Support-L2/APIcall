# Base image used 
FROM node:alpine
COPY ./ ./
# Install project dependencies
RUN npm install
# Run default command
CMD ["npm", "start"]
