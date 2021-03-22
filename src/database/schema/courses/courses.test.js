import { Schema } from "dynamoose";

jest.mock("dynamoose");

test("it should create course schema", () => {
  require("./courses.js");
  expect(Schema).toHaveBeenCalledTimes(1);
  expect(Schema).toHaveBeenCalledWith({
    id: {
      type: String,
      hashKey: true
    },
    platformId: {
      type: String,
      index: {
        name: "platform-index",
        global: true
      }
    },
    name: String
  });
});
