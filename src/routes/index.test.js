import health from "./health";
import courses from "./courses";
import platforms from "./platforms";
import setupRoutes from ".";

jest.mock("./health", () => jest.fn());
jest.mock("./courses", () => jest.fn());
jest.mock("./platforms", () => jest.fn());
const mockApp = { get: jest.fn() };

beforeEach(() => {
  setupRoutes(mockApp);
});

test("it should setup 3 routes", () => {
  expect(mockApp.get).toHaveBeenCalledTimes(3);
});

test("it should setup health route", () => {
  expect(mockApp.get).toHaveBeenNthCalledWith(1, "/health", health);
});

test("it should setup courses route", () => {
  expect(mockApp.get).toHaveBeenNthCalledWith(2, "/courses", courses);
});

test("it should setup platforms route", () => {
  expect(mockApp.get).toHaveBeenNthCalledWith(3, "/platforms", platforms);
});
