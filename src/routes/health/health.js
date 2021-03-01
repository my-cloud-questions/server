const health = (req, res) => {
  res.status(200);
  res.json({
    status: "Healthy"
  });
  // req.logger.addEvent("health check");
  // req.logger.done();
};

export default health;
