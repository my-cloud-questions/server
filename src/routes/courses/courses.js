import courseModel from "../../database/schema/courses";
import { query } from "../../database/operations";

const courses = async (req, res) => {
  try {
    const result = await query(courseModel, "platformId", "AWS");

    res.status(200);
    res.json({
      data: result.map(({ id, name }) => ({ value: id, label: name }))
    });
  } catch (err) {
    // console.log(err);
  }
};

export default courses;
