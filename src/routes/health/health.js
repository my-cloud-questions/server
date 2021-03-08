const health = (req, res, next) => {
  try {
    req.logger.addEvent("health start");
    res.status(200);
    res.json({
      status: "Healthy"
    });
    req.logger.addEvent("send response");
    req.logger.done();
  } catch (e) {
    next(e);
  }
};

export default health;
