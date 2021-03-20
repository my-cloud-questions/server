import health from ".";

test("it should log events", () => {
  health(mockRequest, mockResponse, mockNext);
  expect(mockRequest.logger.addEvent).toHaveBeenCalledTimes(2);
  expect(mockRequest.logger.addEvent).toHaveBeenNthCalledWith(1, "Started");
  expect(mockRequest.logger.addEvent).toHaveBeenNthCalledWith(
    2,
    "Send response"
  );
  expect(mockRequest.logger.done).toHaveBeenCalledTimes(1);
});

test("it should set response status", () => {
  health(mockRequest, mockResponse, mockNext);
  expect(mockResponse.status).toHaveBeenCalledWith(200);
});
test("it should set response json", () => {
  health(mockRequest, mockResponse, mockNext);
  expect(mockResponse.json).toHaveBeenCalledWith({ status: "Healthy" });
});
