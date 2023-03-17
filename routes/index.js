const AuthMiddleWare = require("../middlerwares/auth.middleware");
const AuthRouter = require("./auth");
const HomeRouter = require("./home");
const ProfileRouter = require("./profile");
const AdminRouter = require("./admin");
const QAMRouter = require("./qam");
const QARouter = require("./qa");
const IdeaRouter = require("./idea");
const ApiRouter = require("./apiRoutes");

function route(app) {
  app.use("/api/v1", ApiRouter);
  app.use(
    "/qa",
    AuthMiddleWare.isHaveToken,
    AuthMiddleWare.checkCurrentRoleQA,
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
  app.use("/profile", AuthMiddleWare.isLoggedIn, ProfileRouter);
  app.use("/auth", AuthRouter);
  app.use("/ideas", AuthMiddleWare.isLoggedIn, IdeaRouter);
  app.use("/", AuthMiddleWare.isLoggedIn, HomeRouter);
}

module.exports = route;
