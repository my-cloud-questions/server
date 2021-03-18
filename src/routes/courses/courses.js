import courseModel from "../../database/model/courses";
import { query } from "../../database/operations";
const courses = async (req, res, next) => {
  try {
    req.logger.addEvent("Started");
    const result = await query(courseModel, "platformId", req.query.platform);
    req.logger.addEvent("Retreive courses");
    res.status(200);
    res.json({
      data: result.map(({ id, name }) => ({ value: id, label: name }))
    });
    req.logger.addEvent("Send response");
    req.logger.done();
  } catch (err) {
    next(err);
  }
};

export default courses;
