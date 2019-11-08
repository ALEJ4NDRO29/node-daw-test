#!/bin/bash

sudo docker-compose up -d
sleep 3
prisma deploy
nodemon

# mongo mongodb://localhost:27018 --username prisma