import { Schema } from "dynamoose";

const platformSchema = new Schema({
  id: {
    hashKey: true,
    type: String
  }
});

export default platformSchema;
