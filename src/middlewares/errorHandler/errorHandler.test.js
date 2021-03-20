import errorHandler from ".";

const mockAddEvent = mockRequest.logger.addEvent;
const mockDone = mockRequest.logger.done;

describe("when error object has status", () => {
  let error;
  beforeEach(() => {
    error = { status: 400 };
  });
  test("it should set status", () => {
    errorHandler(error, mockRequest, mockResponse, mockNext);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
  });
  describe("and when error object has message", () => {
    test("it should set message", () => {
      error.message = "mockErrorMessage";
      errorHandler(error, mockRequest, mockResponse, mockNext);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "mockErrorMessage"
      });
    });
  });
  describe("and when error object does not have message", () => {
    test(" it should set default error message", () => {
      errorHandler(error, mockRequest, mockResponse, mockNext);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Internal Server Error"
      });
    });
  });
});

describe("when error object does not have status", () => {
  let error;
  beforeEach(() => {
    error = { message: "mockErrorMessage" };
  });
  test(" it should set 500 status", () => {
    errorHandler(error, mockRequest, mockResponse, mockNext);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
  });
  test(" it should set default error message", () => {
    errorHandler(error, mockRequest, mockResponse, mockNext);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Internal Server Error"
    });
  });
});

test("it should log error event", () => {
  errorHandler(
    { status: 400, message: "MOCK_MESSAGE" },
    mockRequest,
    mockResponse,
    mockNext
  );
  expect(mockAddEvent).toHaveBeenCalledTimes(1);
  expect(mockAddEvent).toHaveBeenCalledWith("MOCK_MESSAGE");
  expect(mockDone).toHaveBeenCalledTimes(1);
});

test("it should log error event when there is an error", () => {
  errorHandler(null, mockRequest, mockResponse, mockNext);
  expect(mockAddEvent).toHaveBeenCalledTimes(1);
  expect(mockAddEvent).toHaveBeenCalledWith(
    "Cannot read property 'status' of null"
  );
  expect(mockDone).toHaveBeenCalledTimes(1);
});
