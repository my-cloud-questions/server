const Logger = ({ method, path, query, clientIP }) => ({
  log: {
    started: Date.now(),
    request: {
      method: method,
      path: path,
      query: query,
      clientIP: clientIP
    },
    events: []
  },
  lastEventTime: Date.now(),
  lastSubEventTime: Date.now(),
  addEvent: function (event) {
    if (event) {
      this.log.events.push(`${event} : ${Date.now() - this.lastEventTime}ms`);
      this.lastEventTime = Date.now();
    }
  },
  isSubEventAtLast: function () {
    const length = this.log.events.length;
    if (length > 0) {
      // if last entry in log events object is array
      return typeof this.log.events[length - 1] === "object";
    }
    return false;
  },
  addSubEvent: function (subEvent) {
    if (subEvent) {
      if (this.isSubEventAtLast()) {
        this.log.events[this.log.events.length - 1].push(
          `${subEvent} : ${Date.now() - this.lastSubEventTime}ms`
        );
      } else {
        this.log.events.push([
          `${subEvent} : ${Date.now() - this.lastEventTime}ms`
        ]);
        this.lastSubEventTime = Date.now();
      }
    }
  },
  addElement: function (key, value) {
    if (key && value) {
      this.log[key] = value;
    }
  },
  done: function () {
    this.log.time = `${Date.now() - this.log.started}ms`;
    this.log.started = new Date(this.log.started).toLocaleString();
    // eslint-disable-next-line no-console
    console.log(this.log);
  }
});

const loggerMiddleware = (req, res, next) => {
  const clientIP =
    req.ip ||
    req.headers[
      Object.keys(req.headers).find(
        (key) => key.toLowerCase() === "x-forwarded-for"
      )
    ];

  req.logger = Logger({
    method: req.method,
    path: req.path,
    query: req.query,
    clientIP
  });
  next();
};

export default loggerMiddleware;
