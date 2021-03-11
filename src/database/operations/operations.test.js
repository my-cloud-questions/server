/* eslint-disable no-console */
import * as dynamoose from "dynamoose";

import { connect, scan, query } from ".";

const updateMock = jest.fn();
const dynamoDBMock = jest.fn(() => ({
  MOCK_KEY: "MOCK_DYNAMODB_CONSTRUCTOR_VALUE"
}));
const localMock = jest.fn();
const setMock = jest.fn();
console.log = jest.fn();
const modelMock = {
  scan: jest.fn().mockReturnThis(),
  exec: jest.fn(),
  query: jest.fn().mockReturnThis(),
  eq: jest.fn().mockReturnThis()
};

describe("connect", () => {
  describe("when process.env.EXECUTION_ENV_SERVERLESS is true", () => {
    beforeEach(() => {
      global.process.env.EXECUTION_ENV_SERVERLESS = true;
      global.process.env.AWS_REGION = "MOCK_AWS_REGION";

      dynamoose.aws.sdk.DynamoDB = dynamoDBMock;
      dynamoose.aws.ddb.set = setMock;
    });

    test("it should call DynamoDB constructor function", () => {
      connect();
      expect(dynamoDBMock).toHaveBeenCalledWith({ region: "MOCK_AWS_REGION" });
    });

    test("it should call ddb.set", () => {
      connect();
      expect(setMock).toHaveBeenCalledWith({
        MOCK_KEY: "MOCK_DYNAMODB_CONSTRUCTOR_VALUE"
      });
    });

    describe("when connected to database", () => {
      test("it should log Connected event", async () => {
        setMock.mockResolvedValue();
        await connect();
        expect(console.log).toHaveBeenCalledTimes(1);
        expect(console.log).toHaveBeenCalledWith("Connected to DynamoDB");
      });
    });

    describe("when error in connection to database", () => {
      test("it should log connection error", async () => {
        const mockError = new Error("mockErrorMessage");
        setMock.mockRejectedValueOnce(mockError);
        await connect();
        expect(console.log).toHaveBeenCalledTimes(1);
        expect(console.log).toHaveBeenCalledWith(mockError);
      });
    });

    afterEach(() => {
      delete global.process.env.EXECUTION_ENV_SERVERLESS;
    });
  });

  describe("when process.env.EXECUTION_ENV_SERVERLESS is false", () => {
    beforeEach(() => {
      dynamoose.aws.sdk.config.update = updateMock;
      dynamoose.aws.ddb.local = localMock;
    });

    test("it should call update function", () => {
      connect();
      expect(updateMock).toHaveBeenCalledWith({ region: "us-east-1" });
    });

    test("it should call local function", () => {
      connect();
      expect(localMock).toHaveBeenCalledTimes(1);
    });

    describe("when connected to database", () => {
      test("it should log Connected event", async () => {
        localMock.mockResolvedValue();
        await connect();
        expect(console.log).toHaveBeenCalledTimes(1);
        expect(console.log).toHaveBeenCalledWith("Connected to local DynamoDB");
      });
    });

    describe("when error in connection to database", () => {
      test("it should log connection error", async () => {
        const mockError = new Error("mockErrorMessage");
        localMock.mockRejectedValueOnce(mockError);
        await connect();
        expect(console.log).toHaveBeenCalledTimes(1);
        expect(console.log).toHaveBeenCalledWith(mockError);
      });
    });
  });
});

describe("scan", () => {
  test("it should call scan", async () => {
    await scan(modelMock);
    expect(modelMock.scan).toHaveBeenCalledTimes(1);
  });

  test("it should call exec", async () => {
    await scan(modelMock);
    expect(modelMock.exec).toHaveBeenCalledTimes(1);
  });
});

describe("query", () => {
  test("it should call query", async () => {
    await query(modelMock, "mockIndexKey", "mockIndexValue");
    expect(modelMock.query).toHaveBeenCalledTimes(1);
    expect(modelMock.query).toHaveBeenCalledWith("mockIndexKey");
  });

  test("it should call eq", async () => {
    await query(modelMock, "mockIndexKey", "mockIndexValue");
    expect(modelMock.eq).toHaveBeenCalledTimes(1);
    expect(modelMock.eq).toHaveBeenCalledWith("mockIndexValue");
  });

  test("it should call exec", async () => {
    await query(modelMock, "mockIndexKey", "mockIndexValue");
    expect(modelMock.exec).toHaveBeenCalledTimes(1);
  });
});
