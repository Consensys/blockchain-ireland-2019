import * as web3 from 'web3';
import winston = require('winston');

let createWeb3Instance = async () => {
  return new web3(new web3.providers.HttpProvider('http://localhost:7545'));
};

export { createWeb3Instance };
