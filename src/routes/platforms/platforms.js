import { scan } from "../../database/operations";

const platforms = async (req, res, next) => {
  try {
    req.logger.addEvent("Started");
    const platformModel = await import("../../database/model/platforms");
    const result = await scan(platformModel);
    req.logger.addEvent("Retreive platforms");
    res.status(200);
    res.json({
      data: result.map(({ id }) => ({ value: id, label: id }))
    });
    req.logger.addEvent("Send response");
    req.logger.done();
  } catch (err) {
    next(err);
  }
};

export default platforms;
