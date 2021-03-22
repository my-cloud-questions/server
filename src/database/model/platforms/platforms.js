import { model } from "dynamoose";
import platformSchema from "../../schema/platforms";
import config from "../../config";

const platformModel = model("platforms", platformSchema, config);

export default platformModel;
