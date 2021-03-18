import health from "./health";
import courses from "./courses";
import setupRoutes from ".";

jest.mock("./health", () => {
  return {
    __esModule: true,
    default: jest.fn()
  };
});

jest.mock("./courses", () => {
  return {
    __esModule: true,
    default: jest.fn()
  };
});

const mockApp = { get: jest.fn() };

beforeEach(() => {
  setupRoutes(mockApp);
});

test("it should setup 2 routes", () => {
  expect(mockApp.get).toHaveBeenCalledTimes(2);
});

test("it should setup health route", () => {
  expect(mockApp.get).toHaveBeenNthCalledWith(1, "/health", health);
});

test("it should setup courses route", () => {
  expect(mockApp.get).toHaveBeenNthCalledWith(2, "/courses", courses);
});
