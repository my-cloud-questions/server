import awsServerlessExpress from "@vendia/serverless-express";
import app from "./app";

process.env.EXECUTION_ENV_SERVERLESS = true;

const handler = awsServerlessExpress({ app, logSettings: { level: "debug" } });

exports.handler = handler;
