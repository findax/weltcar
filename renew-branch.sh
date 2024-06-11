#!/bin/sh
git checkout prod
git branch -D swap
git checkout -B swap
git branch -D prod
git fetch
git checkout prod
git pull
