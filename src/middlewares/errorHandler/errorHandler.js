const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    customErrorMessage: err.message || "Internal Server Error"
  });
};

export default errorHandler;
