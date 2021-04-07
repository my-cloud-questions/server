import { Schema } from "dynamoose";

jest.mock("dynamoose");

test("it should create platform schema", () => {
  require("./platforms.js");
  expect(Schema).toHaveBeenCalledTimes(1);
  expect(Schema).toHaveBeenCalledWith({
    id: {
      type: String,
      hashKey: true
    }
  });
});
