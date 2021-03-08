const health = (req, res, next) => {
  try {
    res.status(200);
    res.json({
      status: "Healthy"
    });
  } catch (e) {
    next(e);
  }
  // req.logger.addEvent("health check");
  // req.logger.done();
};

export default health;
