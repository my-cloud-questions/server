/* eslint-disable no-unused-vars */

import index from "./index";

test("it should set EXECUTION_ENV_SERVERLESS environment variable to true", () =>
  expect(global.process.env.EXECUTION_ENV_SERVERLESS).toBeTruthy());
