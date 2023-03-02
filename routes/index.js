const AuthMiddleWare = require("../middlerwares/auth.middleware");
const AuthRouter = require("./auth");
const HomeRouter = require("./home");
const ProfileRouter = require("./profile");
const AdminRouter = require("./admin");
const QAMRouter = require("./qam");
const QARouter = require("./qa");
const IdeaRouter = require("./idea");

function route(app) {
  app.use(
    "/qa",
    // AuthMiddleWare.isHaveToken,
    // AuthMiddleWare.checkCurrentRoleQA,
    QARouter,
  );
  app.use(
    "/qam",
    AuthMiddleWare.isHaveToken,
    AuthMiddleWare.checkCurrentRoleQAM,
    QAMRouter,
  );
  app.use(
    "/admin",
    AuthMiddleWare.isHaveToken,
    AuthMiddleWare.checkCurrentRoleAdmin,
    AdminRouter,
  );
  app.use("/profile", ProfileRouter);
  app.use("/auth", AuthRouter);
  app.use("/ideas", IdeaRouter);
  app.use("/", HomeRouter);
}

module.exports = route;
