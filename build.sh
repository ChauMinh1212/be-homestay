#!/bin/sh

VERSION="0.0.13"

docker build --platform linux/amd64  -t chauminh1212/sirena-be:${VERSION} .
docker push chauminh1212/sirena-be:${VERSION} 