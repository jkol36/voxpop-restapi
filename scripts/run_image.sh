#!/usr/bin/env bash

docker run --name restapi -d -p 443:5000 --restart always restapi
