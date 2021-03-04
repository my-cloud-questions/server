import errorHandler from "./errorHandler";

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
