const mockAwsServerlessExpress = jest.fn((param) => param);
jest.mock("@vendia/serverless-express", () => {
  return (params) => jest.fn(() => mockAwsServerlessExpress(params));
});

const mockApp = jest.fn();
jest.mock("./app", () => {
  return { app: mockApp };
});

test("it should set EXECUTION_ENV_SERVERLESS environment variable to true", () => {
  require("./index");
  return expect(global.process.env.EXECUTION_ENV_SERVERLESS).toBeTruthy();
});

test("it should call awsServerlessExpress", () => {
  const handler = require("./index").handler;
  handler();
  expect(mockAwsServerlessExpress).toHaveBeenCalledWith({ app: mockApp });
});
