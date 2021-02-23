import * as dynamoose from "dynamoose";

import config from "../config";

const questionsMetaDataSchema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true
  },
  courseId: {
    type: String,
    index: {
      name: "course-index",
      global: true,
      rangeKey: "categoryId"
    }
  },
  categoryId: String
});

const questionsMetaDataModel = dynamoose.model(
  "questions-meta-data",
  questionsMetaDataSchema,
  config
);

export default questionsMetaDataModel;
