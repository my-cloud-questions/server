import * as dynamoose from "dynamoose";

import config from "../config";

const platformSchema = new dynamoose.Schema({
  _id: { hashKey: true, type: String }
});

const platformModel = dynamoose.model("platforms", platformSchema, config);

export default platformModel;
