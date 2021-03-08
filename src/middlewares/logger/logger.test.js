import { advanceBy, advanceTo } from "jest-date-mock";

import logger from ".";

const req = {
  ip: "MOCK_IP",
  method: "MOCK_METHOD",
  path: "MOCK_PATH",
  query: "MOCK_QUERY"
};
let res;
const next = jest.fn();

let startTime;

const resetTimer = () => {
  startTime = new Date(2021, 1, 1, 0, 0, 0).getTime();
  advanceTo(startTime);
};
let initialLogObj;

beforeEach(() => {
  resetTimer();

  initialLogObj = {
    events: [],
    request: {
      clientIP: "MOCK_IP",
      method: "MOCK_METHOD",
      path: "MOCK_PATH",
      query: "MOCK_QUERY"
    },
    started: startTime
  };

  logger(req, res, next);
});

test("it should attach logger to request object", () => {
  return expect(req.logger).toBeInstanceOf(Object);
});

test("it should call next middleware", () => {
  return expect(next).toHaveBeenCalled();
});

describe("logger object", () => {
  test("it should have addElement method", () => {
    return expect(req.logger.addElement).toBeInstanceOf(Function);
  });

  test("it should have addEvent method", () => {
    return expect(req.logger.addEvent).toBeInstanceOf(Function);
  });

  test("it should have addSubEvent method", () => {
    return expect(req.logger.addSubEvent).toBeInstanceOf(Function);
  });

  test("it should have isSubEventAtLast method", () => {
    return expect(req.logger.isSubEventAtLast).toBeInstanceOf(Function);
  });

  test("it should have done method", () => {
    return expect(req.logger.done).toBeInstanceOf(Function);
  });

  test("it should have log object", () => {
    return expect(req.logger.log).toMatchObject({
      events: [],
      request: {
        clientIP: "MOCK_IP",
        method: "MOCK_METHOD",
        path: "MOCK_PATH",
        query: "MOCK_QUERY"
      },
      started: startTime
    });
  });

  describe("when client IP is in x-forwarded-for header", () => {
    test("it should use client IP from in x-forwarded-for header", () => {
      const newReq = {
        ...req,
        headers: { "x-forwarded-for": "MOCK_X_FORWARDED_IP" }
      };
      delete newReq.ip;
      logger(newReq, res, next);
      return expect(newReq.logger.log).toMatchObject({
        events: [],
        request: {
          clientIP: "MOCK_X_FORWARDED_IP",
          method: "MOCK_METHOD",
          path: "MOCK_PATH",
          query: "MOCK_QUERY"
        },
        started: startTime
      });
    });
  });
});

describe("when addEvent is called", () => {
  test("it should add event in events array", () => {
    expect(req.logger.log.events).toHaveLength(0);

    advanceBy(100);
    req.logger.addEvent("MOCK EVENT 1");

    advanceBy(200);
    req.logger.addEvent("MOCK EVENT 2");

    req.logger.addEvent(null);

    expect(req.logger.log.events).toHaveLength(2);
    expect(req.logger.log.events[0]).toBe("MOCK EVENT 1 : 100ms");
    expect(req.logger.log.events[1]).toBe("MOCK EVENT 2 : 200ms");
  });
});

describe("when addElement is called", () => {
  test("it should add element in log object", () => {
    req.logger.addElement("MOCK_KEY", "MOCK_VALUE");
    expect(req.logger.log).toEqual({
      ...initialLogObj,
      MOCK_KEY: "MOCK_VALUE"
    });
  });

  describe("when key is null", () => {
    test("it should not add element in log object", () => {
      req.logger.addElement(null, "MOCK_VALUE");
      expect(req.logger.log).toEqual(initialLogObj);
    });
  });

  describe("when value is null", () => {
    test("it should not add element in log object", () => {
      req.logger.addElement("MOCK_KEY", null);
      expect(req.logger.log).toEqual(initialLogObj);
    });
  });
});

describe("when addSubEvent is called", () => {
  test("it should add subEvent as first array element", () => {
    advanceBy(200);
    req.logger.addSubEvent("MOCK_SUB_EVENT_1");

    advanceBy(100);
    req.logger.addSubEvent("MOCK_SUB_EVENT_2");

    advanceBy(100);
    req.logger.addEvent("MOCK_EVENT_2");

    expect(req.logger.log).toEqual({
      ...initialLogObj,
      events: [
        ["MOCK_SUB_EVENT_1 : 200ms", "MOCK_SUB_EVENT_2 : 100ms"],
        "MOCK_EVENT_2 : 400ms"
      ]
    });
  });

  test("it should add subEvent in log object", () => {
    advanceBy(100);
    req.logger.addEvent("MOCK_EVENT_1");

    advanceBy(200);
    req.logger.addSubEvent("MOCK_SUB_EVENT_1");

    advanceBy(100);
    req.logger.addSubEvent("MOCK_SUB_EVENT_2");

    advanceBy(100);
    req.logger.addEvent("MOCK_EVENT_2");

    expect(req.logger.log).toEqual({
      ...initialLogObj,
      events: [
        "MOCK_EVENT_1 : 100ms",
        ["MOCK_SUB_EVENT_1 : 200ms", "MOCK_SUB_EVENT_2 : 100ms"],
        "MOCK_EVENT_2 : 400ms"
      ]
    });
  });

  describe("when subEvent is null", () => {
    test("it should not add subEvent in log object", () => {
      req.logger.addSubEvent(null);
      expect(req.logger.log).toEqual(initialLogObj);
    });
  });
});

describe("when done is called", () => {
  test("it should log to console", () => {
    global.console.log = jest.fn();
    advanceBy(100);
    req.logger.addEvent("MOCK_EVENT_1");
    req.logger.done();
    expect(global.console.log).toHaveBeenCalledWith({
      events: ["MOCK_EVENT_1 : 100ms"],
      request: {
        clientIP: "MOCK_IP",
        method: "MOCK_METHOD",
        path: "MOCK_PATH",
        query: "MOCK_QUERY"
      },
      started: "2/1/2021, 12:00:00 AM",
      time: "100ms"
    });
  });
});
