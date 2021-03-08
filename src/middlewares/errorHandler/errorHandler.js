const errorHandler = (err, req, res, next) => {
  try {
    res.status(err.status || 500);
    res.json({
      customErrorMessage: err.message || "Internal Server Error"
    });
    req.logger.addEvent(err.message);
  } catch (e) {
    req.logger.addEvent(e.message);
  } finally {
    req.logger.done();
  }
};

export default errorHandler;
