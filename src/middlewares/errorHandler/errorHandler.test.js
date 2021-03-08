import errorHandler from ".";

const mockNext = jest.fn();
const mockAddEvent = jest.fn();
const mockDone = jest.fn();

const mockRequest = { logger: { addEvent: mockAddEvent, done: mockDone } };
const mockResponse = {
  status: jest.fn(),
  json: jest.fn()
};

test("it should return status code when error object have status", () => {
  errorHandler({ status: 400 }, mockRequest, mockResponse, mockNext);
  expect(mockResponse.status).toHaveBeenCalledWith(400);
});

test("it should return default status code 500 when error object does not have status", () => {
  errorHandler({}, mockRequest, mockResponse, mockNext);
  expect(mockResponse.status).toHaveBeenCalledWith(500);
});

test("it should return error message when error object have message", () => {
  errorHandler({ message: "mockMessage" }, mockRequest, mockResponse, mockNext);
  expect(mockResponse.json).toHaveBeenCalledWith({
    customErrorMessage: "mockMessage"
  });
});

test("it should return Internal Server Error message when error object does not have message", () => {
  errorHandler({}, mockRequest, mockResponse, mockNext);
  expect(mockResponse.json).toHaveBeenCalledWith({
    customErrorMessage: "Internal Server Error"
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
