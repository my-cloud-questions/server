import { scan } from "../../database/operations";
import platformModel from "../../database/model/platforms";
import platforms from ".";
const mockPlatformModel = jest.fn();
jest.mock("../../database/model/platforms", () => {
  return jest.fn().mockImplementation(() => mockPlatformModel);
});
jest.mock("../../database/operations");

describe("when platform query returns result", () => {
  beforeEach(async (done) => {
    scan.mockResolvedValue([{ id: "mockId" }]);
    await platforms(mockRequest, mockResponse, mockNext);
    done();
  });
  test("it should log events", () => {
    expect(mockRequest.logger.addEvent).toHaveBeenCalledTimes(3);
    expect(mockRequest.logger.addEvent).toHaveBeenNthCalledWith(1, "Started");
    expect(mockRequest.logger.addEvent).toHaveBeenNthCalledWith(
      2,
      "Retreive platforms"
    );
    expect(mockRequest.logger.addEvent).toHaveBeenNthCalledWith(
      3,
      "Send response"
    );
    expect(mockRequest.logger.done).toHaveBeenCalledTimes(1);
  });
  test("it should call scan database operation", () => {
    // console.log(platformModel);
    expect(scan).toHaveBeenCalledWith(platformModel);
  });
  test("it should set response status", () => {
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });
  test("it should set response json", () => {
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: [{ value: "mockId", label: "mockId" }]
    });
  });
});

describe("when platform query fails", () => {
  const mockError = new Error("mockErrorMessage");
  beforeEach(async () => {
    scan.mockRejectedValue(mockError);
    await platforms(mockRequest, mockResponse, mockNext);
  });
  test("it should call error handler", async () => {
    expect(mockNext).toHaveBeenCalledWith(mockError);
  });
  test("it should log events", () => {
    expect(mockRequest.logger.addEvent).toHaveBeenCalledTimes(1);
    expect(mockRequest.logger.addEvent).toHaveBeenNthCalledWith(1, "Started");
  });
});
