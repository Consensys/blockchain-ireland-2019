import * as fs from 'fs';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { config as dotenvConfig } from 'dotenv';
// var cors = require('cors')
import './controllers/EventsController'

import {RegisterRoutes} from './routes'


import * as winston from 'winston';
import * as expressWinston from 'express-winston';

if (fs.existsSync('.env')) {
  console.log('Using .env file to supply config environment variables');
  dotenvConfig({ path: '.env' });
} else {
  console.log('Using .env.example file to supply config environment variables');
  dotenvConfig({ path: '.env.example' }); // you can delete this after you create your own .env file!
}

let transport = new winston.transports.Console({
  level: process.env.LOG_LEVEL || 'info'
});
winston.configure({ transports: [transport] });

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
  }

  private config(): void {
    this.app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(expressWinston.logger({ winstonInstance: winston, expressFormat: true }));

    this.app.use('/docs', express.static(__dirname + '/swagger-ui'));
    this.app.use('/swagger.json', (req, res) => {
        res.sendFile(__dirname + '/swagger.json');
    });

    RegisterRoutes(this.app as any);
  }
}

//Use PORT from environment variable PORT if not default to port 3000
const PORT = process.env['PORT'] == null ? 3000 : process.env['PORT'];

/* tslint:disable-next-line */
new App().app.listen(PORT, () => {
  console.log(`Hackathon Server listening on port ${PORT}`);
});
