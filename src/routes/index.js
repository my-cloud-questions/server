import health from "./health";
import platforms from "./platforms";
// import courses from "./courses";

const setupRoutes = (app) => {
  app.get("/health", health);
  app.get("/platforms", platforms);
  // app.get("/courses", courses);
};

export default setupRoutes;
