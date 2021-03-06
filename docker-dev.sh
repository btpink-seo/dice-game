#!/bin/bash

if [ $1 == "up" ]
then
    docker-compose --env-file ./api/.env build
    docker-compose --env-file ./api/.env up
fi

if [ $1 == "down" ]
then
    docker-compose --env-file ./api/.env down
fi

if [ $1 == "restart" ]
then
    docker-compose --env-file ./api/.env down
    docker-compose --env-file ./api/.env build
    docker-compose --env-file ./api/.env up
fi