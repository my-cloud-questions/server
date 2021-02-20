"use strict";
process.env.EXECUTION_ENV_SERVERLESS = true;

const awsServerlessExpress = require("@vendia/serverless-express");
const app = require("./app").app;

exports.handler = awsServerlessExpress({ app });
