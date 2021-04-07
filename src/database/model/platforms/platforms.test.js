const mockModel = jest.fn();
jest.mock("dynamoose", () => {
  return { model: mockModel };
});
jest.mock("../../config", () => {
  return { MOCK_CONFIG: "MOCK_CONFIG_VALUE" };
});
jest.mock("../../schema/platforms", () => {
  return { MOCK_SCHEMA: "MOCK_SCHEMA_VALUE" };
});
const mockEnvironment = jest.fn();
jest.mock("../../../util/environment", () => {
  return mockEnvironment;
});

beforeEach(async () => {});
afterEach(() => {
  jest.resetModules();
});

test("it should create platforms model", async () => {
  mockEnvironment.mockReturnValue("");
  await import("./platforms.js");
  expect(mockModel).toHaveBeenCalledTimes(1);
  expect(mockModel).toHaveBeenCalledWith(
    "platforms",
    { MOCK_SCHEMA: "MOCK_SCHEMA_VALUE" },
    { MOCK_CONFIG: "MOCK_CONFIG_VALUE" }
  );
});

test("it should create platforms-dev model", async () => {
  mockEnvironment.mockReturnValue("dev");
  await import("./platforms.js");
  expect(mockModel).toHaveBeenCalledTimes(1);
  expect(mockModel).toHaveBeenCalledWith(
    "platforms-dev",
    { MOCK_SCHEMA: "MOCK_SCHEMA_VALUE" },
    { MOCK_CONFIG: "MOCK_CONFIG_VALUE" }
  );
});
