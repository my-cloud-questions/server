import * as dynamoose from "dynamoose";

import config from "../config";

const categorySchema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true
  },
  courseId: {
    type: String,
    index: {
      name: "course-index",
      global: true
    }
  }
});

const categoryModel = dynamoose.model("categories", categorySchema, config);

export default categoryModel;
