#!/bin/bash
cd ./../hg/avg_rpc/
hg pull --insecur && hg update

cd ./../../avg_rpc/
rm -rf data
rm -rf models
rm -rf www
rm -rf rpc

cp -r ../hg/avg_rpc/data ./
cp -r ../hg/avg_rpc/models ./
cp -r ../hg/avg_rpc/www ./
cp -r ../hg/avg_rpc/rpc ./

forever stop app.js

node client.js
node api.js

forever start app.js