import { model } from "dynamoose";

jest.mock("dynamoose");
jest.mock("../../config", () => {
  return { MOCK_CONFIG: "MOCK_CONFIG_VALUE" };
});
jest.mock("../../schema/platforms", () => {
  return { MOCK_SCHEMA: "MOCK_SCHEMA_VALUE" };
});

test("it should create platform model", () => {
  require("./platforms.js");
  expect(model).toHaveBeenCalledTimes(1);
  expect(model).toHaveBeenCalledWith(
    "platforms",
    { MOCK_SCHEMA: "MOCK_SCHEMA_VALUE" },
    { MOCK_CONFIG: "MOCK_CONFIG_VALUE" }
  );
});
