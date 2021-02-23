"use strict";

import "core-js";
import "regenerator-runtime/runtime";

import { connect as dynamodbConnect } from "./database/operations";
import express from "express";
import initialize from "./database/models";
import setupRoutes from "./routes/index.js";

// import { jsonBodyParser } from "./middlewares/bodyParser.js";

// import corsMiddleware from "./middlewares/cors.js";

// import errorHandler from "./middlewares/errorHandler.js";

// import logger from "./middlewares/logger.js";

const app = express();

dynamodbConnect();
initialize();

// Middlewares
// app.use(corsMiddleware);
// app.use(jsonBodyParser);
// app.use(logger);

setupRoutes(app);

// app.use(errorHandler);

if (!process.env.EXECUTION_ENV_SERVERLESS) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, async () => {
    // eslint-disable-next-line no-console
    console.log("Node server listening on " + PORT);
  });
}

exports.app = app;
export default app;
