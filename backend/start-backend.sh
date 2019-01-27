#!/bin/bash

echo "Installing dependencies"
npm install
if [ $? -ne 0 ]; then
    echo "Failed to install Node.js dependencies"
    exit 1
fi

echo "Checking if Genache is up"
nc -z 127.0.0.1 7545
if [ $? -ne 0 ]; then
    echo "Ganache is not running. Please start Ganache first"
    exit 1
fi

echo "Deploying smart contract"
truffle migrate --network development --reset
if [ $? -ne 0 ]; then
    echo "Failed to deploy a smart contract"
    exit 1
fi

echo "Starting backend server"
npm run start