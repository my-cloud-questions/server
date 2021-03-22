import { model } from "dynamoose";
import courseSchema from "../../schema/courses";
import config from "../../config";

const courseModel = model("courses", courseSchema, config);

export default courseModel;
