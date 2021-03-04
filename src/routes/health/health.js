const health = (req, res, next) => {
  try {
    throw new Error("mock");
    // res.status(200);
    // res.json({
    //   status: "Healthy"
    // });
  } catch (error) {
    next(error);
  }

  // req.logger.addEvent("health check");
  // req.logger.done();
};

export default health;
