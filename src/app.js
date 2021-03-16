"use strict";

import "core-js";
import "regenerator-runtime/runtime";

import { connect } from "./database/operations";
import errorHandler from "./middlewares/errorHandler";
import express from "express";
import logger from "./middlewares/logger";
import setupRoutes from "./routes/index.js";

// import { jsonBodyParser } from "./middlewares/bodyParser.js";

// import corsMiddleware from "./middlewares/cors.js";

export const init = () => {
  const app = express();

  connect();

  // Middlewares
  // app.use(corsMiddleware);
  // app.use(jsonBodyParser);

  app.use(logger);

  setupRoutes(app);

  app.use(errorHandler);

  if (!process.env.EXECUTION_ENV_SERVERLESS) {
    const PORT = process.env.PORT || "3000";
    app.listen(parseInt(PORT), () => {
      // eslint-disable-next-line no-console
      console.log("Node server listening on " + PORT);
    });
  }

  return app;
};

const expressApp = init();

exports.app = expressApp;
export default expressApp;
