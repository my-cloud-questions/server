import { query } from "../../database/operations";
import courseModel from "../../database/model/courses";
import courses from ".";

jest.mock("../../database/model/courses", () => jest.fn());
jest.mock("../../database/operations");

beforeEach(() => {
  mockRequest.query = {
    platform: "mockPlatform"
  };
});
afterEach(() => {
  delete global.mockRequest.query;
});
describe("when course query returns result", () => {
  beforeEach(async (done) => {
    query.mockResolvedValue([{ id: "mockId", name: "mockName" }]);
    await courses(mockRequest, mockResponse, mockNext);
    done();
  });
  test("it should log events", () => {
    expect(mockRequest.logger.addEvent).toHaveBeenCalledTimes(3);
    expect(mockRequest.logger.addEvent).toHaveBeenNthCalledWith(1, "Started");
    expect(mockRequest.logger.addEvent).toHaveBeenNthCalledWith(
      2,
      "Retreive courses"
    );
    expect(mockRequest.logger.addEvent).toHaveBeenNthCalledWith(
      3,
      "Send response"
    );
    expect(mockRequest.logger.done).toHaveBeenCalledTimes(1);
  });
  test("it should call query database operation", () => {
    expect(query).toHaveBeenCalledWith(
      courseModel,
      "platformId",
      mockRequest.query.platform
    );
  });
  test("it should set response status", () => {
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });
  test("it should set response json", () => {
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: [{ value: "mockId", label: "mockName" }]
    });
  });
});

describe("when course query fails", () => {
  const mockError = new Error("mockErrorMessage");
  beforeEach(async () => {
    query.mockRejectedValue(mockError);
    await courses(mockRequest, mockResponse, mockNext);
  });
  test("it should call error handler", async () => {
    expect(mockNext).toHaveBeenCalledWith(mockError);
  });
  test("it should log events", () => {
    expect(mockRequest.logger.addEvent).toHaveBeenCalledTimes(1);
    expect(mockRequest.logger.addEvent).toHaveBeenNthCalledWith(1, "Started");
  });
});
