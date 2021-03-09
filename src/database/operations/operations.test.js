import * as dynamoose from "dynamoose";

import { connect } from ".";

const updateMock = jest.fn();
const dynamoDBMock = jest.fn(() => ({
  MOCK_KEY: "MOCK_DYNAMODB_CONSTRUCTOR_VALUE"
}));
const localMock = jest.fn();
const setMock = jest.fn();

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
  });
});
