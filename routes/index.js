const AuthMiddleWare = require("../middlerwares/auth.middleware");
const AuthRouter = require("./auth");
const HomeRouter = require("./home");
const ProfileRouter = require("./profile");
const AdminRouter = require("./admin");
const QAMRouter = require("./qam");
const QARouter = require("./qa");
const IdeaRouter = require("./idea");

function route(app) {
  app.use("/qa", QARouter);
  app.use("/qam", QAMRouter);
  app.use("/admin", AuthMiddleWare.isHaveToken, AdminRouter);
  app.use("/profile", ProfileRouter);
  app.use("/auth", AuthRouter);
  app.use("/ideas", IdeaRouter);
  app.use("/", HomeRouter);
}

module.exports = route;
