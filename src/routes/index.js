import health from "./health";
import courses from "./courses";
import platforms from "./platforms";

const setupRoutes = (app) => {
  app.get("/health", health);
  app.get("/courses", courses);
  app.get("/platforms", platforms);
};

export default setupRoutes;
