import { query } from "../../database/operations";
import courses from ".";

jest.mock("../../database/model/courses", () => jest.fn());

const mockRequest = {
  logger: {
    addEvent: jest.fn(),
    done: jest.fn()
  },
  query: {
    platform: "mockPlatform"
  }
};

const mockResponse = {
  status: jest.fn(),
  json: jest.fn()
};

const mockNext = jest.fn();

jest.mock("../../database/operations");

describe("when course query returns result", () => {
  beforeEach(() => {
    query.mockResolvedValue([{ id: "mockId", name: "mockName" }]);
  });
  test("it should log started event", async () => {
    await courses(mockRequest, mockResponse, mockNext);
    expect(mockRequest.logger.addEvent).toHaveBeenNthCalledWith(1, "Started");
  });
});
