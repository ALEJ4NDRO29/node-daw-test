#!/bin/bash

sudo docker-compose up -d
sleep 3
prisma deploy

# mongo mongodb://localhost:27018 --username prisma