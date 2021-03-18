import health from "./health";
import courses from "./courses";

const setupRoutes = (app) => {
  app.get("/health", health);
  app.get("/courses", courses);
};

export default setupRoutes;
