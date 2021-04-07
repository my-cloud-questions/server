import { model } from "dynamoose";
import platformSchema from "../../schema/platforms";
import config from "../../config";
import getEnvironment from "../../../util/environment";

const suffix = getEnvironment();
const modelName = `platforms${suffix ? `-${suffix}` : ""}`;
const platformModel = model(modelName, platformSchema, config);

export default platformModel;
