import express from 'express';
//import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import createContainer from './container/createContainer'
import {errorHandler} from './utils/middleware'

// Initialize the app//
const app = express();
const c: any = createContainer();

const whiteList = ['http://localhost:3000', 'http://localhost:3001', 'https://bugular.herokuapp.com/']

const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors());
app.use(express.json())

app.use('/api/bugs', c.BugController.routes())
app.use(errorHandler)


if (process.env.NODE_ENV === 'production') {

  console.log('it thinks its productrion')
  // Serve any static files
  app.use(express.static(path.join(__dirname, '../../build')));
  app.use(express.static(path.join(__dirname, '../../public')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../../build', 'index.html'));
  });
}


const port = c.config.port || 8080;

// Start the server
app.listen(port, () => {console.log('app is listening on', port, ' it thinks we are in this environment ', process.env.NODE_ENV)});