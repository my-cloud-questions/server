import courses from "./courses";
import health from "./health";
import platforms from "./platforms";

const setupRoutes = (app) => {
  app.get("/health", health);
  app.get("/authenticated/platforms", platforms);
  app.get("/authenticated/courses", courses);
};

export default setupRoutes;
