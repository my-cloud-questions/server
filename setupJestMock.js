/* global jest */

global.mockRequest = {
  logger: {
    addEvent: jest.fn(),
    done: jest.fn()
  }
};

global.mockResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn()
};

global.mockNext = jest.fn();
