#!/bin/sh
git checkout prod
git brand -D swap
git checkout -B swap
git brand -D prod
git fetch
git checkout prod
git pull
