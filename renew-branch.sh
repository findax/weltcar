#!/bin/sh
git checkout server
git branch -D swap
git checkout -B swap
git branch -D server
git fetch
git checkout server
git pull
