import health from "./health";

const setupRoutes = (app) => {
  app.get("/health", health);
};

export default setupRoutes;
