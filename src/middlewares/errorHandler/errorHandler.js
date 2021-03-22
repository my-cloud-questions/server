const errorHandler = (err, req, res, next) => {
  try {
    const message = (err.status && err.message) || "Internal Server Error";
    res.status(err.status || 500).json({ message });
    req.logger.addEvent(message);
  } catch (e) {
    req.logger.addEvent(e.message);
  } finally {
    req.logger.done();
  }
};

export default errorHandler;
