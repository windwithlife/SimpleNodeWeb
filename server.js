const express = require('express')
const next = require('next')
///const generator = require('./generator')
const port = parseInt(process.env.PORT, 10) || 8080
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
var bodyParser = require('body-parser');
const rewrite = require('express-urlrewrite');
var config = require('./config/config');
const baseUrl = config.RESOURCE_PATH;
const Sentry = require("@sentry/node");
const {dsn} = require('./app.config.json');
const logger = require("./tool_server/logger")(__filename);
const {getIPAddress} = require("./tool_server/tools");
logger.info('process.env.NODE_ENV : ', process.env.NODE_ENV);
Sentry.init({ dsn });

app.prepare()
  .then(() => {
    try{
      const server = express()
      server.use(Sentry.Handlers.requestHandler());
      server.use(bodyParser.urlencoded({ extended: true }));
      server.use(bodyParser.json());

      server.get(`*`, (req, res) => {
        if(req.path == baseUrl)  res.redirect(301, `${baseUrl}/index`);
        return handle(req, res)
      })
      // ? The error handler must be before any other error middleware and after all controllers
      server.use(Sentry.Handlers.errorHandler());
  
      const LOCAL_IP = getIPAddress();
      server.listen(port, (err) => {
        if (err) throw err
        logger.info(`> Ready on http://${LOCAL_IP}:${port}${baseUrl}`);
      })
    }
    catch(error){
      logger.error('error:服务器点火失败 ', error);
      Sentry.captureException(error);
    }
  })
