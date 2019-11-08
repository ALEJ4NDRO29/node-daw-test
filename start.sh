#!/bin/bash

sudo service mongod start

cd backend
nodemon &
cd ..

cd backend-graphql
nodemon &
cd ..

cd backend-moleculer
sudo docker-compose up -d --build
cd ..

cd backend-prisma
./start.sh &
cd ..

cd frontend
gulp &
cd ..