import errorHandler from ".";

const mockNext = jest.fn();
const mockRequest = {};
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
