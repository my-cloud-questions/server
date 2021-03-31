import getEnvironment from "../../util/environment";

const health = (req, res, next) => {
  getEnvironment();
  req.logger.addEvent("Started");
  res.status(200);
  res.json({
    status: "Healthy"
  });
  req.logger.addEvent("Send response");
  req.logger.done();
};

export default health;
