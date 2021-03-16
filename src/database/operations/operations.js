import * as dynamoose from "dynamoose";

export const connect = async () => {
  try {
    if (process.env.EXECUTION_ENV_SERVERLESS) {
      // Create new DynamoDB instance
      const ddb = new dynamoose.aws.sdk.DynamoDB({
        region: process.env.AWS_REGION
      });
      // Set DynamoDB instance to the Dynamoose DDB instance
      await dynamoose.aws.ddb.set(ddb);
      // eslint-disable-next-line no-console
      console.log("Connected to DynamoDB");
    } else {
      const sdk = dynamoose.aws.sdk;
      sdk.config.update({
        region: "us-east-1"
      });
      await dynamoose.aws.ddb.local();
      // eslint-disable-next-line no-console
      console.log("Connected to local DynamoDB");
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
};

export const scan = async (model) => {
  return model.scan().exec();
};

export const query = async (model, indexKey, indexValue) => {
  return model.query(indexKey).eq(indexValue).exec();
};
