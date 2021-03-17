import { Schema } from "dynamoose";

const courseSchema = new Schema({
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

export default courseSchema;
