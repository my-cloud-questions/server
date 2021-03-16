import * as dynamoose from "dynamoose";

import config from "../../config";

const courseSchema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true
  },
  platformId: {
    type: String,
    index: {
      name: "platform-index",
      global: true
    }
  },
  name: String
});

const coursesModel = dynamoose.model("courses", courseSchema, config);

export default coursesModel;
