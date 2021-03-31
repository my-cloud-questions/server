import { getCurrentInvoke } from "@vendia/serverless-express";

const getEnvironment = () => {
  try {
    const invoke = getCurrentInvoke();
    const { event } = invoke;
    if (event?.requestContext?.stage === "prod") {
      return "";
    }
    return "dev";
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
};

export default getEnvironment;
