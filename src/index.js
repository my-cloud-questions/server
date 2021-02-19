"use strict";
process.env.EXECUTION_ENV_SERVERLESS = true;

const awsServerlessExpress = require("aws-serverless-express");
const app = require("./app").app;
const server = awsServerlessExpress.createServer(app);

const handler = (event, context) => {
  return awsServerlessExpress.proxy(server, event, context);
};

exports.handler = handler;
