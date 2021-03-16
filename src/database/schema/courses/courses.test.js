import * as dynamoose from "dynamoose";

jest.mock("../../config", () => {
  return { MOCK_CONFIG: "MOCK_CONFIG_VALUE" };
});

const mockSchema = jest.fn();
const mockModel = jest.fn();

beforeEach(() => {
  jest.resetModules();
  dynamoose.Schema = mockSchema;
  dynamoose.model = mockModel;
  mockSchema.mockReturnValue({ MOCK_SCHEMA: "MOCK_SCHEMA_VALUE" });

  //   require("./courses.js");
});

test("it should create course schema", () => {
  require("./courses.js");
  //   console.log(courseModel);
  expect(mockModel).toHaveBeenCalledTimes(1);
});

test("it should create course model", () => {
  require("./courses.js");
  expect(mockModel).toHaveBeenCalledTimes(1);
  expect(mockModel).toHaveBeenCalledWith(
    "courses",
    { MOCK_SCHEMA: "MOCK_SCHEMA_VALUE" },
    { MOCK_CONFIG: "MOCK_CONFIG_VALUE" }
  );
});
