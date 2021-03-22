/* eslint-disable no-console */

import { connect } from "./database/operations";
import errorHandler from "./middlewares/errorHandler";
import express from "express";
import { init } from "./app";
import logger from "./middlewares/logger";
import setupRoutes from "./routes";

jest.mock("./database/operations");
jest.mock("./middlewares/errorHandler");
jest.mock("express", () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => ({
      use: jest.fn(),
      listen: jest.fn((port, callback) => callback())
    }))
  };
});

jest.mock("./middlewares/logger");
jest.mock("./routes", () => jest.fn());
console.log = jest.fn();

test("it should call express", () => {
  init();
  expect(express).toHaveBeenCalledTimes(1);
});

test("it should call connect", () => {
  init();
  expect(connect).toHaveBeenCalledTimes(1);
});

test("it should use logger middleware", () => {
  const app = init();
  expect(app.use).toHaveBeenNthCalledWith(1, logger);
});

test("it should call setupRoutes", () => {
  const app = init();

  expect(setupRoutes).toHaveBeenCalledTimes(1);
  expect(setupRoutes).toHaveBeenCalledWith(app);
});

test("it should use errorHandler middleware", () => {
  const app = init();
  expect(app.use).toHaveBeenNthCalledWith(2, errorHandler);
});

describe("when EXECUTION_ENV_SERVERLESS is set", () => {
  beforeEach(() => {
    global.process.env.EXECUTION_ENV_SERVERLESS = true;
  });

  test("it should not call app.listen", () => {
    const app = init();
    expect(app.listen).not.toHaveBeenCalled();
  });

  afterEach(() => {
    delete global.process.env.EXECUTION_ENV_SERVERLESS;
  });
});

describe("when EXECUTION_ENV_SERVERLESS is not set", () => {
  describe("when PORT is set", () => {
    test("it should call app.listen with PORT", () => {
      global.process.env.PORT = 3001;
      const app = init();
      expect(app.listen).toHaveBeenCalledTimes(1);
      expect(app.listen).toHaveBeenNthCalledWith(1, 3001, expect.any(Function));
      delete global.process.env.PORT;
    });
  });

  describe("when PORT is not set", () => {
    test("it should call app.listen with default PORT", (done) => {
      const app = init();
      expect(app.listen).toHaveBeenCalledTimes(1);
      expect(app.listen).toHaveBeenNthCalledWith(1, 3000, expect.any(Function));
      expect(console.log).toHaveBeenCalledWith("Node server listening on 3000");
      done();
    });
  });
});
