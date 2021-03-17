import { Schema } from "dynamoose";

jest.mock("dynamoose");

// jest.mock("../../config", () => {
//   return { MOCK_CONFIG: "MOCK_CONFIG_VALUE" };
// });

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
