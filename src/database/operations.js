import * as dynamoose from "dynamoose";

export const connect = async () => {
  try {
    if (process.env.EXECUTION_ENV_SERVERLESS) {
      // Create new DynamoDB instance
      const ddb = new dynamoose.aws.sdk.DynamoDB({
        // accessKeyId: process.env.AWS_ACCESS_KEY_ID, // not required when running on AWS lambda
        // secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // not required when running on AWS lambda
        region: process.env.AWS_REGION
      });
      // Set DynamoDB instance to the Dynamoose DDB instance
      await dynamoose.aws.ddb.set(ddb);
    } else {
      const sdk = dynamoose.aws.sdk; // require("aws-sdk");
      sdk.config.update({
        region: "us-east-1"
      });
      await dynamoose.aws.ddb.local();
    }

    // eslint-disable-next-line no-console
    console.log("Connected to DynamoDB");
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
